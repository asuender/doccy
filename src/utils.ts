import { join } from "node:path";
import type { RustCrate, SearchEntry } from "./types";

export async function loadCrate(): Promise<RustCrate> {
  const { stdout, success } = Bun.spawnSync(["rustc", "+nightly", "--print", "sysroot"]);

  if (!success) {
    throw new Error("Nightly toolchain not found. Install it with: rustup toolchain install nightly")
  }

  const sysroot = stdout.toString().trim();
  const coreDocsPath = join(sysroot, "share", "doc", "rust", "json", "core.json");

  return Bun.file(coreDocsPath).json().catch((_) => {
    throw new Error("Core JSON documentation not found. Install it with: rustup component add --toolchain nightly rust-docs-json")
  })
}

export function checkFormatVersion(data: RustCrate) {
  return data.format_version == 57;
}

export function createSearchEntries(crate: RustCrate) {
  const { index, paths } = crate;
  let searchEntries: SearchEntry[] = [];

  for (const [itemId, item] of Object.entries(index)) {
    const name = item.name;
    const kind = Object.keys(item.inner)[0];

    if (!name || !kind) continue;

    const path = paths[itemId]?.path ?? [];
    const pathName = path.join("::");

    searchEntries.push({ id: itemId, name, kind, pathName })
  }

  return searchEntries;
}
