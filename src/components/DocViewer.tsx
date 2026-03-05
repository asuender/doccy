import {
  SyntaxStyle,
  RGBA,
  TreeSitterClient,
  CodeRenderable,
  BoxRenderable,
} from "@opentui/core";
import { type DocEntry } from "../types";
import { normalizeCodeBlocks } from "../utils";
import { useRenderer } from "@opentui/react";

// Required by <markdown> - bare minimum for readable output
const syntaxStyle = SyntaxStyle.fromStyles({
  keyword: { fg: RGBA.fromHex("#c678dd"), bold: true },
  string: { fg: RGBA.fromHex("#98c379") },
  comment: { fg: RGBA.fromHex("#888888"), italic: true },
  function: { fg: RGBA.fromHex("#61afef") },
  type: { fg: RGBA.fromHex("#e5c07b") },
  "markup.heading": { fg: RGBA.fromHex("#61afef"), bold: true },
  "markup.heading.1": { bold: true, underline: true },
  "markup.heading.2": { bold: true },
  "markup.heading.3": { italic: true },
  "markup.raw": { fg: RGBA.fromHex("#98c379") },
  default: { fg: RGBA.fromHex("#abb2bf") },
});

interface DocViewerProps {
  docEntry: DocEntry | null;
  focused: boolean;
  treeSitterClient: TreeSitterClient;
}

function ItemDetails({ docEntry }: { docEntry: DocEntry }) {
  switch (docEntry.kind) {
    case "module":
    default:
      return null;
  }
}

export function DocViewer({
  docEntry,
  focused,
  treeSitterClient,
}: DocViewerProps) {
  if (!docEntry) {
    return (
      <box flexGrow={1} justifyContent="center" alignItems="center">
        <text>Press / to search</text>
      </box>
    );
  }

  const renderer = useRenderer();
  const left = docEntry ? `${docEntry.kind} ${docEntry.name}` : "doccy";
  const deprecation = docEntry.deprecation;

  return (
    <box flexGrow={1} flexDirection="column" gap={1}>
      <box flexDirection="column" height={deprecation ? 2 : 1}>
        <text>
          <strong>{left}</strong>
        </text>
        {deprecation && (
          <text fg="#e5c07b">
            Deprecated since {deprecation.since}: {deprecation.note}
          </text>
        )}
      </box>

      <ItemDetails docEntry={docEntry} />

      <scrollbox
        focused={focused}
        width="100%"
        height="100%"
        scrollY={true}
        viewportCulling={true}
        paddingRight={2}
      >
        <markdown
          content={
            docEntry.docs
              ? normalizeCodeBlocks(docEntry.docs)
              : "No documentation for this item."
          }
          syntaxStyle={syntaxStyle}
          conceal={true}
          width="100%"
          treeSitterClient={treeSitterClient}
          renderNode={(token, context) => {
            if (token.type === "code") {
              const codeRenderable = context.defaultRender() as CodeRenderable;

              if (codeRenderable) {
                codeRenderable.marginBottom = 0;

                const wrapper = new BoxRenderable(renderer, {
                  width: "100%",
                  paddingLeft: 2,
                  marginBottom: 1,
                });
                wrapper.add(codeRenderable);

                return wrapper;
              }
            }
            return undefined;
          }}
        />
      </scrollbox>
    </box>
  );
}
