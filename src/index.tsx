import { createCliRenderer } from "@opentui/core"
import { createRoot } from "@opentui/react"
import { App } from "./app"
import { checkFormatVersion, createSearchIndex, loadCrate } from "./utils";

const crate = await loadCrate().catch((error) => {
  console.error(error.message);
  process.exit(1);
})

if (!checkFormatVersion(crate)) {
  console.error("Unsupported format version.")
  process.exit(1)
}

const searchIndex = createSearchIndex(crate.index);
const renderer = await createCliRenderer()

createRoot(renderer).render(<App crate={crate} searchIndex={searchIndex} />)
