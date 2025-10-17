import { spawnSync } from "child_process";
import path from "path";
import { log } from "./utils/log.js";
import { safeExec, validateDirectory, CLIError } from "./utils/errorHandler.js";

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
  
  // Validate project directory exists
  validateDirectory(cwd, "Project directory");

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
  try {
    safeExec("npm", ["init", "-y"], { cwd });
  } catch (error) {
    throw new CLIError(
      "Failed to initialize package.json",
      'PACKAGE_INIT_ERROR',
      { cwd, originalError: error }
    );
  }

  // Install prod deps
  if (deps.length) {
    log(`📦 Installing dependencies:\n→ ${deps.join(", ")}`);
    try {
      safeExec("npm", ["install", ...deps], { cwd });
    } catch (error) {
      throw new CLIError(
        "Failed to install dependencies",
        'DEPENDENCY_INSTALL_ERROR',
        { deps, cwd, originalError: error }
      );
    }
  }

  // Install dev deps
  if (devDeps.length) {
    log(`⚙️ Installing devDependencies:\n→ ${devDeps.join(", ")}`);
    try {
      safeExec("npm", ["install", "-D", ...devDeps], { cwd });
    } catch (error) {
      throw new CLIError(
        "Failed to install dev dependencies",
        'DEV_DEPENDENCY_INSTALL_ERROR',
        { devDeps, cwd, originalError: error }
      );
    }
  }

  // Run prisma generate if selected
  if (orm === "Prisma") {
    log("🔧 Running Prisma generate...");
    try {
      safeExec("npx", ["prisma", "generate"], { cwd });
    } catch (error) {
      throw new CLIError(
        "Failed to generate Prisma client",
        'PRISMA_GENERATE_ERROR',
        { cwd, originalError: error }
      );
    }
  }
}
