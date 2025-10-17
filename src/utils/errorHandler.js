import fs from "fs-extra";
import path from "path";
import { log } from "./log.js";

/**
 * Custom error class for CLI operations
 */
export class CLIError extends Error {
  constructor(message, code = 'CLI_ERROR', details = {}) {
    super(message);
    this.name = 'CLIError';
    this.code = code;
    this.details = details;
  }
}

/**
 * Handles errors with proper logging and cleanup
 * @param {Error} error - The error to handle
 * @param {string} operation - The operation that failed
 * @param {object} context - Additional context for error handling
 */
export function handleError(error, operation, context = {}) {
  const { projectName, projectPath } = context;
  
  log(`❌ Error during ${operation}: ${error.message}`);
  
  // Log additional details if available
  if (error.details) {
    log(`   Details: ${JSON.stringify(error.details)}`);
  }
  
  // Cleanup partial files if project was created
  if (projectPath && fs.existsSync(projectPath)) {
    try {
      log("🧹 Cleaning up partial files...");
      fs.removeSync(projectPath);
      log("✅ Cleanup completed");
    } catch (cleanupError) {
      log(`⚠️ Warning: Could not clean up ${projectPath}: ${cleanupError.message}`);
    }
  }
  
  // Exit with appropriate code
  process.exit(error.code === 'VALIDATION_ERROR' ? 1 : 2);
}

/**
 * Wraps async operations with error handling
 * @param {Function} asyncFn - The async function to wrap
 * @param {string} operation - The operation name for error messages
 * @param {object} context - Context for error handling
 * @returns {Promise} - The wrapped function result
 */
export async function withErrorHandling(asyncFn, operation, context = {}) {
  try {
    return await asyncFn();
  } catch (error) {
    handleError(error, operation, context);
  }
}

/**
 * Validates that a required file exists
 * @param {string} filePath - Path to the file
 * @param {string} description - Description of the file for error messages
 */
export function validateFileExists(filePath, description = 'file') {
  if (!fs.existsSync(filePath)) {
    throw new CLIError(
      `${description} not found: ${filePath}`,
      'FILE_NOT_FOUND',
      { filePath, description }
    );
  }
}

/**
 * Validates that a directory exists and is writable
 * @param {string} dirPath - Path to the directory
 * @param {string} description - Description of the directory
 */
export function validateDirectory(dirPath, description = 'directory') {
  if (!fs.existsSync(dirPath)) {
    throw new CLIError(
      `${description} does not exist: ${dirPath}`,
      'DIRECTORY_NOT_FOUND',
      { dirPath, description }
    );
  }
  
  try {
    fs.accessSync(dirPath, fs.constants.W_OK);
  } catch (error) {
    throw new CLIError(
      `${description} is not writable: ${dirPath}`,
      'DIRECTORY_NOT_WRITABLE',
      { dirPath, description }
    );
  }
}

/**
 * Validates that a directory exists (read-only check)
 * @param {string} dirPath - Path to the directory
 * @param {string} description - Description of the directory
 */
export function validateDirectoryExists(dirPath, description = 'directory') {
  if (!fs.existsSync(dirPath)) {
    throw new CLIError(
      `${description} does not exist: ${dirPath}`,
      'DIRECTORY_NOT_FOUND',
      { dirPath, description }
    );
  }
}

/**
 * Safely executes a command with error handling
 * @param {string} command - The command to execute
 * @param {Array} args - Command arguments
 * @param {object} options - Execution options
 * @returns {object} - Command result
 */
export function safeExec(command, args = [], options = {}) {
  const { spawnSync } = require('child_process');
  
  try {
    const result = spawnSync(command, args, {
      stdio: 'inherit',
      ...options
    });
    
    if (result.error) {
      throw new CLIError(
        `Failed to execute ${command}: ${result.error.message}`,
        'COMMAND_EXECUTION_ERROR',
        { command, args, error: result.error }
      );
    }
    
    if (result.status !== 0) {
      throw new CLIError(
        `Command ${command} failed with exit code ${result.status}`,
        'COMMAND_FAILED',
        { command, args, status: result.status }
      );
    }
    
    return result;
  } catch (error) {
    if (error instanceof CLIError) {
      throw error;
    }
    throw new CLIError(
      `Unexpected error executing ${command}: ${error.message}`,
      'UNEXPECTED_ERROR',
      { command, args, originalError: error }
    );
  }
}
