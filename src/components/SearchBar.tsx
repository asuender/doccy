interface SearchBarProps {
  focused: boolean
  query: string
  onInput: (value: string) => void
}

export function SearchBar({ focused, query, onInput }: SearchBarProps) {
  return (
    <box
      height={3}
      width="100%"
      flexDirection="row"
      titleAlignment="left"
      alignItems="center"
      paddingLeft={1}
      paddingRight={1}
    >
      <text width={2}>/ </text>
      <input
        focused={focused}
        placeholder="Search std & core..."
        value={query}
        onInput={onInput}
        flexGrow={1}
      />
    </box>
  )
}
