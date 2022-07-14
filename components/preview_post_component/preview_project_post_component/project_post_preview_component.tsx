import { Document } from "@contentful/rich-text-types"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import styles from "./project_post_preview_component.module.scss"
import React, { useEffect, useState } from "react"
import {
  ImageData,
  PostPreviewComponent,
  processImageData,
} from "../post_preview_component"
import { Circle } from "phosphor-react"

const CONTENT_TYPE_ID = "projectPost"
const CONTENT_TYPE = "Project Post"

export interface ProjectPostPreviewComponentProps {
  entryId: string
}

export interface ContentfulProjectPostPreviewProps {
  contentType: string
  title: string
  body: Document
  image?: ImageData
  finished: boolean
  school: string
}

const lazyLoad = async (
  props: ProjectPostPreviewComponentProps
) => {
  const bodyJson = {
    entryType: CONTENT_TYPE_ID,
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
  const school = responseJsonData.assignedSchool.title
  const finished = responseJsonData.finished
  const image =
    responseJsonData.optionalTitleMediaCollection.items[0]

  return {
    contentType: CONTENT_TYPE_ID,
    title: title,
    body: bodyDocument,
    image: processImageData(image),
    school: school,
    finished: finished,
  }
}

export const ProjectPostPreviewComponent = (
  props: ProjectPostPreviewComponentProps
) => {
  const [postProps, setPostProps] =
    useState<ContentfulProjectPostPreviewProps>(null!)
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
