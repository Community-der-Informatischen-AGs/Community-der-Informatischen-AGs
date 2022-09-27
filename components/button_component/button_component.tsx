import cn from "classnames"
import { LinkSimple } from "phosphor-react"
import React, { ButtonHTMLAttributes } from "react"
import styles from "./button_component.module.scss"

type ButtonWeight = "high" | "low"

interface ButtonComponentProps {
  icon?: JSX.Element
  weight: ButtonWeight
}

export const ButtonComponent = (
  p: ButtonComponentProps &
    ButtonHTMLAttributes<HTMLButtonElement>
) => {
  return (
    <button
      className={cn(styles.button, p.className)}
      data-weight={p.weight}
      onClick={p.onClick}
      disabled={p.disabled}
      title={p.title}
      type={p.type}
    >
      {p.children}
      {p.icon}
    </button>
  )
}

interface LinkButtonProps {
  weight: ButtonWeight
  link: string
}

export const LinkButton = (
  p: LinkButtonProps &
    ButtonHTMLAttributes<HTMLButtonElement>
) => {
  return (
    <ButtonComponent
      icon={<LinkSimple />}
      weight={p.weight}
      disabled={p.disabled}
      title={p.title}
      onClick={(e) => {
        window.location.href = p.link
      }}
    >
      {p.children}
    </ButtonComponent>
  )
}
