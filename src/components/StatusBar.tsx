import type { FocusPane } from "../types";

interface StatusBarProps {
  focusPane: FocusPane;
  hasResults: boolean;
  hasDocEntry: boolean;
}

function showKeyhints({
  focusPane,
  hasResults,
  hasDocEntry,
}: StatusBarProps): string {
  switch (focusPane) {
    case "search":
      return `${hasResults ? "Enter:results  down:results" : ""}  ESC:back`;
    case "results":
      return `/:search  ${hasDocEntry ? "d:documentation  " : ""}Enter:view  ESC:back`;
    case "doc":
      return `/:search  ${hasResults ? "left:results  " : ""}ESC:back`;
    default:
      return `/:search  ${hasResults ? "r:results  " : ""}${hasDocEntry ? "d:documentation  " : ""}ESC:quit`;
  }
}

export function StatusBar(props: StatusBarProps) {
  return (
    <box
      height={1}
      width="100%"
      flexDirection="row"
      justifyContent="flex-end"
      paddingLeft={1}
      paddingRight={1}
    >
      <text>{showKeyhints(props)}</text>
    </box>
  );
}
