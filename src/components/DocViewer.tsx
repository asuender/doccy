import { SyntaxStyle, RGBA } from "@opentui/core";
import { type DocEntry } from "../types";

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
});

interface DocViewerProps {
  docEntry: DocEntry | null;
  focused: boolean;
}

export function DocViewer({ docEntry, focused }: DocViewerProps) {
  if (!docEntry) {
    return (
      <box flexGrow={1} justifyContent="center" alignItems="center">
        <text>Press / to search</text>
      </box>
    );
  }

  const left = docEntry ? `${docEntry.kind} ${docEntry.name}` : "doccy";

  return (
    <box flexGrow={1} titleAlignment="left" flexDirection="column" gap={1}>
      <text>
        <strong>{left}</strong>
      </text>
      <scrollbox
        focused={focused}
        width="100%"
        height="100%"
        scrollY={true}
        viewportCulling={true}
      >
        <markdown
          content={docEntry.docs ?? "No documentation for this item."}
          syntaxStyle={syntaxStyle}
          conceal={true}
          width="100%"
        />
      </scrollbox>
    </box>
  );
}
