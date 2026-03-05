import { join } from "node:path";
import type { RustCrate, SearchEntry } from "./types";
import { RUSTDOC_TAGS } from "./constants";

/* originally taken from https://www.joshwcomeau.com/snippets/javascript/debounce/ */
export function debounce<T extends (...args: any[]) => void>(
  callback: T,
  wait: number,
) {
  let timeout: ReturnType<typeof setTimeout> | null = null;

  return (...args: Parameters<T>) => {
    timeout && clearTimeout(timeout);
    timeout = setTimeout(() => callback(...args), wait);
  };
}

export async function loadCrate(): Promise<RustCrate> {
  const { stdout, success } = Bun.spawnSync([
    "rustc",
    "+nightly",
    "--print",
    "sysroot",
  ]);

  if (!success) {
    throw new Error(
      "Nightly toolchain not found. Install it with: rustup toolchain install nightly",
    );
  }

  const sysroot = stdout.toString().trim();
  const coreDocsPath = join(
    sysroot,
    "share",
    "doc",
    "rust",
    "json",
    "core.json",
  );

  return Bun.file(coreDocsPath)
    .json()
    .catch((_) => {
      throw new Error(
        "Core JSON documentation not found. Install it with: rustup component add --toolchain nightly rust-docs-json",
      );
    });
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
    const pathName = path.slice(0, -1).join("::");
    const fullPathName = path.join("::");

    searchEntries.push({
      id: itemId,
      name,
      nameLower: name.toLowerCase(),
      kind,
      pathName,
      fullPathName,
    });
  }

  return searchEntries;
}

export function normalizeCodeBlocks(markdown: string): string {
  let insideCodeBlock = false;

  return markdown
    .replace(/^```(\w*)$/gm, (match, tag) => {
      if (insideCodeBlock) {
        insideCodeBlock = false;
        return match;
      }

      insideCodeBlock = true;
      if (!tag || RUSTDOC_TAGS.has(tag)) return "```rust";

      return match;
    })
    .replace(/^(#{1,6}\s+.*)$/gm, (line) => {
      return line.replace(/`([^`]*)`/g, "$1");
    })
    .replace(/^#\s.+$\n?/gm, "")
    .replace(/^\[.+\]:.+$\n?/gm, "");
}
