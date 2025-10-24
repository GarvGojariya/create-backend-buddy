import { askUser } from "./prompts.js";
import { copyTemplate } from "./copyTemplate.js";
import { installDeps } from "./installDeps.js";
import { setupGit } from "./setupGit.js";
import { updatePackage } from "./updatePackage.js";
import { log } from "./utils/log.js";
import { withErrorHandling, handleError } from "./utils/errorHandler.js";

/**
 * Main CLI entry point
 * Orchestrates the entire project creation process:
 * 1. Prompts user for project configuration
 * 2. Copies templates based on selections
 * 3. Updates package.json with project name
 * 4. Installs dependencies
 * 5. Initializes git repository (if requested)
 * 
 * @throws {CLIError} If any step fails during project creation
 */
export async function runCLI() {
  try {
    const answers = await askUser();
    const projectPath = `${process.cwd()}/${answers.projectName}`;

    log("📁 Creating project structure...");
    await withErrorHandling(
      () => copyTemplate(answers),
      "template copying",
      { projectName: answers.projectName, projectPath }
    );

    log("🔧 Updating package metadata...");
    await withErrorHandling(
      () => updatePackage(answers),
      "package metadata update",
      { projectName: answers.projectName, projectPath }
    );

    log("⚙️ Installing dependencies...");
    await withErrorHandling(
      () => installDeps(answers),
      "dependency installation",
      { projectName: answers.projectName, projectPath }
    );

    if (answers.git) {
      log("🔧 Git: initializing repository");
      await withErrorHandling(
        () => setupGit(answers.projectName),
        "git initialization",
        { projectName: answers.projectName, projectPath }
      );
    }

    log("✅ Done! Next steps:");
    console.log(`  cd ${answers.projectName}`);
    console.log("  npm run dev");
  } catch (error) {
    handleError(error, "CLI execution", { projectName: "unknown" });
  }
}