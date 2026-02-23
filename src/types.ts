export type Crate = {
  root: number,
  crate_version?: string,
  includes_private: boolean,
  index: CrateIndex,
  paths: CratePaths,
  external_crates: any,
  target: any,
  format_version: number
};

export type CrateIndex = Record<string, Item>;
export type CratePaths = Record<string, ItemSummary>;

export type ItemSummary = {
  crate_id: number,
  path: [string],
  kind: string
};

export type Item = {
  id: number,
  name?: string,
  docs?: string,
  inner: string
};

export type SearchEntry = {
  id: string,
  name: string,
  kind: string
};

export type DocEntry = {
  id: number,
  name?: string,
  docs?: string,
  path?: [string]
  kind?: string
};
