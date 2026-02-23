import { createCliRenderer } from "@opentui/core"
import { createRoot } from "@opentui/react"
import { App } from "./app"
import { checkFormatVersion, createSearchIndex } from "./utils";
import type { Crate } from "./types";

const CORE_DOCS_PATH = "./assets/core.json"

const crate = await Bun.file(CORE_DOCS_PATH).json() as Crate;

if (!checkFormatVersion(crate)) {
  console.error("Unsupported format version.")
  process.exit(1)
}

const searchIndex = createSearchIndex(crate.index);
const renderer = await createCliRenderer()

createRoot(renderer).render(<App crate={crate} searchIndex={searchIndex} />)
