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

export const RUST_PARSER: FiletypeParserOptions = {
  filetype: "rust",
  wasm: "https://github.com/tree-sitter/tree-sitter-rust/releases/download/v0.23.2/tree-sitter-rust.wasm",
  queries: {
    highlights: [
      "https://raw.githubusercontent.com/tree-sitter/tree-sitter-rust/v0.23.2/queries/highlights.scm",
    ],
  },
};
