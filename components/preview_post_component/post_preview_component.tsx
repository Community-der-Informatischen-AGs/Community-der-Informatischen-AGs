import { useRouter } from "next/router"
import Image from "next/image"
import { ReactNode } from "react"
import { HandPointing } from "phosphor-react"

import styles from "./post_preview_component.module.scss"
import { CONTENT_TYPE_ID_TO_ROUTE } from "../../lib/contentful/constants"
import { ImageData } from "../../lib/utils/types"

export interface PostPreviewComponentProps {
  entryId: string
  contentType: string
  contentTypeId: string
  title: string
  image?: ImageData
  children?: ReactNode[] | ReactNode
  body?: ReactNode
  className?: string
  imageSectionClassName?: string
  textSectionClassName?: string
  indicatorSectionClassName?: string
}

export const processImageData = (image: any) => {
  if (image !== undefined && image !== null) {
    return {
      url: image.url,
      height: image.height,
      width: image.width,
      title: image.title,
    }
  }

  return undefined
}

// TODO: add common placeholder images etc.
export const PostPreviewComponent = (
  props: PostPreviewComponentProps
) => {
  const router = useRouter()

  return (
    <div
      style={{
        cursor: "pointer",
      }}
      className={props.className + " " + styles.postPreview}
      onClick={() => {
        // this should work...
        router.push(
          `/${
            CONTENT_TYPE_ID_TO_ROUTE[props.contentTypeId]
          }/${props.entryId}`
        )
      }}
    >
      {props.image ? (
        <section
          className={
            props.imageSectionClassName +
            " " +
            styles.imageSection
          }
        >
          <Image
            src={props.image.url}
            width={props.image.width}
            height={props.image.height}
            alt={props.image.title}
            layout="fill"
          />
        </section>
      ) : null}
      <section className={props.textSectionClassName}>
        <span
          style={{
            display: "block",
          }}
        >
          <h3 style={{ display: "inline" }}>
            {props.title}
          </h3>
          <p
            style={{
              display: "inline",
              fontSize: "1rem",
            }}
          >
            {" "}
            ({props.contentType})
          </p>
        </span>
        {props.children}
        <article>{props.body}</article>
      </section>
    </div>
  )
}
