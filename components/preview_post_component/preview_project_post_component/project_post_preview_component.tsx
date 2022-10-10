import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import { Document } from "@contentful/rich-text-types"
import { Circle } from "phosphor-react"
import { useEffect, useState } from "react"
import {
  CONTENTFUL_IMAGE_QUERY,
  CONTENT_TYPE_IDS,
} from "../../../lib/contentful/constants"
import { CONTENT_TYPES } from "../../../lib/utils/constants"
import {
  HasOptionalImage,
  HasOptionalStyleSheet,
} from "../../../lib/utils/types"
import {
  ABBREVIATION_RENDER_OPTIONS,
  PostPreviewComponent,
  processImageData,
} from "../post_preview_component"
import styles from "./project_post_preview_component.module.scss"

const CONTENT_TYPE_ID = CONTENT_TYPE_IDS.project
const CONTENT_TYPE = CONTENT_TYPES.project

export interface ProjectPostPreviewComponentProps
  extends HasOptionalStyleSheet {
  entryId: string
}

export interface ContentfulProjectPostPreviewProps
  extends HasOptionalImage {
  contentType: string
  title: string
  body: Document
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
        items ${CONTENTFUL_IMAGE_QUERY}
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
  const school = responseJsonData.assignedSchool
  const schoolName = school?.title
  const finished = responseJsonData.finished
  const image =
    responseJsonData.optionalTitleMediaCollection.items[0]

  return {
    contentType: CONTENT_TYPE_ID,
    title: title,
    body: bodyDocument,
    image: processImageData(image),
    school: schoolName,
    finished: finished,
  }
}

export const ProjectPostPreviewComponent = (
  p: ProjectPostPreviewComponentProps
) => {
  const [postProps, setPostProps] =
    useState<ContentfulProjectPostPreviewProps>(null!)
  // lazy-loading post data

  useEffect(() => {
    lazyLoad(p).then((props) => setPostProps(props))
  }, [p])

  const optStylesheet = p.stylesheet ?? {}

  return postProps == null ? null : (
    <PostPreviewComponent
      entryId={p.entryId}
      contentType={CONTENT_TYPE}
      contentTypeId={CONTENT_TYPE_ID}
      title={postProps.title}
      body={
        documentToReactComponents(
          postProps.body,
          ABBREVIATION_RENDER_OPTIONS
        ) ?? "Kein Inhalt"
      }
      image={postProps.image}
      className={styles.projectPostPreviewComponent}
      baseStyles={styles}
      stylesheet={optStylesheet}
    >
      <div>
        {postProps.school != undefined ? (
          <p>Projekt von {postProps.school}</p>
        ) : null}
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
