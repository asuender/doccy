import { useKeyboard, useRenderer } from "@opentui/react"
import { useState, useCallback, useMemo } from "react"
import { SearchBar } from "./components/SearchBar"
import { ResultList } from "./components/ResultList"
import { DocViewer } from "./components/DocViewer"
import { StatusBar } from "./components/StatusBar"
import type { RustCrate, SearchEntry, DocEntry, RustItem } from "./types"

interface AppProps {
  crate: RustCrate,
  searchEntries: SearchEntry[]
};

type FocusPane = "search" | "results" | "doc"

function constructViewedEntry(item: RustItem, entry: SearchEntry): DocEntry {
  return {
    id: item.id,
    name: item.name ?? "",
    docs: item.docs ?? "",
    kind: entry.kind
  }
}

export function App({ crate, searchEntries }: AppProps) {
  const renderer = useRenderer()

  const crateIndex = crate.index;

  const [query, setQuery] = useState("")
  const [focusPane, setFocusPane] = useState<FocusPane>("search")
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [viewedEntry, setViewedEntry] = useState<DocEntry | null>(null)

  const filteredEntries = useMemo(() => {
    return searchEntries.filter((entry) => {
      return entry.name.toLowerCase().includes(query.toLowerCase())
    });
  }, [query])

  const handleInput = useCallback((value: string) => {
    setQuery(value)
    setSelectedIndex(0)
  }, [])

  const handleSelectionChange = useCallback((index: number) => {
    setSelectedIndex(index)
  }, [])

  const handleSelect = useCallback(
    (index: number) => {
      const entry = filteredEntries[index]!
      if (entry) {
        const item = crateIndex[entry.id]!;
        setViewedEntry(constructViewedEntry(item, entry))
        setFocusPane("doc")
      }
    },
    [filteredEntries],
  )

  useKeyboard((key) => {
    if (key.name === "escape") {
      if (focusPane === "search") {
        setFocusPane("results")
      } else {
        renderer.destroy()
      }
      return
    }

    if (key.name === "/" && focusPane !== "search") {
      key.preventDefault()
      setFocusPane("search")
      return
    }

    if (key.name === "return") {
      if (focusPane === "search" && filteredEntries.length > 0) {
        setFocusPane("results")
      } else if (focusPane === "results") {
        const entry = filteredEntries[selectedIndex]!
        if (entry) {
          const item = crateIndex[entry.id]!;
          setViewedEntry(constructViewedEntry(item, entry))
          setFocusPane("doc")
        }
      }
      return
    }
  })

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
        onInput={handleInput}
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
        />
      </box>

      <box paddingTop={1}>
        <StatusBar focusPane={focusPane} />
      </box>
    </box>
  )
}
