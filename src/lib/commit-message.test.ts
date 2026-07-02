import { describe, expect, it } from "vitest";

import {
  applyCommitType,
  MAX_DIFF_CHARS,
  normalizeCommitType,
  sanitizeCommitMessage,
  truncateDiff,
} from "./commit-message";

describe("truncateDiff", () => {
  it("returns the diff unchanged when under the limit", () => {
    const diff = "small diff";
    expect(truncateDiff(diff)).toBe(diff);
  });

  it("truncates to the max length when over the limit", () => {
    const diff = "x".repeat(MAX_DIFF_CHARS + 500);
    expect(truncateDiff(diff)).toHaveLength(MAX_DIFF_CHARS);
  });

  it("respects a custom max", () => {
    expect(truncateDiff("abcdef", 3)).toBe("abc");
  });
});

describe("sanitizeCommitMessage", () => {
  it("keeps only the first line", () => {
    expect(sanitizeCommitMessage("feat: add x\nbody line\nmore")).toBe("feat: add x");
  });

  it("strips backticks and double quotes", () => {
    expect(sanitizeCommitMessage('`fix: "quoted" thing`')).toBe("fix: quoted thing");
  });

  it("trims surrounding whitespace", () => {
    expect(sanitizeCommitMessage("   chore: tidy up   ")).toBe("chore: tidy up");
  });

  it("returns an empty string for empty input", () => {
    expect(sanitizeCommitMessage("")).toBe("");
  });
});

describe("normalizeCommitType", () => {
  it("accepts a valid type", () => {
    expect(normalizeCommitType("feat")).toBe("feat");
  });

  it("lowercases and trims the input", () => {
    expect(normalizeCommitType("  FEAT  ")).toBe("feat");
  });

  it("returns null for an unknown type", () => {
    expect(normalizeCommitType("banana")).toBeNull();
  });

  it("returns null for empty input", () => {
    expect(normalizeCommitType("")).toBeNull();
  });
});

describe("applyCommitType", () => {
  it("preserves the base prompt", () => {
    expect(applyCommitType("BASE", "feat").startsWith("BASE")).toBe(true);
  });

  it("injects the forced type into the prompt", () => {
    expect(applyCommitType("BASE", "fix")).toContain("fix");
  });
});
