import { ReactNode } from "react"

type JSXElementComponentColor =
  | "blue"
  | "red"
  | "purple"
  | "yellow"
  | "green"

interface JSXElementComponentProps {
  color: JSXElementComponentColor
  children: ReactNode
}

const COLORTERM_TO_CSS_COLOR = {
  blue: "#82AADF",
  red: "#BC6778",
  purple: "#C792EA",
  yellow: "#FFFF00",
  green: "#95DC8D",
}

export const JSXElementComponent = (
  props: JSXElementComponentProps
) => {
  return (
    <span
      style={{
        color: COLORTERM_TO_CSS_COLOR[props.color],
      }}
    >{`<${props.children} />`}</span>
  )
}
