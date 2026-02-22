import { useKeyboard, useRenderer } from "@opentui/react"
import { useState, useCallback, useMemo } from "react"
import { DOC_ENTRIES, type DocEntry } from "./data"
import { SearchBar } from "./components/SearchBar"
import { ResultList } from "./components/ResultList"
import { DocViewer } from "./components/DocViewer"
import { StatusBar } from "./components/StatusBar"

type FocusPane = "search" | "results" | "doc"

function filterEntries(query: string): DocEntry[] {
  if (!query.trim()) return DOC_ENTRIES

  const lower = query.toLowerCase()
  return DOC_ENTRIES.filter((entry) => {
    return (
      entry.name.toLowerCase().includes(lower) ||
      entry.path.toLowerCase().includes(lower) ||
      entry.kind.includes(lower)
    )
  })
}

export function App() {
  const renderer = useRenderer()

  const [query, setQuery] = useState("")
  const [focusPane, setFocusPane] = useState<FocusPane>("search")
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [viewedEntry, setViewedEntry] = useState<DocEntry | null>(null)

  const filteredEntries = useMemo(() => filterEntries(query), [query])

  const handleInput = useCallback((value: string) => {
    setQuery(value)
    setSelectedIndex(0)
  }, [])

  const handleSelectionChange = useCallback((index: number) => {
    setSelectedIndex(index)
  }, [])

  const handleSelect = useCallback(
    (index: number) => {
      const entry = filteredEntries[index]
      if (entry) {
        setViewedEntry(entry)
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
        const entry = filteredEntries[selectedIndex]
        if (entry) {
          setViewedEntry(entry)
          setFocusPane("doc")
        }
      }
      return
    }
  })

  const currentEntry = filteredEntries[selectedIndex] ?? null
  const displayEntry = viewedEntry ?? currentEntry

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
          entry={displayEntry}
          focused={focusPane === "doc"}
        />
      </box>

      <box paddingTop={1}>
        <StatusBar focusPane={focusPane} />
      </box>
    </box>
  )
}
