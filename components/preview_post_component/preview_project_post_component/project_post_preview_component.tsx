import {
  BLOCKS,
  Document,
} from "@contentful/rich-text-types"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import styles from "./project_post_preview_component.module.scss"
import React, { useEffect, useState } from "react"
import {
  ABBREVIATION_RENDER_OPTIONS,
  PostPreviewComponent,
  processImageData,
} from "../post_preview_component"
import { Circle } from "phosphor-react"
import { ImageData } from "../../../lib/utils/types"
import { CONTENT_TYPES } from "../../../lib/utils/constants"
import { CONTENT_TYPE_IDS } from "../../../lib/contentful/constants"

const CONTENT_TYPE_ID = CONTENT_TYPE_IDS.project
const CONTENT_TYPE = CONTENT_TYPES.project

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
      body={documentToReactComponents(
        postProps.body,
        ABBREVIATION_RENDER_OPTIONS
      )}
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
          {postProps.finished
            ? "Beendet"
            : "In Bearbeitung"}
        </div>
      </div>
    </PostPreviewComponent>
  )
}
