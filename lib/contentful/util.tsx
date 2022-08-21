import {
  DependencyList,
  useCallback,
  useEffect,
  useState,
} from "react"
import {
  BlogPostPreviewComponent,
  ProjectPostPreviewComponent,
  SchoolPreviewComponent,
} from "../../components"
import { SCSSStyleSheet } from "../utils/types"
import { Contentful } from "./api"
import {
  COLLECTION_TYPE_IDS,
  CONTENT_TYPE_IDS,
} from "./constants"

export const useEntryIds = (
  query: string,
  entryCollection: string,
  deps?: DependencyList
) => {
  const getEntryIds = useCallback(async () => {
    const queryResponse = await fetch(
      "/api/contentful/query",
      {
        method: "POST",
        body: JSON.stringify({
          query: query,
        }),
      }
    )

    const jsonQueryResponse = await queryResponse.json()

    setEntryIds(
      Contentful.getIdsFromQueryData(
        jsonQueryResponse,
        entryCollection
      )
    )
  }, [query, entryCollection, ...(deps as Array<any>)])

  const [entryIds, setEntryIds] = useState<string[]>([])

  useEffect(() => {
    getEntryIds()
  }, [getEntryIds, ...(deps as Array<any>), query])

  return entryIds
}

export const getPreviewPost = (
  postStyles: SCSSStyleSheet,
  contentTypeId: string,
  id: string,
  key: any
) => {
  switch (contentTypeId) {
    case CONTENT_TYPE_IDS.project:
    case COLLECTION_TYPE_IDS.project:
      return (
        <ProjectPostPreviewComponent
          entryId={id}
          key={key}
          optStyles={postStyles}
        />
      )
    case CONTENT_TYPE_IDS.blog:
    case COLLECTION_TYPE_IDS.blog:
      return (
        <BlogPostPreviewComponent
          entryId={id}
          key={key}
          optStyles={postStyles}
        />
      )
    case CONTENT_TYPE_IDS.school:
    case COLLECTION_TYPE_IDS.school:
      return (
        <SchoolPreviewComponent
          entryId={id}
          key={key}
          optStyles={postStyles}
        />
      )
    default:
      console.log("error, invalid content type id")
      return <div></div>
  }
}
