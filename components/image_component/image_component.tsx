import cn from "classnames"
import Image, { ImageProps } from "next/image"
import { HTMLProps } from "react"
import {
  HasOptionalStyleSheet,
  ImageData,
} from "../../lib/utils/types"

import styles from "./image_component.module.scss"

interface ImageComponentProps
  extends HasOptionalStyleSheet,
    ImageProps {
  onClick?: (e: any) => {}
  image?: ImageData
  className?: string
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
      onClick={(e) => {
        if (p.onClick != undefined) p.onClick(e)
      }}
    >
      <Image
        className={styles.image}
        width={p.image.width}
        height={p.image.height}
        alt={p.image.title}
        {...p}
        src={p.image.url}
      />
    </section>
  )
}
