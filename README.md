# zapdev

**zapdev** — a lightweight TypeScript/Bun CLI that makes small, repetitive git chores fast and precise.

## Requirements

zapdev runs on the [Bun](https://bun.sh) runtime. Install Bun first.

## Install

```bash
bun add -g zapdev   # installs the `zapdev` command globally
```

Or run it once without installing:

```bash
bunx zapdev commit
```

## Usage

### `zapdev commit`

Stages all changes (`git add -A`), asks an Ollama model for a one-line Conventional Commits message, then lets you commit, edit or cancel, and optionally push.

```bash
zapdev commit   # `zapdev` alone works too — commit is the default command
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

From a clone:

```bash
bun install
bun run zapdev      # run the CLI in dev
bun run typecheck   # tsc --noEmit
bun run lint        # eslint
bun run test        # vitest
bun run build       # bundle to dist/
```

`bun link` (after `bun run build`) exposes the local `zapdev` binary on your PATH.

## Project structure

- `src/index.ts` — CLI entry (Citty); registers subcommands, defaults to `commit`.
- `src/commands/` — one file per command.
- `src/lib/` — pure logic (`config`, `commit-message`, unit-tested) and side effects (`git`, `ollama`).
