import fs from "fs-extra";
import path from "path";
import { log } from "./utils/log.js";

export async function updatePackage({ projectName }) {
  const pkgPath = path.resolve(process.cwd(), projectName, "package.json");
  // if (!fs.existsSync(pkgPath)) {
  //   log(`⚠️ Skipping package.json update — file not found.`);
  //   return;
  // }
  const pkg = await fs.readJson(pkgPath);
  pkg.name = projectName;
  await fs.writeJson(pkgPath, pkg, { spaces: 2 });
  log(`✔ package.json updated with name "${projectName}"`);
}
