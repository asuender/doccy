type FocusPane = "search" | "results" | "doc"

interface StatusBarProps {
  focusPane: FocusPane
}

function keyhints(pane: FocusPane): string {
  switch (pane) {
    case "search":
      return "Enter:results  ESC:back"
    case "results":
      return "/:search  Enter:view  ESC:quit"
    case "doc":
      return "/:search  ESC:quit"
  }
}

export function StatusBar({ focusPane }: StatusBarProps) {
  return (
    <box
      height={1}
      width="100%"
      flexDirection="row"
      justifyContent="flex-end"
      paddingLeft={1}
      paddingRight={1}
    >
      <text>{keyhints(focusPane)}</text>
    </box>
  )
}
