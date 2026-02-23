import type { SearchEntry } from "../types"

interface ResultListProps {
  entries: SearchEntry[]
  focused: boolean
  selectedIndex: number
  onSelectionChange: (index: number) => void
  onSelect: (index: number) => void
}

export function ResultList({
  entries,
  focused,
  selectedIndex,
  onSelectionChange,
  onSelect,
}: ResultListProps) {
  const options = entries.map((entry) => ({
    name: `${entry.kind.padEnd(6)} ${entry.name}`,
    description: "",
    value: entry,
  }))

  return (
    <box
      width={34}
      flexDirection="column"
      titleAlignment="left"
      gap={1}
    >
      <text><strong>Results:</strong></text>
      <select
        focused={focused}
        options={options}
        selectedIndex={selectedIndex}
        showDescription={false}
        showScrollIndicator={true}
        wrapSelection={true}
        width="100%"
        height="100%"
        onChange={(index) => onSelectionChange(index)}
        onSelect={(index) => onSelect(index)}
      />
    </box>
  )
}
