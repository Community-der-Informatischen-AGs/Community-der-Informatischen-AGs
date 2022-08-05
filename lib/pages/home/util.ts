import { useCallback, useEffect, useState } from "react"
import { Contentful } from "../../contentful/api"

export const useEntryIds = (
  query: string,
  entryCollection: string
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
  }, [query, entryCollection])

  const [entryIds, setEntryIds] = useState([])

  useEffect(() => {
    getEntryIds()
  }, [getEntryIds])

  return entryIds
}