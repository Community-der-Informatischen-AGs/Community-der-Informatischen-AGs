import { useRouter } from "next/router"
import Image from "next/image"
import { ReactNode } from "react"
import { HandPointing } from "phosphor-react"

export interface PostPreviewComponentProps {
  entryId: string
  contentType: string
  contentTypeId: string
  title: string
  image?: {
    imageTitle: string
    imageHeight: number
    imageWidth: number
    imageUrl: string
  }
  children?: ReactNode[] | ReactNode
  body: ReactNode
  className?: string
  imageSectionClassName?: string
  textSectionClassName?: string
  indicatorSectionClassName?: string
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
        <span>
          <h3>{props.title}</h3>
          <p> ({props.contentType})</p>
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
