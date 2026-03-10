import {
  createCliRenderer,
  addDefaultParsers,
  getTreeSitterClient,
} from "@opentui/core";
import { createRoot } from "@opentui/react";
import { App } from "./app";
import {
  isSupportedFormatVersion,
  createSearchEntries,
  loadCrate,
} from "./utils";
import { RUST_PARSER } from "./constants";

const crate = await loadCrate().catch((error) => {
  console.error(error.message);
  process.exit(1);
});

if (!isSupportedFormatVersion(crate)) {
  console.error("Unsupported format version.");
  process.exit(1);
}

const searchEntries = createSearchEntries(crate);
// I disabled auto focus here as clicking around and automatically selecting
// the nearest element conflicts with my own state management
// Scrolling through the docs using the wheel is fine though
const renderer = await createCliRenderer({ autoFocus: false });

addDefaultParsers([RUST_PARSER]);

const treeSitterClient = getTreeSitterClient();
await treeSitterClient.initialize();

createRoot(renderer).render(
  <App
    crate={crate}
    searchEntries={searchEntries}
    treeSitterClient={treeSitterClient}
  />,
);
