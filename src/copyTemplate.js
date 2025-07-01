import fs from "fs-extra";
import path, { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import { log } from "./utils/log.js";

export async function copyTemplate(answers) {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const TEMPLATES_PATH = resolve(__dirname, "..", "templates");

  const { projectName, language, orm, database, auth, swagger, docker } =
    answers;

  const ext = language === "TypeScript" ? "ts" : "js";
  const projectPath = path.resolve(process.cwd(), projectName);
  const languageCode = language === "JavaScript" ? "js" : "ts";

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

  // Copy base + logic
  await copy(`base/${languageCode}`);
  if (orm !== "None") await copy(`orm/${orm.toLowerCase()}/${languageCode}`);
  if (database !== "None") await copy(`db/${database.toLowerCase()}`);
  if (auth) await copy("features/auth", "src/features/auth");
  if (swagger) await copy("features/swagger", "src/features/swagger");
  if (docker) await copy("features/docker");

  // Modify Prisma schema if needed
  if (orm === "Prisma") {
    const prismaPath = path.join(projectPath, "prisma", "schema.prisma");

    if (await fs.pathExists(prismaPath)) {
      let schema = await fs.readFile(prismaPath, "utf8");

      const dbProviderMap = {
        Postgres: "postgresql",
        MySQL: "mysql",
        SQLite: "sqlite",
        Mongo: "mongodb",
      };
      const newProvider = dbProviderMap[database];

      if (newProvider) {
        schema = schema.replace(/datasource\s+db\s+\{[^}]*\}/s, (block) =>
          block.replace(/provider\s*=\s*"(.*?)"/, `provider = "${newProvider}"`)
        );
        await fs.writeFile(prismaPath, schema);
        log(`✔ updated: prisma/schema.prisma with provider "${newProvider}"`);
      } else {
        log(`⚠️ could not match database to provider: ${database}`);
      }
    }
  }

  // Modify Sequelize dialect if needed
  if (orm === "Sequelize") {
    const sequelizePath = path.join(
      projectPath,
      "src",
      "lib",
      `sequelize.${ext}`
    );
    if (await fs.pathExists(sequelizePath)) {
      let content = await fs.readFile(sequelizePath, "utf8");

      const dialectMap = {
        Postgres: "postgres",
        MySQL: "mysql",
        SQLite: "sqlite",
      };
      const newDialect = dialectMap[database];

      if (newDialect) {
        content = content.replace(/['"]##DIALECT##['"]/, `'${newDialect}'`);
        await fs.writeFile(sequelizePath, content);
        log(`✔ updated: Sequelize dialect set to "${newDialect}"`);
      } else {
        log(`⚠️ Could not match dialect for database: ${database}`);
      }
    }
  }

  // Modify base index file
  const indexPath = path.join(projectPath, "src", `index.${ext}`);
  if (await fs.pathExists(indexPath)) {
    let content = await fs.readFile(indexPath, "utf8");

    // Inject DB
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

    // Inject Swagger
    if (swagger) {
      content = content.replace(
        "// ##SWAGGER##",
        `import initSwagger from './swagger.${ext}';\ninitSwagger(app);`
      );
    }

    await fs.writeFile(indexPath, content);
    log(`✔ updated: src/index.${ext} with DB integration`);
  } else {
    log(`⚠️ Could not find src/index.${ext} to inject DB logic.`);
  }

  // Always copy .gitignore
  await copy("features/git");
}
