import type { CrateIndex, SearchEntry } from "./types";

export function checkFormatVersion(data: any) {
  return data.format_version == 57;
}

export function createSearchIndex(index: CrateIndex) {
  let searchEntries: SearchEntry[] = [];

  for (const [itemId, item] of Object.entries(index)) {
    if (item.name != undefined) {
      const kind = Object.keys(item.inner!)[0]!;
      searchEntries.push({ id: itemId, name: item.name, kind: kind })
    }
  }

  return searchEntries;
}
