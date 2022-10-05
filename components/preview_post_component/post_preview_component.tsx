import { useRouter } from "next/router"
import Image from "next/image"
import { ReactNode } from "react"
import { HandPointing } from "phosphor-react"

import styles from "./post_preview_component.module.scss"
import { CONTENT_TYPE_ID_TO_ROUTE } from "../../lib/contentful/constants"
import {
  HasOptionalImage,
  HasOptionalStyleSheet,
  SCSSStyleSheet,
} from "../../lib/utils/types"

import cn from "classnames"
import { BLOCKS } from "@contentful/rich-text-types"

export interface PostPreviewComponentProps
  extends HasOptionalImage,
    HasOptionalStyleSheet {
  entryId: string
  contentType: string
  contentTypeId: string
  title: string
  children?: ReactNode[] | ReactNode
  body?: ReactNode
  className?: string
  baseStyles: SCSSStyleSheet
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

export const ABBREVIATION_RENDER_OPTIONS = {
  renderNode: {
    [BLOCKS.DOCUMENT]: (node: any) => {
      return node.content.map((node: any) => {
        if (node.content.length != 0)
          return <p>{node.content[0].value}</p>
      })
    },
  },
}

// TODO: add common placeholder images etc.
export const PostPreviewComponent = (
  p: PostPreviewComponentProps
) => {
  const router = useRouter()

  const optStylesheet = p.stylesheet ?? {}

  return (
    <div
      style={{
        cursor: "pointer",
      }}
      className={cn(p.className, styles.postPreview)}
      onClick={() => {
        router.push(
          `${CONTENT_TYPE_ID_TO_ROUTE[p.contentTypeId]}/${
            p.entryId
          }`
        )
      }}
    >
      {p.image ? (
        <section
          className={cn(
            p.baseStyles.imageSection,
            optStylesheet.imageSection,
            styles.imageSection
          )}
        >
          <Image
            src={p.image.url}
            width={p.image.width}
            height={p.image.height}
            alt={p.image.title}
            layout="fill"
            objectFit="cover"
          />
        </section>
      ) : null}
      <section
        className={cn(
          p.baseStyles.textSection,
          optStylesheet.textSection,
          styles.textSection
        )}
      >
        <span
          style={{
            display: "block",
          }}
        >
          <h3 style={{ display: "inline" }}>{p.title}</h3>
          <p
            style={{
              display: "inline",
              fontSize: "1rem",
            }}
          >
            {" "}
            ({p.contentType})
          </p>
        </span>
        <section>{p.children}</section>
        <article>{p.body}</article>
      </section>
    </div>
  )
}
