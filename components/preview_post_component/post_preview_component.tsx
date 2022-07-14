import { useRouter } from "next/router"
import Image from "next/image"
import { ReactNode } from "react"
import { HandPointing } from "phosphor-react"

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

export interface ImageData {
  imageUrl: string
  imageHeight: number
  imageWidth: number
  imageTitle: string
}

export const processImageData = (image: any) => {
  if (image !== undefined) {
    return {
      imageUrl: image.url,
      imageHeight: image.height,
      imageWidth: image.width,
      imageTitle: image.title,
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
      className={props.className}
      onClick={() => {
        // this should work...
        router.push(
          `/${props.contentTypeId}/${props.entryId}`
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
      <section className={props.indicatorSectionClassName}>
        <HandPointing
          size={32}
          weight="fill"
          color="white"
        />
        <p>Click me to read more!</p>
      </section>
    </div>
  )
}
