import { useKeyboard, useRenderer } from "@opentui/react";
import { useState, useCallback, useMemo } from "react";
import { SearchBar } from "./components/SearchBar";
import { ResultList } from "./components/ResultList";
import { DocViewer } from "./components/DocViewer";
import { StatusBar } from "./components/StatusBar";
import {
  type RustCrate,
  type SearchEntry,
  type DocEntry,
  type RustItem,
  type State,
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
    pathName: entry.pathName,
    docs: item.docs ?? "",
    kind: entry.kind,
    inner: item.inner,
    deprecation: item.deprecation,
  };
}

export function App({ crate, searchEntries, treeSitterClient }: AppProps) {
  const renderer = useRenderer();
  const crateIndex = crate.index;

  const [query, setQuery] = useState("");
  const [state, setState] = useState<State>({ focusPane: FocusPane.Search });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [viewedEntry, setViewedEntry] = useState<DocEntry | null>(null);

  const setFocusPane = (focusPane: FocusPane | null) => {
    setState((prev) => ({ ...prev, focusPane }));
  };

  const showItemDocumentation = (index: number) => {
    const entry = filteredEntries[index];
    if (entry) {
      const item = crateIndex[entry.id]!;
      setViewedEntry(constructViewedEntry(item, entry));
      setFocusPane(FocusPane.Doc);
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
        if (!state.focusPane) {
          renderer.destroy();
        } else {
          setFocusPane(null);
        }
        break;

      case "/":
        if (state.focusPane !== FocusPane.Search) {
          key.preventDefault();
          setFocusPane(FocusPane.Search);
        }
        break;

      case "down":
        if (
          state.focusPane === FocusPane.Search &&
          filteredEntries.length > 0
        ) {
          setFocusPane(FocusPane.Results);
        }
        break;

      case "right":
        if (state.focusPane === FocusPane.Results) {
          showItemDocumentation(selectedIndex);
        }
        break;

      case "left":
        if (state.focusPane === FocusPane.Doc && filteredEntries.length > 0) {
          setFocusPane(FocusPane.Results);
        }
        break;

      case "r":
        if (
          state.focusPane !== FocusPane.Results &&
          state.focusPane !== FocusPane.Search &&
          filteredEntries.length > 0
        ) {
          setFocusPane(FocusPane.Results);
        }
        break;

      case "d":
        if (
          state.focusPane !== FocusPane.Doc &&
          state.focusPane !== FocusPane.Search &&
          viewedEntry
        ) {
          setFocusPane(FocusPane.Doc);
        }
        break;

      case "return":
        if (
          state.focusPane === FocusPane.Search &&
          filteredEntries.length > 0
        ) {
          setFocusPane(FocusPane.Results);
        } else if (state.focusPane === FocusPane.Results) {
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
        focused={state.focusPane === FocusPane.Search}
        query={query}
        onInput={debouncedHandleInput}
      />

      <box flexDirection="row" flexGrow={1} width="100%" gap={5}>
        <ResultList
          entries={filteredEntries}
          focused={state.focusPane === FocusPane.Results}
          selectedIndex={selectedIndex}
          onSelectionChange={handleSelectionChange}
          onSelect={handleSelect}
        />
        <DocViewer
          docEntry={viewedEntry ?? null}
          focused={state.focusPane === FocusPane.Doc}
          crateIndex={crateIndex}
          treeSitterClient={treeSitterClient}
        />
      </box>

      <box paddingTop={1}>
        <StatusBar
          state={state}
          hasResults={filteredEntries.length > 0}
          hasDocEntry={viewedEntry !== null}
        />
      </box>
    </box>
  );
}
