export type RustCrate = {
  root: number;
  crate_version?: string;
  includes_private: boolean;
  index: RustCrateIndex;
  paths: RustCratePaths;
  external_crates: any;
  target: any;
  format_version: number;
};

export type RustCrateIndex = Record<string, RustItem>;
export type RustCratePaths = Record<string, RustItemSummary>;

export type RustItemSummary = {
  crate_id: number;
  path: [string];
  kind: string;
};

export type RustItem = {
  id: number;
  name?: string;
  docs?: string;
  inner: string;
};

export type SearchEntry = {
  id: string;
  name: string;
  kind: string;
  pathName?: string;
};

export type DocEntry = {
  id: number;
  name?: string;
  docs?: string;
  path?: [string];
  kind?: string;
};

export type FocusPane = "search" | "results" | "doc" | null;
