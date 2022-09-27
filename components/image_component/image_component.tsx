import cn from "classnames"
import Image from "next/image"
import {
  HasOptionalStyleSheet,
  ImageData,
} from "../../lib/utils/types"

import styles from "./image_component.module.scss"

interface ImageComponentProps
  extends HasOptionalStyleSheet {
  image?: ImageData
  className?: string
  layout:
    | "fixed"
    | "fill"
    | "intrinsic"
    | "responsive"
    | "raw"
}

export const ImageComponent = (p: ImageComponentProps) => {
  if (p.image == undefined) return <div />

  let stylesheet = p.stylesheet ?? {}

  return (
    <section
      className={cn(
        styles.imageContainer,
        stylesheet.imageContainer,
        p.className
      )}
    >
      <Image
        className={styles.image}
        width={p.image.width}
        height={p.image.height}
        alt={p.image.title}
        src={p.image.url}
        layout={p.layout}
      />
    </section>
  )
}
