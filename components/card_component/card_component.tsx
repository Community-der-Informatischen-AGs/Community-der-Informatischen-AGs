import { useRouter } from "next/router"
import {
  HasOptionalImage,
  HasOptionalStyleSheet,
  SCSSStyleSheet,
} from "../../lib/utils/types"
import styles from "./card_component.module.scss"

import cn from "classnames"
import { processOptStyleSheet } from "../../lib/utils/functions"

// TODO: use Next Images
interface CardComponentProps extends HasOptionalStyleSheet {
  imageSource: string
  imageAlt: string
  title: string
  text: string
  link: string
  className?: string
}

export const CardComponent = (p: CardComponentProps) => {
  const router = useRouter()

  const stylesheet = processOptStyleSheet(p.optStyles)

  return (
    <div
      className={cn(
        styles.cardComponent,
        p.className,
        stylesheet.cardComponent
      )}
      onClick={() => {
        router.push(p.link)
      }}
    >
      <img src={p.imageSource} alt={p.imageAlt} />
      <section
        className={cn(
          styles.textSection,
          stylesheet.textSection
        )}
      >
        <h4>{p.title}</h4>
        <p>{p.text}</p>
      </section>
    </div>
  )
}
