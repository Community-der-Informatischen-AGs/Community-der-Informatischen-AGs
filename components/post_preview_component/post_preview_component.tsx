import { Document } from "@contentful/rich-text-types"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import Image from "next/image"
import { useRouter } from "next/router"
import styles from "./post_preview_component.module.scss"
import { useEffect, useRef } from "react"

// TODO: create different components for different content types.

/*

query for getting all information for assets
 	asset(id: "asset id") {
  	title,
    url,
    height,
    width,
	}

*/

/**
 * [contentTypeId]: the content type id of the entry. blogPost for example
 * [entryId]: the entry Id to query the full data of the post
 *
 * TODO: maybe implement lazy loading to load information for post-previes later
 *
 *
 *
 */

/*
  title: string
  image?: {
    imageUrl: string
    imageWidth: number
    imageHeight: number
    imageTitle: string
  }
  body: Document // TODO: check if datatype is correct
  author: string
  publishedAt: string
  contentTypeId: string
  entryId: string
  className?: string
*/

export interface PostPreviewComponentProps {
  entryId: string
  contentTypeId: string
}

const postPreviewLazyLoad = (
  props: PostPreviewComponentProps,
  ref: React.MutableRefObject<HTMLDivElement>
) => {
  const LOADING_THRESHOLD = 200 + window.innerHeight // TODO: this is inefficient
  const currentPostPreviewOffset =
    ref.current.getBoundingClientRect().top

  if (currentPostPreviewOffset < LOADING_THRESHOLD) {
    // load content.

    console.log("lazy load content now")

    const bodyJson = {
      entryType: props.contentTypeId,
      entryId: props.entryId,
      entryQuery: `
        title
        author
        image {
          title,
          url,
          height,
          width,
        }
        body {
          json
        }
      `,
    }
    const responsePostData = fetch("POST", {
      body: JSON.stringify(bodyJson),
    })
  }
}

// * PostPreviewComponent should only render
export const PostPreviewComponent = (
  props: PostPreviewComponentProps
) => {
  const router = useRouter()

  const ref = useRef<HTMLDivElement>(null!)
  // lazy-loading post data
  useEffect(() => {
    window.addEventListener("scroll", () =>
      postPreviewLazyLoad(props, ref)
    )
  }, [ref])

  return (
    <div
      ref={ref}
      className={
        styles.postPreviewComponent +
        " " /*props.className*/
      }
      onClick={() => {
        // this should work...
        router.push(`/${props.contentTypeId}/entryId`)
      }}
    >
      <div className={styles.titleImageWrapper}>
        {/*props.image ? (
          <Image
            className={styles.titleImage}
            src={props.image.imageUrl}
            width={props.image.imageWidth}
            height={props.image.imageHeight}
            alt={props.image.imageTitle}
            layout="fill"
          />
        ) : (
          <div className={styles.titleImage} />
        )*/}
      </div>
      <h3>{/*props.title*/}</h3>
      <p className={styles.miscInfo}>
        published on {/*props.publishedAt*/}
      </p>
      <article>
        {/*documentToReactComponents(props.body)*/}
      </article>
    </div>
  )
}
