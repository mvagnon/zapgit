export const COMMIT_TYPES = [
  "feat",
  "fix",
  "chore",
  "docs",
  "style",
  "refactor",
  "perf",
  "test",
  "build",
  "ci",
  "revert",
] as const;

export type CommitType = (typeof COMMIT_TYPES)[number];
