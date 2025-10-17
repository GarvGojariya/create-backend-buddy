import { spawnSync } from "child_process";
import path from "path";
import { log } from "./utils/log.js";
import { safeExec, validateDirectory, CLIError } from "./utils/errorHandler.js";

export function setupGit(projectName) {
  const cwd = path.resolve(process.cwd(), projectName);
  
  // Validate project directory exists
  validateDirectory(cwd, "Project directory");
  
  try {
    safeExec("git", ["init"], { cwd });
    safeExec("git", ["add", "."], { cwd });
    safeExec("git", ["commit", "-m", "Initial commit"], { cwd });
    log("✔ Git repo initialized");
  } catch (error) {
    throw new CLIError(
      "Failed to initialize git repository",
      'GIT_INIT_ERROR',
      { cwd, originalError: error }
    );
  }
}
