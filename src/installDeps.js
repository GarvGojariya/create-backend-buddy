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

  const deps = [
    "express",
    "cors",
    "pino",
    "pino-pretty",
    "dotenv",
    "helmet",
    "express-rate-limit",
  ];

  const devDeps = [];

  // Base language dependencies
  if (language === "JavaScript") {
    devDeps.push("nodemon");
  }

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

  // ORM-specific
  if (orm === "Prisma") deps.push("prisma", "@prisma/client");
  if (orm === "Mongoose") deps.push("mongoose");

  // DB-specific
  if (database === "Postgres") deps.push("pg");
  if (database === "MySQL") deps.push("mysql2");
  if (database === "SQLite") deps.push("sqlite3");

  // Feature-specific
  if (auth) deps.push("jsonwebtoken", "bcryptjs");
  if (swagger) {
    deps.push("swagger-ui-express", "yamljs");
    devDeps.push("@types/swagger-ui-express");
  }

  // Ensure package.json exists
  log("📁 Ensuring package.json exists...");
  spawnSync("npm", ["init", "-y"], { cwd, stdio: "inherit" });

  // Install prod deps
  if (deps.length) {
    log(`📦 Installing dependencies:\n→ ${deps.join(", ")}`);
    spawnSync("npm", ["install", ...deps], { cwd, stdio: "inherit" });
  }

  // Install dev deps
  if (devDeps.length) {
    log(`⚙️ Installing devDependencies:\n→ ${devDeps.join(", ")}`);
    spawnSync("npm", ["install", "-D", ...devDeps], { cwd, stdio: "inherit" });
  }

  // Run prisma generate if selected
  if (orm === "Prisma") {
    log("🔧 Running Prisma generate...");
    spawnSync("npx", ["prisma", "generate"], { cwd, stdio: "inherit" });
  }
}
