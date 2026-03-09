import { FocusPane, type State } from "../types";

interface StatusBarProps {
  state: State;
  hasResults: boolean;
  hasDocEntry: boolean;
}

function showFocusedPane(state: State) {
  return `(focused: ${state.focusPane ?? "none"})`;
}

function showKeyhints({
  state,
  hasResults,
  hasDocEntry,
}: StatusBarProps): string {
  switch (state.focusPane) {
    case FocusPane.Search:
      return `${hasResults ? "Enter:results  down:results" : ""}  ESC:back`;
    case FocusPane.Results:
      return `/:search  ${hasDocEntry ? "d:documentation  " : ""}Enter:view  ESC:back`;
    case FocusPane.Doc:
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
      justifyContent="space-between"
      paddingLeft={1}
      paddingRight={1}
    >
      <text>{showFocusedPane(props.state)}</text>
      <text>{showKeyhints(props)}</text>
    </box>
  );
}
