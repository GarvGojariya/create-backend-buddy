import { spawnSync } from "child_process";
import path from "path";
import { log } from "./utils/log.js";

export function installDeps({
  projectName,
  language,
  orm,
  database,
  auth,
  swagger,
  docker,
}) {
  const cwd = path.resolve(process.cwd(), projectName);
  const deps = ["express", "cors", "pino", "pino-pretty", "dotenv","fs", "path"];
  const devDeps = [];

  if (language === "TypeScript") devDeps.push("typescript", "ts-node-dev");
  if (orm === "Prisma") {
    deps.push("prisma", "@prisma/client");
  }

  if (swagger) {
    deps.push("swagger-ui-express", "yamljs");
    devDeps.push("@types/swagger-ui-express");
  }
  deps.push("helmet", "express-rate-limit");

  if (orm === "Mongoose") deps.push("mongoose");
  if (database === "Postgres") deps.push("pg");
  if (database === "MySQL") deps.push("mysql2");
  if (database === "SQLite") deps.push("sqlite3");
  if (auth) deps.push("jsonwebtoken", "bcryptjs");
  if (swagger) deps.push("swagger-ui-express");
  if (language === "JavaScript") devDeps.push("nodemon");
  if (language === "TypeScript") {
    devDeps.push(
      "typescript",
      "ts-node-dev",
      "@types/node",
      "@types/express",
      "@types/cors",
      "@types/pino",
      "@types/helmet",
      "@types/express-rate-limit"
    );
  }
  log(`📦 Installing dependencies: ${deps.join(", ")}`);
  spawnSync("npm", ["install", ...deps], { cwd, stdio: "inherit" });

  if (devDeps.length) {
    log(`⚙️ Installing dev dependencies: ${devDeps.join(", ")}`);
    spawnSync("npm", ["install", "-D", ...devDeps], { cwd, stdio: "inherit" });
  }

  if (orm === "Prisma") {
    log("⚙️ Running prisma generate...");
    spawnSync("npx", ["prisma", "generate"], { cwd, stdio: "inherit" });
  }
}
