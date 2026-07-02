# `zapdev` Project Instructions

zapdev is a lightweight CLI made in TypeScript to help developers make the small repetitive git-based tasks fast, precise and even easier.

## Dependencies

- `@clack/prompts` for pretty TUI prompts
- `Citty` for great CLI experience
- `Ollama` for local/cloud LLM calls
- `ESLint` for linting
- `Vitest` for unit testing

And Bun as a runtime.

## Architecture

`src/` layout — respect these boundaries when adding code:

- `src/index.ts` — CLI entry (Citty); registers subcommands, defaults to `commit`.
- `src/commands/` — one file per command. UI and orchestration only (prompts, spinners, control flow); delegate real work to `lib/`.
- `src/lib/` — the logic. Pure, testable functions (validation, transformation, parsing) that are unit-tested, and side effects (`git`, `ollama`) isolated in their own modules; shared helpers (`errors`).
- `src/prompts/` — LLM prompts as `.md` files, imported as text via `with { type: "text" }` and inlined into the bundle at build time.
- `src/types/` — shared type declarations, one file per domain (`config.ts`, `commit.ts`), plus ambient module declarations (`markdown.d.ts`).

Conventions:

- Dependencies flow one way: `types/` is a leaf (never imports from `lib`/`commands`); `commands/` → `lib/` → `prompts/` + `types/`.
- A type used by more than one module goes in `types/`; a type local to a single file stays colocated with it. Runtime values (const arrays, functions) stay with their logic — but when a domain type derives from a const (e.g. `COMMIT_TYPES` + `CommitType`), keep both in the domain's `types/` file to preserve a single source of truth.
- Prompts: keep instructions static in the `.md`; assemble conditional or parameterized parts in TS (a function taking the base prompt as an argument), and pass runtime data (diffs, context) through chat messages — never bake it into the file.
- Keep `.md` imports out of the test graph: functions that shape prompts receive the prompt string as an argument instead of importing the `.md`, so Vitest never resolves a text import.
