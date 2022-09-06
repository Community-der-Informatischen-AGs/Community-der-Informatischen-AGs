import { CSSProperties, ReactNode } from "react"
import styles from "./jsx_element_component.module.scss"

interface JSXElementComponentProps {
  color: string
  children: ReactNode
  style?: CSSProperties
}

export const JSXElementComponent = (
  props: JSXElementComponentProps
) => {
  const styling = props.style ?? {}

  return (
    <span
      style={styling}
      className={styles[props.color]}
    >{`<${props.children}/>`}</span>
  )
}
