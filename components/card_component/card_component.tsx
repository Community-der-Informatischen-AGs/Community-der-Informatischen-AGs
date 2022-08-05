import { useRouter } from "next/router"
import { StyleSheet } from "../../lib/utils/types"
import styles from "./card_component.module.scss"

import cn from "classnames"

// TODO: use Next Images
interface CardComponentProps {
  imageSource: string
  imageAlt: string
  title: string
  text: string
  link: string
  className?: string
  styleSheet?: StyleSheet
}

export const CardComponent = (p: CardComponentProps) => {
  const router = useRouter()

  let stylesheet: StyleSheet = {}
  if (p.styleSheet != null) {
    stylesheet = p.styleSheet
  }

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
