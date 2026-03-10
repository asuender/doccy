import {
  SyntaxStyle,
  RGBA,
  TreeSitterClient,
  CodeRenderable,
  BoxRenderable,
  LineNumberRenderable,
} from "@opentui/core";
import { type DocEntry, type RustCrateIndex } from "../types";
import { normalizeCodeBlocks } from "../utils";
import { useRenderer } from "@opentui/react";
import { ItemDetails } from "./ItemDetails";

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
  crateIndex: RustCrateIndex;
  treeSitterClient: TreeSitterClient;
}

export function DocViewer({
  docEntry,
  focused,
  crateIndex,
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

  return (
    <box flexGrow={1} flexDirection="column" gap={1}>
      <ItemDetails docEntry={docEntry} crateIndex={crateIndex} />

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
                  marginBottom: 1,
                });

                if (!token.text.trim().includes("\n")) {
                  wrapper.add(codeRenderable);
                } else {
                  wrapper.add(
                    new LineNumberRenderable(renderer, {
                      target: codeRenderable,
                      paddingRight: 3,
                    }),
                  );
                }

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
