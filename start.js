import { execSync } from "node:child_process";

const appToStart = process.env.APP_TO_START || "backend";

if (appToStart === "frontend") {
  console.log("Starting frontend...");
  execSync("npm run start:frontend", { stdio: "inherit" });
} else {
  console.log("Starting backend...");
  execSync("npm run start:backend", { stdio: "inherit" });
}