import {
  DependencyList,
  ReactNode,
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
  CONTENTFUL_ID_QUERY,
  CONTENT_TYPE_IDS,
} from "./constants"

export const useEntryIds = (
  query: string,
  entryCollection: string,
  deps?: DependencyList
) => {
  const depsAsArray = deps as Array<any>

  const getEntryIds = useCallback(
    async () => {
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
    },
    depsAsArray == undefined
      ? [query, entryCollection]
      : [query, entryCollection, ...depsAsArray]
  )

  const [entryIds, setEntryIds] = useState<string[]>([])

  useEffect(
    () => {
      getEntryIds()
    },
    depsAsArray == undefined
      ? [getEntryIds, query]
      : [getEntryIds, query, ...depsAsArray]
  )

  return entryIds
}

export const getStaticPathsOfPostType = async (
  collectionType: string,
  slug: string
) => {
  const response =
    await Contentful.fetchGraphQL(`${collectionType} {
    items {${CONTENTFUL_ID_QUERY}}
  }`)

  const paths = Contentful.getIdsFromQueryData(
    response,
    collectionType
  ).map((id) => {
    return { params: { [slug]: id } }
  })

  return {
    paths,
    fallback: false,
  }
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
          stylesheet={postStyles}
        />
      )
    case CONTENT_TYPE_IDS.blog:
    case COLLECTION_TYPE_IDS.blog:
      return (
        <BlogPostPreviewComponent
          entryId={id}
          key={key}
          stylesheet={postStyles}
        />
      )
    case CONTENT_TYPE_IDS.school:
    case COLLECTION_TYPE_IDS.school:
      return (
        <SchoolPreviewComponent
          entryId={id}
          key={key}
          stylesheet={postStyles}
        />
      )
    default:
      console.log("error, invalid content type id")
      return <div></div>
  }
}

// at most 70 words for the preview content
const maxSummarySize = 50
export const summarizeContent = (content: ReactNode) => {
  let contentAsString = content?.toString() ?? ""
  contentAsString = contentAsString.replace(/,/g, "")

  return contentAsString
    .split(/\s/, maxSummarySize)
    .join(" ")
}
