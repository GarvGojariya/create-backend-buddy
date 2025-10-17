import fs from "fs-extra";
import path from "path";
import { log } from "./utils/log.js";
import { validateFileExists, CLIError } from "./utils/errorHandler.js";

export async function updatePackage({ projectName }) {
  const pkgPath = path.resolve(process.cwd(), projectName, "package.json");
  
  try {
    // Validate package.json exists
    validateFileExists(pkgPath, "package.json");
    
    const pkg = await fs.readJson(pkgPath);
    pkg.name = projectName;
    await fs.writeJson(pkgPath, pkg, { spaces: 2 });
    log(`✔ package.json updated with name "${projectName}"`);
  } catch (error) {
    if (error instanceof CLIError) {
      throw error;
    }
    throw new CLIError(
      `Failed to update package.json: ${error.message}`,
      'PACKAGE_UPDATE_ERROR',
      { pkgPath, projectName, originalError: error }
    );
  }
}
