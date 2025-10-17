import fs from "fs-extra";
import path from "path";

// Reserved names that cannot be used as project names
const RESERVED_NAMES = [
  'node_modules', 'npm', 'yarn', 'pnpm', 'package', 'package.json',
  'index', 'main', 'app', 'src', 'lib', 'bin', 'dist', 'build',
  'test', 'tests', 'spec', 'specs', 'coverage', 'docs', 'public',
  'private', 'config', 'scripts', 'styles', 'assets', 'images',
  'fonts', 'icons', 'components', 'pages', 'layouts', 'utils',
  'helpers', 'services', 'api', 'routes', 'controllers', 'models',
  'middleware', 'plugins', 'themes', 'templates', 'views',
  'admin', 'dashboard', 'login', 'register', 'auth', 'user',
  'profile', 'settings', 'config', 'database', 'db', 'server',
  'client', 'frontend', 'backend', 'fullstack', 'web', 'mobile',
  'desktop', 'cli', 'tool', 'utility', 'helper', 'service',
  'api', 'rest', 'graphql', 'websocket', 'socket', 'redis',
  'mongodb', 'postgresql', 'mysql', 'sqlite', 'prisma',
  'sequelize', 'mongoose', 'express', 'koa', 'fastify', 'hapi',
  'next', 'nuxt', 'vue', 'react', 'angular', 'svelte',
  'typescript', 'javascript', 'js', 'ts', 'jsx', 'tsx',
  'css', 'scss', 'sass', 'less', 'stylus', 'html', 'xml',
  'json', 'yaml', 'yml', 'toml', 'ini', 'env', 'dotenv',
  'git', 'github', 'gitlab', 'bitbucket', 'docker', 'kubernetes',
  'aws', 'azure', 'gcp', 'heroku', 'vercel', 'netlify',
  'webpack', 'rollup', 'vite', 'parcel', 'esbuild', 'swc',
  'babel', 'typescript', 'eslint', 'prettier', 'husky', 'lint-staged',
  'jest', 'mocha', 'chai', 'sinon', 'cypress', 'playwright',
  'puppeteer', 'selenium', 'karma', 'jasmine', 'ava', 'tap',
  'vitest', 'uvu', 'deno', 'bun', 'node', 'npm', 'yarn', 'pnpm'
];

// Invalid characters for project names
const INVALID_CHARS_REGEX = /[^a-zA-Z0-9-_]/;

/**
 * Validates project name for common issues
 * @param {string} projectName - The project name to validate
 * @returns {object} - Validation result with isValid and message
 */
export function validateProjectName(projectName) {
  // Check if empty
  if (!projectName || projectName.trim().length === 0) {
    return {
      isValid: false,
      message: "Project name cannot be empty"
    };
  }

  // Check length
  if (projectName.length < 2) {
    return {
      isValid: false,
      message: "Project name must be at least 2 characters long"
    };
  }

  if (projectName.length > 50) {
    return {
      isValid: false,
      message: "Project name must be less than 50 characters"
    };
  }

  // Check for invalid characters
  if (INVALID_CHARS_REGEX.test(projectName)) {
    return {
      isValid: false,
      message: "Project name can only contain letters, numbers, hyphens, and underscores"
    };
  }

  // Check if starts with number or hyphen
  if (/^[0-9-]/.test(projectName)) {
    return {
      isValid: false,
      message: "Project name cannot start with a number or hyphen"
    };
  }

  // Check for reserved names
  if (RESERVED_NAMES.includes(projectName.toLowerCase())) {
    return {
      isValid: false,
      message: `"${projectName}" is a reserved name. Please choose a different name.`
    };
  }

  // Check if directory already exists
  const projectPath = path.resolve(process.cwd(), projectName);
  if (fs.existsSync(projectPath)) {
    return {
      isValid: false,
      message: `Directory "${projectName}" already exists. Please choose a different name or remove the existing directory.`
    };
  }

  return {
    isValid: true,
    message: "Valid project name"
  };
}

/**
 * Validates if the current directory is suitable for project creation
 * @returns {object} - Validation result
 */
export function validateCurrentDirectory() {
  const cwd = process.cwd();
  
  // Check if we're in a git repository
  if (fs.existsSync(path.join(cwd, '.git'))) {
    return {
      isValid: false,
      message: "Cannot create project inside a git repository. Please navigate to a different directory."
    };
  }

  // Check if directory is writable
  try {
    fs.accessSync(cwd, fs.constants.W_OK);
  } catch (error) {
    return {
      isValid: false,
      message: "Current directory is not writable. Please check permissions."
    };
  }

  return {
    isValid: true,
    message: "Directory is suitable for project creation"
  };
}

/**
 * Validates ORM and database compatibility
 * @param {string} orm - The selected ORM
 * @param {string} database - The selected database
 * @returns {object} - Validation result
 */
export function validateOrmDatabaseCompatibility(orm, database) {
  const validCombinations = {
    'Prisma': ['Postgres', 'MySQL', 'SQLite'],
    'Sequelize': ['Postgres', 'MySQL', 'SQLite'],
    'Mongoose': ['Mongo'],
    'None': ['Postgres', 'Mongo', 'MySQL', 'SQLite', 'None']
  };

  if (!validCombinations[orm] || !validCombinations[orm].includes(database)) {
    return {
      isValid: false,
      message: `Invalid combination: ${orm} is not compatible with ${database}`
    };
  }

  return {
    isValid: true,
    message: "Valid ORM and database combination"
  };
}
