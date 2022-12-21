import { useState } from "react"
import {
  COLLECTION_TYPE_IDS,
  CONTENTFUL_ID_QUERY,
} from "../../lib/contentful/constants"
import {
  getPreviewPost,
  useEntryIds,
} from "../../lib/contentful/util"
import { CollectionNavigation } from "../collection_navigation_component"
import postStyles from "./../../styles/collection_page/post_preview_component.module.scss"
import styles from "./collection_component.module.scss"

interface ContentfulCollectionProps {
  collectionId: string // a value from "COLLECTION_TYPE_IDS"
}

// the maximum amount of posts shown per page
const collectionMax = 10

// TODO: use NextJS Server Components

export const ContentfulCollection = (
  p: ContentfulCollectionProps
) => {
  const skipState = useState<number>(0)
  const [skipAmount, setSkipAmount] = skipState

  const entryIds = useEntryIds(
    `${p.collectionId}(limit: ${collectionMax}, skip: ${skipAmount}) {
      items {${CONTENTFUL_ID_QUERY}}
    }`,
    p.collectionId,
    [skipAmount]
  )

  if (
    !Object.values(COLLECTION_TYPE_IDS).includes(
      p.collectionId
    )
  ) {
    console.log("error") // this is great error logging, I know.
    return <div />
  }

  return (
    <section className={styles.contentfulCollection}>
      <CollectionNavigation
        skipState={skipState}
        currentDataLength={entryIds.length}
        collectionTotal={collectionMax}
      />
      {entryIds.length == 0 ? (
        <h1 className={styles.nothing}>
          <span>Hier gibt{"'"}s leider nichts mehr.</span>
          <span>Aber vielleicht in den Backrooms?...</span>
        </h1>
      ) : (
        entryIds.map((entryId, index) => {
          return getPreviewPost(
            postStyles,
            p.collectionId,
            entryId,
            index
          )
        })
      )}
      <CollectionNavigation
        skipState={skipState}
        currentDataLength={entryIds.length}
        collectionTotal={collectionMax}
      />
    </section>
  )
}
