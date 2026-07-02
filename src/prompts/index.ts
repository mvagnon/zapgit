import commitMessagePrompt from "./commit-message.md" with { type: "text" };

export const COMMIT_SYSTEM_PROMPT = commitMessagePrompt.trim();
