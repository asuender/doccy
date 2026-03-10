import type { SearchEntry } from "../types";
import { KIND_ABBREVIATIONS } from "../constants";

interface ResultListProps {
  entries: SearchEntry[];
  focused: boolean;
  selectedIndex: number;
  onSelectionChange: (index: number) => void;
  onSelect: (index: number) => void;
}

export function ResultList({
  entries,
  focused,
  selectedIndex,
  onSelectionChange,
  onSelect,
}: ResultListProps) {
  const options = entries.map((entry) => ({
    name: `[${KIND_ABBREVIATIONS[entry.kind] ?? entry.kind}] ${entry.name}`,
    description: entry.pathName ?? "",
    value: entry,
  }));

  return (
    <box width={44} flexDirection="column" titleAlignment="left" gap={1}>
      <text>
        <strong>Results:</strong>
      </text>
      {entries.length > 0 && (
        <select
          focused={focused}
          options={options}
          selectedIndex={selectedIndex}
          showDescription={true}
          showScrollIndicator={true}
          wrapSelection={true}
          width="100%"
          height="100%"
          onChange={(index) => onSelectionChange(index)}
          onSelect={(index) => onSelect(index)}
        />
      )}
    </box>
  );
}
