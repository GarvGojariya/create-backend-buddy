import inquirer from "inquirer";

export async function askUser() {
  const { projectName } = await inquirer.prompt([
    { type: "input", name: "projectName", message: "Project name:" },
  ]);

  const { language } = await inquirer.prompt([
    {
      type: "list",
      name: "language",
      message: "Language:",
      choices: ["JavaScript", "TypeScript"],
    },
  ]);

  const { orm } = await inquirer.prompt([
    {
      type: "list",
      name: "orm",
      message: "ORM/ODM:",
      choices: ["Prisma", "Sequelize", "Mongoose", "None"],
    },
  ]);

  let dbChoices;

  if (orm === "Mongoose") {
    dbChoices = ["Mongo"];
  } else if (orm === "Sequelize" || orm === "Prisma") {
    dbChoices = ["Postgres", "MySQL", "SQLite"];
  } else {
    dbChoices = ["Postgres", "Mongo", "MySQL", "SQLite", "None"];
  }

  const { database } = await inquirer.prompt([
    {
      type: "list",
      name: "database",
      message: "Database:",
      choices: dbChoices,
    },
  ]);

  const { auth } = await inquirer.prompt([
    {
      type: "confirm",
      name: "auth",
      message: "Include Auth (JWT)?",
      default: false,
    },
  ]);

  const { swagger } = await inquirer.prompt([
    {
      type: "confirm",
      name: "swagger",
      message: "Include Swagger docs?",
      default: false,
    },
  ]);

  const { docker } = await inquirer.prompt([
    {
      type: "confirm",
      name: "docker",
      message: "Include Docker support?",
      default: false,
    },
  ]);

  const { git } = await inquirer.prompt([
    {
      type: "confirm",
      name: "git",
      message: "Initialize Git repo?",
      default: true,
    },
  ]);

  return {
    projectName,
    language,
    orm,
    database,
    auth,
    swagger,
    docker,
    git,
  };
}
