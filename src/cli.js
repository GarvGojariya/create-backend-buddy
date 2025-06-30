import { askUser } from "./prompts.js";
import { copyTemplate } from "./copyTemplate.js";
import { installDeps } from "./installDeps.js";
import { setupGit } from "./setupGit.js";
import { updatePackage } from "./updatePackage.js";
import { log } from "./utils/log.js";

export async function runCLI() {
  const answers = await askUser();

  log("📁 Creating project structure...");
  await copyTemplate(answers);

  log("🔧 Updating package metadata...");
  await updatePackage(answers);

  log("⚙️ Installing dependencies...");
  await installDeps(answers);

  if (answers.git) {
    log("� git: initializing repository");
    setupGit(answers.projectName);
  }

  log("✅ Done! Next steps:");
  console.log(`  cd ${answers.projectName}`);
  console.log("  npm run dev");
}
