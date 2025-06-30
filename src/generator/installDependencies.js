import { execSync } from "child_process";

export async function installDeps(projectName, opts) {
  const cwd = projectName;
  const deps = [];
  const devDeps = [];

  if (opts.language === "TypeScript") devDeps.push("typescript", "ts-node");

  switch (opts.orm) {
    case "Prisma":
      deps.push("prisma", "@prisma/client");
      break;
    case "Sequelize":
      deps.push("sequelize", "sequelize-cli");
      break;
    case "TypeORM":
      deps.push("typeorm", "reflect-metadata");
      break;
    case "Mongoose":
      deps.push("mongoose");
      break;
  }

  switch (opts.database) {
    case "PostgreSQL":
      deps.push("pg");
      break;
    case "MySQL":
      deps.push("mysql2");
      break;
    case "SQLite":
      deps.push("sqlite3");
      break;
  }

  execSync(`npm install ${deps.join(" ")}`, { cwd, stdio: "inherit" });
  if (devDeps.length)
    execSync(`npm install -D ${devDeps.join(" ")}`, { cwd, stdio: "inherit" });
}
