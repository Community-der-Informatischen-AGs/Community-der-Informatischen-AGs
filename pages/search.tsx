import cn from "classnames"
import { NextPage } from "next"
import Head from "next/head"
import { ParsedUrlQuery } from "querystring"
import {
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react"
import {
  BlogPostPreviewComponent,
  Footer,
  Header,
  ProjectPostPreviewComponent,
  SchoolPreviewComponent,
  SearchComponent,
} from "../components"
import {
  CONTENT_TYPE_COLLECTION_IDS,
  CONTENT_TYPE_IDS,
} from "../lib/contentful/constants"
import { KEYWORDS } from "../lib/utils/constants"

import globalStyles from "./../styles/globals.module.scss"
import styles from "./../styles/search/search.module.scss"
import searchStyles from "./../styles/search/search_component.module.scss"
import postStyles from "./../styles/search/post_preview_component.module.scss"

const validateQuery = (searchValue: string) => {
  return (
    searchValue != "undefined" &&
    searchValue != "" &&
    searchValue.length >= 2
  )
}

// TODO: fix preview styling

interface SearchResult {
  contentTypeId: string
  id: string
}

const previewPostFromData = (
  data: SearchResult,
  key: any
) => {
  switch (data.contentTypeId) {
    case CONTENT_TYPE_IDS.project:
      return (
        <ProjectPostPreviewComponent
          entryId={data.id}
          key={key}
          optStyles={postStyles}
        />
      )
    case CONTENT_TYPE_IDS.blog:
      return (
        <BlogPostPreviewComponent
          entryId={data.id}
          key={key}
          optStyles={postStyles}
        />
      )
    case CONTENT_TYPE_IDS.school:
      return (
        <SchoolPreviewComponent
          entryId={data.id}
          key={key}
          optStyles={postStyles}
        />
      )
    default:
      console.log("error, invalid content type id")
      return <div></div>
  }
}

// the amount of post previews per type.
// 5 -> max. 5 project posts + 5 blog posts + 5 school entries per post
const pagePostTypeTotal = 5

const Search: NextPage<ParsedUrlQuery> = (
  p: ParsedUrlQuery
) => {
  const query = p.s as string

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

    Object.values(CONTENT_TYPE_COLLECTION_IDS).forEach(
      (contentTypeCollectionId: string) => {
        const response = fetch(
          "/api/contentful/collection",
          {
            method: "POST",
            body: JSON.stringify({
              collectionType: contentTypeCollectionId,
              limit: pagePostTypeTotal,
              itemQuery: `
              sys {
                id
              }
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
      <Head>
        <title>
          {KEYWORDS.nameSeparate} - {heading}
        </title>
        <meta
          name="description"
          content="Die Such Seite der CDIA"
        />
      </Head>
      <Header
        onSearch={() => {
          setCurrentSkipAmount(0)
        }}
      />
      <main>
        <section
          className={cn(
            styles.headingSection,
            globalStyles.headingSection
          )}
        >
          <h1>
            {titleSentence.map(
              (word: string, index: number) => {
                return (
                  <span
                    key={index}
                    style={{
                      opacity:
                        index == titleIndex ? 1 : 0.1,
                    }}
                  >
                    {word}
                  </span>
                )
              }
            )}
          </h1>
          <SearchComponent
            optStyles={searchStyles}
            onSearch={() => {
              setCurrentSkipAmount(0)
            }}
          />
        </section>
        <section
          className={cn(
            globalStyles.standardPaddingSection,
            styles.resultsSection
          )}
        >
          <SearchNavigation
            skipState={skipState}
            currentDataLength={resultPreviewData.length}
          />
          {resultPreviewData.length == 0 ? (
            <h1 className={styles.nothing}>
              <span>nothing.</span>
              <span>¯\_(ツ)_/¯</span>
            </h1>
          ) : (
            resultPreviewData.map((result, index) => {
              return previewPostFromData(result, index)
            })
          )}
          <SearchNavigation
            skipState={skipState}
            currentDataLength={resultPreviewData.length}
          />
        </section>
      </main>
      <Footer />
    </>
  )
}

interface SearchNavigationProps {
  skipState: [number, Dispatch<SetStateAction<number>>]
  // the amount of entries currently shown on the page
  currentDataLength: number
}
const SearchNavigation = (p: SearchNavigationProps) => {
  const [currentSkipAmount, setCurrentSkipAmount] =
    p.skipState

  return (
    <section className={styles.navigationSection}>
      <button
        disabled={currentSkipAmount < pagePostTypeTotal}
        onClick={() => {
          if (currentSkipAmount >= pagePostTypeTotal)
            setCurrentSkipAmount(
              currentSkipAmount - pagePostTypeTotal
            )
        }}
      >
        {"<"}
      </button>
      <button
        disabled={p.currentDataLength == 0}
        onClick={() => {
          setCurrentSkipAmount(
            currentSkipAmount + pagePostTypeTotal
          )
        }}
      >
        {">"}
      </button>
    </section>
  )
}

Search.getInitialProps = async ({ query }) => {
  return { ...query }
}

export default Search
