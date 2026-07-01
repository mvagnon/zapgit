export const COMMIT_SYSTEM_PROMPT = [
  "Generate ONE commit message in Conventional Commits format.",
  'A single line: "type(scope): description", imperative, English, ≤72 chars.',
  "Reply ONLY with the message, no backticks, no quotes, no explanation.",
].join("\n");

export const MAX_DIFF_CHARS = 12_000;

export function truncateDiff(diff: string, max: number = MAX_DIFF_CHARS): string {
  return diff.length > max ? diff.slice(0, max) : diff;
}

export function sanitizeCommitMessage(raw: string): string {
  const firstLine = raw.split("\n", 1)[0] ?? "";
  return firstLine.replace(/[`"]/g, "").trim();
}
