import type { FiletypeParserOptions } from "@opentui/core";

export const RUSTDOC_TAGS = new Set([
  "should_panic",
  "no_run",
  "ignore",
  "compile_fail",
  "should_fail",
  "test",
  "standalone_crate",
  "edition2021",
]);

export const KIND_ABBREVIATIONS: Record<string, string> = {
  assoc_const: "const",
  assoc_type: "type",
  constant: "const",
  enum: "enum",
  function: "fn",
  impl: "impl",
  macro: "macro",
  module: "mod",
  primitive: "prim",
  proc_macro: "pmacro",
  struct: "struct",
  struct_field: "field",
  trait: "trait",
  trait_alias: "trait",
  type_alias: "type",
  union: "union",
  use: "use",
  variant: "var",
};

export const RUST_PARSER: FiletypeParserOptions = {
  filetype: "rust",
  wasm: "https://github.com/tree-sitter/tree-sitter-rust/releases/download/v0.23.2/tree-sitter-rust.wasm",
  queries: {
    highlights: [
      "https://raw.githubusercontent.com/tree-sitter/tree-sitter-rust/v0.23.2/queries/highlights.scm",
    ],
  },
};
