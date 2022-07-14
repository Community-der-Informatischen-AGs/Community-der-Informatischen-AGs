import { Document } from "@contentful/rich-text-types"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import styles from "./blog_post_preview_component.module.scss"
import React, { useEffect, useState } from "react"
import {
  ImageData,
  PostPreviewComponent,
  processImageData,
} from "../post_preview_component"

const CONTENT_TYPE_ID = "blogPost"
const CONTENT_TYPE = "Blog Post"

export interface BlogPostPreviewComponentProps {
  entryId: string
}

export interface ContentfulBlogPostPreviewProps {
  author: string
  contentType: string
  title: string
  body: Document
  publishedAt: string
  image?: ImageData
}

const lazyLoad = async (
  props: BlogPostPreviewComponentProps
) => {
  const bodyJson = {
    entryType: CONTENT_TYPE_ID,
    entryId: props.entryId,
    entryQuery: `
      title
      author {
        title
      }
      optionalTitleMediaCollection (limit: 1) {
        items {
          title,
          url,
          height,
          width,
        } 
      }
      body {
        json
      }
      sys {
        publishedAt
      }
    `,
  }
  const responsePostData = await fetch(
    "/api/contentful/entry",
    {
      method: "POST",
      body: JSON.stringify(bodyJson),
    }
  )

  const responseJsonData = (await responsePostData.json())
    .data.blogPost
  const title = responseJsonData.title
  const bodyDocument = responseJsonData.body.json
  // TODO: add locales!
  const publishedAt = new Date(
    responseJsonData.sys.publishedAt
  ).toLocaleDateString()
  const author = responseJsonData.author.title
  const image =
    responseJsonData.optionalTitleMediaCollection.items[0]

  return {
    author: author,
    contentType: CONTENT_TYPE_ID,
    title: title,
    body: bodyDocument,
    publishedAt: publishedAt,
    image: processImageData(image),
  }
}

export const BlogPostPreviewComponent = (
  props: BlogPostPreviewComponentProps
) => {
  const [postProps, setPostProps] =
    useState<ContentfulBlogPostPreviewProps>(null!)
  // lazy-loading post data

  useEffect(() => {
    lazyLoad(props).then((props) => setPostProps(props))
  }, [props])

  return postProps == null ? null : (
    <PostPreviewComponent
      entryId={props.entryId}
      contentType={CONTENT_TYPE}
      contentTypeId={CONTENT_TYPE_ID}
      title={postProps.title}
      body={documentToReactComponents(postProps.body)}
      image={postProps.image}
      className={styles.blogPostPreviewComponent}
      imageSectionClassName={styles.previewImage}
      textSectionClassName={styles.previewText}
    >
      <p>
        Published by {postProps.author} on{" "}
        {postProps.publishedAt}
      </p>
    </PostPreviewComponent>
  )
}
