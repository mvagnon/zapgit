import { $ } from "bun";

const UPSTREAM_REF = "@{upstream}";

export async function stageAll(): Promise<void> {
  await $`git add -A`.quiet();
}

export async function getStagedDiff(): Promise<string> {
  return await $`git diff --cached`.quiet().text();
}

export async function commit(message: string): Promise<void> {
  await $`git commit -m ${message}`.quiet();
}

export async function currentBranch(): Promise<string> {
  return (await $`git symbolic-ref --short HEAD`.quiet().text()).trim();
}

export async function hasUpstream(): Promise<boolean> {
  const result = await $`git rev-parse --abbrev-ref --symbolic-full-name ${UPSTREAM_REF}`
    .nothrow()
    .quiet();
  return result.exitCode === 0;
}

export async function push(): Promise<void> {
  await $`git push`.quiet();
}

export async function pushSetUpstream(branch: string): Promise<void> {
  await $`git push -u origin ${branch}`.quiet();
}
