import { Document } from "@contentful/rich-text-types"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"

// TODO: import other stylesheets for different looks on different pages
import styles from "./blog_post_preview_component.module.scss"
import React, { useEffect, useState } from "react"
import {
  ABBREVIATION_RENDER_OPTIONS,
  PostPreviewComponent,
  processImageData,
} from "../post_preview_component"
import {
  HasOptionalStyleSheet,
  ImageData,
} from "../../../lib/utils/types"
import {
  CONTENTFUL_IMAGE_QUERY,
  CONTENT_TYPE_IDS,
} from "../../../lib/contentful/constants"
import { CONTENT_TYPES } from "../../../lib/utils/constants"
import { processOptStyleSheet } from "../../../lib/utils/functions"
import cn from "classnames"

const CONTENT_TYPE_ID = CONTENT_TYPE_IDS.blog
const CONTENT_TYPE = CONTENT_TYPES.blog

export interface BlogPostPreviewComponentProps
  extends HasOptionalStyleSheet {
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
      author
      optionalTitleMediaCollection (limit: 1) {
        items ${CONTENTFUL_IMAGE_QUERY}
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
  const author = responseJsonData.author
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
  p: BlogPostPreviewComponentProps
) => {
  const [postProps, setPostProps] =
    useState<ContentfulBlogPostPreviewProps>(null!)
  // lazy-loading post data

  useEffect(() => {
    lazyLoad(p).then((props) => setPostProps(props))
  }, [p])

  const optStylesheet = processOptStyleSheet(p.optStyles)

  return postProps == null ? null : (
    <PostPreviewComponent
      entryId={p.entryId}
      contentType={CONTENT_TYPE}
      contentTypeId={CONTENT_TYPE_ID}
      title={postProps.title}
      body={documentToReactComponents(
        postProps.body,
        ABBREVIATION_RENDER_OPTIONS
      )}
      image={postProps.image}
      className={styles.blogPostPreviewComponent}
      baseStyles={styles}
      optStyles={optStylesheet}
    >
      <p>
        Published by {postProps.author} on{" "}
        {postProps.publishedAt}
      </p>
    </PostPreviewComponent>
  )
}
