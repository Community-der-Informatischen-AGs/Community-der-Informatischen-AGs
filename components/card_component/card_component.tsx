import { useRouter } from "next/router"
import {
  HasOptionalStyleSheet,
  ImageData,
} from "../../lib/utils/types"
import styles from "./card_component.module.scss"

import cn from "classnames"
import Image from "next/image"

interface CardComponentProps extends HasOptionalStyleSheet {
  image: ImageData
  title: string
  text: string
  link?: string
  className?: string
}

export const CardComponent = (p: CardComponentProps) => {
  const router = useRouter()

  const stylesheet = p.stylesheet ?? {}

  return (
    <div
      className={cn(
        styles.cardComponent,
        p.className,
        stylesheet.cardComponent
      )}
      onClick={() => {
        if (p.link != undefined) {
          router.push(p.link)
        }
      }}
    >
      <section
        className={cn(
          styles.imageSection,
          stylesheet.imageSection
        )}
      >
        <Image
          src={p.image.url}
          alt={p.image.title}
          height={p.image.height}
          width={p.image.width}
        />
      </section>
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
