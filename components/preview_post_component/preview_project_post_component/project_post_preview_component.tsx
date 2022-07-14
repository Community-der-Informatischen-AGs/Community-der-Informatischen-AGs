import { Document } from "@contentful/rich-text-types"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import styles from "./project_post_preview_component.module.scss"
import React, { useEffect, useState } from "react"
import { PostPreviewComponent } from "../post_preview_component"
import { Circle } from "phosphor-react"

const contentTypeId = "projectPost"
const contentType = "Project Post"

export interface ProjectPostPreviewComponentProps {
  entryId: string
}

export interface ContentfulProjectPostProps {
  contentType: string
  title: string
  body: Document
  image: {
    imageUrl: string
    imageHeight: number
    imageWidth: number
    imageTitle: string
  }
  finished: boolean
  school: string
}

const lazyLoad = async (
  props: ProjectPostPreviewComponentProps
) => {
  console.log("lazy load content now")

  const bodyJson = {
    entryType: contentTypeId,
    entryId: props.entryId,
    entryQuery: `
      title
      optionalTitleMediaCollection (limit: 1) {
        items {
          title,
          width,
          height,
          url
        }
      }
      body {
        json
      }
      assignedSchool {
        title
      }
      finished 
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
    .data.projectPost
  const title = responseJsonData.title
  const bodyDocument = responseJsonData.body.json
  const image =
    responseJsonData.optionalTitleMediaCollection.items[0]
  const imageUrl = image.url
  const imageHeight = image.height
  const imageWidth = image.width
  const imageTitle = image.title
  const school = responseJsonData.assignedSchool.title
  const finished = responseJsonData.finished

  return {
    contentType: contentTypeId,
    title: title,
    body: bodyDocument,
    image: {
      imageUrl: imageUrl,
      imageHeight: imageHeight,
      imageWidth: imageWidth,
      imageTitle: imageTitle,
    },
    school: school,
    finished: finished,
  }
}

export const ProjectPostPreviewComponent = (
  props: ProjectPostPreviewComponentProps
) => {
  const [postProps, setPostProps] =
    useState<ContentfulProjectPostProps>(null!)
  // lazy-loading post data

  useEffect(() => {
    lazyLoad(props).then((props) => setPostProps(props))
  }, [props])

  return postProps == null ? null : (
    <PostPreviewComponent
      entryId={props.entryId}
      contentType={contentType}
      contentTypeId={contentTypeId}
      title={postProps.title}
      body={documentToReactComponents(postProps.body)}
      image={postProps.image}
      className={styles.projectPostPreviewComponent}
      imageSectionClassName={styles.previewImage}
      textSectionClassName={styles.previewText}
    >
      <div>
        <p>Project by {postProps.school}</p>
        <div className={styles.status}>
          <Circle
            color={postProps.finished ? "green" : "orange"}
            weight="fill"
            size={20}
          />
          {postProps.finished ? "finished" : "ongoing"}
        </div>
      </div>
    </PostPreviewComponent>
  )
}
