import cn from "classnames"
import { NextPage } from "next"
import { ParsedUrlQuery } from "querystring"
import { useEffect, useState } from "react"
import {
  CollectionNavigation,
  SearchComponent,
  StandardPageTemplate,
} from "../components"
import {
  COLLECTION_TYPE_IDS,
  CONTENTFUL_ID_QUERY,
} from "../lib/contentful/constants"
import { KEYWORDS } from "../lib/utils/constants"

import { getPreviewPost } from "../lib/contentful/util"
import postStyles from "./../styles/collection_page/post_preview_component.module.scss"
import styles from "./../styles/search/search.module.scss"
import searchStyles from "./../styles/search/search_component.module.scss"
import { useRouter } from "next/router"

const validateQuery = (searchValue: string) => {
  return (
    searchValue != "undefined" &&
    searchValue != "" &&
    searchValue.length >= 2
  )
}

// TODO: fix bug where too many > 5 posts are showing

interface SearchResult {
  contentTypeId: string
  id: string
}

// the amount of post previews per type.
// 5 -> max. 5 project posts + 5 blog posts + 5 school entries per post
const PAGE_POST_TYPE_TOTAL = 5

const Search: NextPage = () => {
  const router = useRouter()
  let query = router.query.s as string
  if (query === undefined) query = ""

  let heading = `CDIA - Suche - ${query}`
  let titleSentence = ["Suchergebnisse für", `"${query}"`]
  let titleIndex = 1
  if (!validateQuery(query)) {
    heading = `CDIA - Suche`
    titleSentence = [KEYWORDS.nameSeparate, "Suche"]
  }

  const [resultPreviewData, setResultPreviewData] =
    useState<SearchResult[]>([])

  // tells the code how many posts to skip when querying the data
  const skipState = useState(0)

  const [currentSkipAmount, setCurrentSkipAmount] =
    skipState
  // querying data for posts
  useEffect(() => {
    const results: SearchResult[] = []

    Object.values(COLLECTION_TYPE_IDS).forEach(
      (contentTypeCollectionId: string) => {
        const response = fetch(
          "/api/contentful/collection",
          {
            method: "POST",
            body: JSON.stringify({
              collectionType: contentTypeCollectionId,
              limit: PAGE_POST_TYPE_TOTAL,
              itemQuery: `
              ${CONTENTFUL_ID_QUERY}
            `,
              filter: `
            OR: [
              { title_contains: "${query}" }
              { body_contains: "${query}" }
            ]
            `,
              skip: currentSkipAmount,
            }),
          }
        )

        response.then(async (response) => {
          const data = (await response.json()).data[
            contentTypeCollectionId
          ]
          const items = data.items

          for (const item of items) {
            results.push({
              contentTypeId:
                contentTypeCollectionId.replace(
                  "Collection",
                  ""
                ),
              id: item.sys.id,
            })
          }

          setResultPreviewData([...results])
        })
      }
    )
  }, [query, currentSkipAmount])

  return (
    <>
      <StandardPageTemplate
        heading={heading}
        titleSentence={titleSentence}
        titleIndex={titleIndex}
        metaDescription="Die Such Seite der CDIA"
        headerOnSearch={() => {
          setCurrentSkipAmount(0)
        }}
      >
        <StandardPageTemplate.section>
          <SearchComponent
            stylesheet={searchStyles}
            onSearch={() => {
              setCurrentSkipAmount(0)
            }}
          />
          <section className={cn(styles.resultsSection)}>
            <CollectionNavigation
              skipState={skipState}
              currentDataLength={resultPreviewData.length}
              total={PAGE_POST_TYPE_TOTAL}
            />
            {resultPreviewData.length == 0 ? (
              <h1 className={styles.nothing}>
                <span>nichts.</span>
                <span>¯\_(ツ)_/¯</span>
              </h1>
            ) : (
              resultPreviewData.map((result, index) => {
                return getPreviewPost(
                  postStyles,
                  result.contentTypeId,
                  result.id,
                  index
                )
              })
            )}
            <CollectionNavigation
              skipState={skipState}
              currentDataLength={resultPreviewData.length}
              total={PAGE_POST_TYPE_TOTAL}
            />
          </section>
        </StandardPageTemplate.section>
      </StandardPageTemplate>
    </>
  )
}

export default Search
