import { join } from "node:path";
import type { Crate, CrateIndex, SearchEntry } from "./types";

export async function loadCrate(): Promise<Crate> {
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

export function checkFormatVersion(data: any) {
  return data.format_version == 57;
}

export function createSearchIndex(index: CrateIndex) {
  let searchEntries: SearchEntry[] = [];

  for (const [itemId, item] of Object.entries(index)) {
    if (item.name != undefined) {
      const kind = Object.keys(item.inner)[0]!;
      searchEntries.push({ id: itemId, name: item.name, kind: kind })
    }
  }

  return searchEntries;
}
