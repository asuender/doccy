import { SyntaxStyle, RGBA } from "@opentui/core"
import type { DocEntry } from "../data"
import { kindLabel } from "../data"

// Required by <markdown> - bare minimum for readable output
const syntaxStyle = SyntaxStyle.fromStyles({
  keyword: { fg: RGBA.fromHex("#c678dd"), bold: true },
  string: { fg: RGBA.fromHex("#98c379") },
  comment: { fg: RGBA.fromHex("#888888"), italic: true },
  function: { fg: RGBA.fromHex("#61afef") },
  type: { fg: RGBA.fromHex("#e5c07b") },
  "markup.heading": { fg: RGBA.fromHex("#61afef"), bold: true },
  "markup.raw": { fg: RGBA.fromHex("#98c379") },
  default: { fg: RGBA.fromHex("#abb2bf") },
})

interface DocViewerProps {
  entry: DocEntry | null
  focused: boolean
}

export function DocViewer({ entry, focused }: DocViewerProps) {
  if (!entry) {
    return (
      <box
        flexGrow={1}
        borderStyle="rounded"
        justifyContent="center"
        alignItems="center"
      >
        <text>Press / to search</text>
      </box>
    )
  }

  const left = entry
    ? `${kindLabel(entry.kind)} ${entry.path}`
    : "doccy"

  return (
    <box
      flexGrow={1}
      title={entry.path}
      titleAlignment="left"
      flexDirection="column"
      gap={1}
    >
      <text><strong>{left}</strong></text>
      <scrollbox
        focused={focused}
        width="100%"
        height="100%"
        scrollY={true}
        viewportCulling={true}
      >
        <markdown
          content={entry.doc}
          syntaxStyle={syntaxStyle}
          conceal={true}
          width="100%"
        />
      </scrollbox>
    </box>
  )
}
