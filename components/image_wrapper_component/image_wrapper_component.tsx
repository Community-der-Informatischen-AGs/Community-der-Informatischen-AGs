import cn from "classnames"
import Image from "next/image"
import { ImageData } from "../../lib/utils/types"
import styles from "./image_wrapper_component.module.scss"

interface ImageWrapperProps {
  className?: string
  image: ImageData
}

export const ImageWrapper = (p: ImageWrapperProps) => {
  return (
    <div className={cn(p.className, styles.imageContainer)}>
      <div className={cn(styles.wrapper)}>
        <Image
          width={p.image.width}
          height={p.image.height}
          src={p.image.url}
          alt={p.image.title}
          layout="fill"
        />
      </div>
    </div>
  )
}
