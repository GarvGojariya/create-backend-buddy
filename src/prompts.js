import inquirer from "inquirer";
import { validateProjectName, validateCurrentDirectory, validateOrmDatabaseCompatibility } from "./utils/validation.js";
import { CLIError } from "./utils/errorHandler.js";

export async function askUser() {
  // Validate current directory first
  const dirValidation = validateCurrentDirectory();
  if (!dirValidation.isValid) {
    throw new CLIError(dirValidation.message, 'VALIDATION_ERROR');
  }

  // Get project name with validation
  let projectName;
  let isValidName = false;
  
  while (!isValidName) {
    const { projectName: inputName } = await inquirer.prompt([
      { 
        type: "input", 
        name: "projectName", 
        message: "Project name:",
        validate: (input) => {
          const validation = validateProjectName(input);
          return validation.isValid || validation.message;
        }
      },
    ]);
    
    const validation = validateProjectName(inputName);
    if (validation.isValid) {
      projectName = inputName;
      isValidName = true;
    } else {
      console.log(`❌ ${validation.message}`);
    }
  }

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

  // Validate ORM and database compatibility
  const compatibilityValidation = validateOrmDatabaseCompatibility(orm, database);
  if (!compatibilityValidation.isValid) {
    throw new CLIError(compatibilityValidation.message, 'VALIDATION_ERROR');
  }

  // const { auth } = await inquirer.prompt([
  //   {
  //     type: "confirm",
  //     name: "auth",
  //     message: "Include Auth (JWT)?",
  //     default: false,
  //   },
  // ]);

  const { swagger } = await inquirer.prompt([
    {
      type: "confirm",
      name: "swagger",
      message: "Include Swagger docs?",
      default: false,
    },
  ]);

  // const { docker } = await inquirer.prompt([
  //   {
  //     type: "confirm",
  //     name: "docker",
  //     message: "Include Docker support?",
  //     default: false,
  //   },
  // ]);

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
    swagger,
    // docker,
    git,
  };
}
