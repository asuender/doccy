import type { DocEntry, RustCrateIndex } from "../types";

interface ItemDetailsProps {
  docEntry: DocEntry;
  crateIndex: RustCrateIndex;
}

function KindDetails({ docEntry, crateIndex }: ItemDetailsProps) {
  // TODO: implement item kind display
  return null;
}

export function ItemDetails({ docEntry, crateIndex }: ItemDetailsProps) {
  const deprecation = docEntry.deprecation;

  return (
    <box flexDirection="column" flexShrink={0}>
      {docEntry.pathName && <text fg="#888888">{docEntry.pathName}</text>}
      <text>
        <strong>
          {docEntry.kind} {docEntry.name}
        </strong>
      </text>

      {deprecation && (
        <text fg="#e5c07b">
          Deprecated since {deprecation.since}: {deprecation.note}
        </text>
      )}

      <KindDetails docEntry={docEntry} crateIndex={crateIndex} />
    </box>
  );
}
