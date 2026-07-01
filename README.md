# qgit

**Quick Git** — a lightweight TypeScript/Bun CLI that makes small, repetitive git chores fast and precise.

## Install

```bash
bun install
bun link   # exposes the `qgit` binary on your PATH
```

## Usage

### `qgit commit`

Stages all changes (`git add -A`), asks an Ollama model for a one-line Conventional Commits message, then lets you commit, edit or cancel, and optionally push.

```bash
qgit commit   # `qgit` alone works too — commit is the default command
```

| Flag | Description |
| --- | --- |
| `-m, --model <model>` | Override the Ollama model |
| `-p, --push` | Push after committing without asking |
| `-y, --yes` | Skip prompts and commit directly |

Without a TTY (piped / CI), it commits automatically and only pushes when `--push` is set.

## Configuration

| Variable | Default | Description |
| --- | --- | --- |
| `OLLAMA_URL` | `http://localhost:11434` | Ollama base URL |
| `OLLAMA_MODEL` | `deepseek-v4-flash:cloud` | Model used to generate messages |

## Development

```bash
bun run qgit        # run the CLI in dev
bun run typecheck   # tsc --noEmit
bun run lint        # eslint
bun run test        # vitest
```

## Project structure

- `src/index.ts` — CLI entry (Citty); registers subcommands, defaults to `commit`.
- `src/commands/` — one file per command.
- `src/lib/` — pure logic (`config`, `commit-message`, unit-tested) and side effects (`git`, `ollama`).
