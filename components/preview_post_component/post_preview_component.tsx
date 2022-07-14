import { useRouter } from "next/router"
import Image from "next/image"
import { ReactNode } from "react"

export interface PostPreviewComponentProps {
  entryId: string
  contentType: string
  title: string
  image?: {
    imageTitle: string
    imageHeight: number
    imageWidth: number
    imageUrl: string
  }
  publishedAt?: string
  author?: string
  body: ReactNode
  className?: string
  imageSectionClassName?: string
  textSectionClassName?: string
}

// TODO: add common placeholder images etc.
export const PostPreviewComponent = (
  props: PostPreviewComponentProps
) => {
  const router = useRouter()

  return (
    <div
      className={props.className}
      onClick={() => {
        // this should work...
        router.push(
          `/${props.contentType}/${props.entryId}`
        )
      }}
    >
      {props.image ? (
        <section className={props.imageSectionClassName}>
          <Image
            src={props.image.imageUrl}
            width={props.image.imageWidth}
            height={props.image.imageHeight}
            alt={props.image.imageTitle}
            layout="responsive"
          />
        </section>
      ) : null}
      <section className={props.textSectionClassName}>
        <h3>{props.title}</h3>
        {props.publishedAt ? (
          <p>published on {props.publishedAt}</p>
        ) : null}
        {props.author ? (
          <p>published by {props.author}</p>
        ) : null}
        <article>{props.body}</article>
      </section>
    </div>
  )
}
