import { useKeyboard, useRenderer } from "@opentui/react";
import { useState, useCallback, useMemo } from "react";
import { SearchBar } from "./components/SearchBar";
import { ResultList } from "./components/ResultList";
import { DocViewer } from "./components/DocViewer";
import { StatusBar } from "./components/StatusBar";
import type {
  RustCrate,
  SearchEntry,
  DocEntry,
  RustItem,
  FocusPane,
} from "./types";
import { debounce } from "./utils";
import type { TreeSitterClient } from "@opentui/core";

interface AppProps {
  treeSitterClient: TreeSitterClient;
  crate: RustCrate;
  searchEntries: SearchEntry[];
}

function constructViewedEntry(item: RustItem, entry: SearchEntry): DocEntry {
  return {
    id: item.id,
    crate_id: item.crate_id,
    name: item.name ?? "",
    docs: item.docs ?? "",
    kind: entry.kind,
    deprecation: item.deprecation,
  };
}

export function App({ crate, searchEntries, treeSitterClient }: AppProps) {
  const renderer = useRenderer();
  const crateIndex = crate.index;

  const [query, setQuery] = useState("");
  const [focusPane, setFocusPane] = useState<FocusPane>("search");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [viewedEntry, setViewedEntry] = useState<DocEntry | null>(null);

  const showItemDocumentation = (index: number) => {
    const entry = filteredEntries[index];
    if (entry) {
      const item = crateIndex[entry.id]!;
      setViewedEntry(constructViewedEntry(item, entry));
      setFocusPane("doc");
    }
  };

  const filteredEntries = useMemo(() => {
    return searchEntries
      .filter((entry) => {
        return entry.nameLower.includes(query.toLowerCase());
      })
      .map((entry) => {
        if (entry.name === query) {
          entry.score = 2;
        } else if (entry.name.includes(query)) {
          entry.score = 1;
        } else {
          entry.score = 0;
        }

        return entry;
      })
      .sort((entryA, entryB) => entryB.score! - entryA.score!);
  }, [query]);

  const handleInput = useCallback((value: string) => {
    setQuery(value);
    setSelectedIndex(0);
  }, []);

  const debouncedHandleInput = useMemo(
    () => debounce(handleInput, 75),
    [handleInput],
  );

  const handleSelectionChange = useCallback((index: number) => {
    setSelectedIndex(index);
  }, []);

  const handleSelect = useCallback(showItemDocumentation, [filteredEntries]);

  useKeyboard((key) => {
    switch (key.name) {
      case "escape":
        if (!focusPane) {
          renderer.destroy();
        } else {
          setFocusPane(null);
        }
        break;

      case "/":
        if (focusPane !== "search") {
          key.preventDefault();
          setFocusPane("search");
        }
        break;

      case "down":
        if (focusPane === "search" && filteredEntries.length > 0) {
          setFocusPane("results");
        }
        break;

      case "right":
        if (focusPane === "results") {
          showItemDocumentation(selectedIndex);
        }
        break;

      case "left":
        if (focusPane === "doc" && filteredEntries.length > 0) {
          setFocusPane("results");
        }
        break;

      case "r":
        if (
          focusPane !== "results" &&
          focusPane !== "search" &&
          filteredEntries.length > 0
        ) {
          setFocusPane("results");
        }
        break;

      case "d":
        if (focusPane !== "doc" && focusPane != "search" && viewedEntry) {
          setFocusPane("doc");
        }
        break;

      case "return":
        if (focusPane === "search" && filteredEntries.length > 0) {
          setFocusPane("results");
        } else if (focusPane === "results") {
          showItemDocumentation(selectedIndex);
        }
    }
  });

  return (
    <box flexDirection="column" width="100%" height="100%" padding={1}>
      <box
        height={1}
        width="100%"
        flexDirection="row"
        justifyContent="space-between"
        paddingLeft={1}
        paddingRight={1}
      >
        <text>
          <strong>doccy</strong> - a Rust std & core browser
        </text>
      </box>

      <SearchBar
        focused={focusPane === "search"}
        query={query}
        onInput={debouncedHandleInput}
      />

      <box flexDirection="row" flexGrow={1} width="100%" gap={5}>
        <ResultList
          entries={filteredEntries}
          focused={focusPane === "results"}
          selectedIndex={selectedIndex}
          onSelectionChange={handleSelectionChange}
          onSelect={handleSelect}
        />
        <DocViewer
          docEntry={viewedEntry ?? null}
          focused={focusPane === "doc"}
          treeSitterClient={treeSitterClient}
        />
      </box>

      <box paddingTop={1}>
        <StatusBar
          focusPane={focusPane}
          hasResults={filteredEntries.length > 0}
          hasDocEntry={viewedEntry !== null}
        />
      </box>
    </box>
  );
}
