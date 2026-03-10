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

export type RustItemInner = {
  module?: RustModule;
  enum?: RustEnum;
  variant?: RustVariant;
  [key: string]: unknown;
};

export type RustItemDeprecation = {
  since?: string;
  note?: string;
};

export type RustModule = {
  is_crate: boolean;
  items: number[];
  is_stripped: boolean;
};

export type RustEnum = {
  generics: RustGenerics;
  has_stripped_variants: boolean;
  variants: number[];
  impls: number[];
};

export type RustVariant = {
  kind: RustVariantKind;
  discriminant: RustDiscriminant | null;
};

export type RustVariantKind =
  | "plain"
  | { tuple: (number | null)[] }
  | { struct: { fields: number[]; has_stripped_fields: boolean } };

export type RustDiscriminant = {
  expr: string;
  value: string;
};

export type RustGenerics = {
  params: RustGenericParamDef[];
  where_predicates: unknown[];
};

export type RustGenericParamDef = {
  name: string;
  kind: unknown;
};

export type SearchEntry = {
  id: string;
  name: string;
  nameLower: string;
  kind: string;
  pathName?: string;
  fullPathName?: string;
  score?: number;
};

export type DocEntry = {
  id: number;
  crate_id: number;
  name?: string;
  docs?: string;
  path?: [string];
  pathName?: string;
  kind?: string;
  inner: RustItemInner;
  deprecation?: RustItemDeprecation;
};

export enum FocusPane {
  Search = "search",
  Results = "results",
  Doc = "documentation",
}

export type State = {
  focusPane: FocusPane | null;
};

export type FocusPane = "search" | "results" | "doc" | null;
