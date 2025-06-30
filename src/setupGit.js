import { spawnSync } from "child_process";
import path from "path";
import { log } from "./utils/log.js";

export function setupGit(projectName) {
  const cwd = path.resolve(process.cwd(), projectName);
  spawnSync("git", ["init"], { cwd, stdio: "ignore" });
  spawnSync("git", ["add", "."], { cwd, stdio: "ignore" });
  spawnSync("git", ["commit", "-m", "Initial commit"], {
    cwd,
    stdio: "ignore",
  });
  log("✔ Git repo initialized");
}
