import fs from "fs-extra";
import path from "path";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";
import { log } from "./utils/log.js";

export async function copyTemplate(answers) {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const TEMPLATES_PATH = resolve(__dirname, "..", "templates");

  const { projectName, language, orm, database, auth, swagger, docker } =
    answers;
  const ext = language === "TypeScript" ? "ts" : "js";
  const projectPath = path.resolve(process.cwd(), projectName);
  await fs.ensureDir(projectPath);

  const copy = async (subdir, targetName = "") => {
    const src = path.join(TEMPLATES_PATH, subdir);
    const dest = path.join(projectPath, targetName || "");
    if (await fs.pathExists(src)) {
      await fs.copy(src, dest);
    } else {
      log(`❌ Missing template folder: ${subdir}`);
    }
  };


  const languageCode = language === "JavaScript" ? "js" : "ts";

  // Copy base template
  await copy(`base/${languageCode}`);

  // Copy ORM-specific logic if any
  if (orm !== "None") {
    await copy(`orm/${orm.toLowerCase()}/${languageCode}`);
  }

  // Copy DB-specific env if any
  if (database !== "None") {
    await copy(`db/${database.toLowerCase()}`);
  }

  // Copy optional features
  if (auth) await copy("features/auth", "src/features/auth");
  if (swagger) await copy("features/swagger", "src/features/swagger");
  if (docker) await copy("features/docker");

  // Inject DB logic into base index file
  const indexPath = path.join(projectPath, "src", `index.${ext}`);
  if (await fs.pathExists(indexPath)) {
    let content = await fs.readFile(indexPath, "utf8");

    if (orm === "Prisma") {
      content = content
        .replace(
          "// ##DB_IMPORT##",
          `import prisma from './lib/prismaClient.${ext}';`
        )
        .replace("// ##DB_INIT##", `// Prisma client ready`);
    }

    if (orm === "Mongoose") {
      content = content
        .replace(
          "// ##DB_IMPORT##",
          `import { connect } from './lib/mongooseConnect.${ext}';`
        )
        .replace("// ##DB_INIT##", `connect();`);
    }

    if (orm === "Sequelize") {
      content = content
        .replace(
          "// ##DB_IMPORT##",
          `import sequelize from './lib/sequelize.${ext}';`
        )
        .replace(
          "// ##DB_INIT##",
          `sequelize.authenticate().then(() => console.log('Connected to DB'));`
        );
    }

    await fs.writeFile(indexPath, content);
    log(`✔ updated: src/index.${ext} with DB integration`);
  } else {
    log(`⚠️ Could not find src/index.${ext} to inject DB logic.`);
  }

  if (orm === "Prisma") {
    const prismaPath = path.join(projectPath, "prisma", "schema.prisma");

    if (await fs.pathExists(prismaPath)) {
      let prismaSchema = await fs.readFile(prismaPath, "utf8");

      const dbProviderMap = {
        Postgres: "postgresql",
        MySQL: "mysql",
        SQLite: "sqlite",
        Mongo: "mongodb",
      };

      const newProvider = dbProviderMap[database];

      if (newProvider) {
        prismaSchema = prismaSchema.replace(
          /provider\s*=\s*"(.*?)"/,
          `provider = "${newProvider}"`
        );

        await fs.writeFile(prismaPath, prismaSchema);
        log(`✔ updated: prisma/schema.prisma with provider "${newProvider}"`);
      } else {
        log(`⚠️ could not match database to provider: ${database}`);
      }
    }
  }

  // Always copy .gitignore
  await copy("features/git");
}
