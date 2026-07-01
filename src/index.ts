#!/usr/bin/env bun
import { defineCommand, runMain } from "citty";

import { commitCommand } from "./commands/commit";

const main = defineCommand({
  meta: {
    name: "qgit",
    version: "0.1.0",
    description: "Quick Git — fast, precise git chores from your terminal.",
  },
  subCommands: {
    commit: commitCommand,
  },
  default: "commit",
});

await runMain(main);
