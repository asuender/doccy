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
  crate_id: number;
  name?: string;
  docs?: string;
  inner: RustItemInner;
  deprecation?: RustItemDeprecation;
};

export type RustItemInner = RustModule | {};

export type RustItemDeprecation = {
  since?: string;
  note?: string;
};

export type RustModule = {
  is_crate: boolean;
  items: number[];
  is_stripped: boolean;
};

export type SearchEntry = {
  id: string;
  name: string;
  nameLower: string;
  kind: string;
  pathName?: string;
  score?: number;
};

export type DocEntry = {
  id: number;
  crate_id: number;
  name?: string;
  docs?: string;
  path?: [string];
  kind?: string;
  inner: RustItemInner;
  deprecation?: RustItemDeprecation;
};

export type FocusPane = "search" | "results" | "doc" | null;
