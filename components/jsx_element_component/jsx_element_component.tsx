import { CSSProperties, ReactNode } from "react"

type JSXElementComponentColor =
  | "blue"
  | "red"
  | "purple"
  | "yellow"
  | "green"

interface JSXElementComponentProps {
  color: JSXElementComponentColor
  children: ReactNode
  style?: CSSProperties
}

const COLORTERM_TO_CSS_COLOR = {
  blue: "#82AADF",
  red: "#BC6778",
  purple: "#C792EA",
  yellow: "#FFCB6B",
  green: "#95DC8D",
}

export const JSXElementComponent = (
  props: JSXElementComponentProps
) => {
  const styling = props.style ?? {}
  styling.color = COLORTERM_TO_CSS_COLOR[props.color]

  return (
    <span style={styling}>{`<${props.children}/>`}</span>
  )
}
