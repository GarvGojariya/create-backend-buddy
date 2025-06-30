import fs from "fs-extra";
import path from "path";

import { dirname } from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export async function copyTemplate({
  projectName,
  language,
  database,
  orm,
  docker,
}) {
  const tpl = `${language.toLowerCase()}-${orm.toLowerCase()}-${database.toLowerCase()}`;
  const templateDir = path.resolve(__dirname, "../../templates", tpl);
  if (!fs.existsSync(templateDir))
    throw new Error(`Template not found: ${tpl}`);

  const dest = path.resolve(process.cwd(), projectName);
  await fs.copy(templateDir, dest);
  if (docker) {
    const dockerTpl = path.resolve(__dirname, "../../templates/docker");
    await fs.copy(dockerTpl, dest);
  }
}
