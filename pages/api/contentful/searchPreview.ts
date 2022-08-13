import type { NextApiRequest, NextApiResponse } from "next"
import { Contentful } from "../../../lib/contentful/api"
import { CONTENT_TYPE_COLLECTION_IDS, CONTENT_TYPE_IDS } from "../../../lib/contentful/constants"


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const reqbody = JSON.parse(req.body)
    const searchOrder = "sys_firstPublishedAt_ASC" // this might be subject to change.
    const searchInputValue = reqbody["searchInput"]
    const searchLocale = reqbody["locale"]
    const searchLimit = 5
    const searchFilter = `
      OR: [
        { title_contains: "${searchInputValue}" }
        { body_contains: "${searchInputValue}" }
      ]
    `

    // the order of entry types.

    // Keys:
    // Starting from least important (least search resulst on average)
    // and ending with most important (more search results on average)

    // Values:
    // The amount of items to be queried

    // Intention:
    // get the total of all queryable entries and deduct values untill
    const entryCollectionTypeIdToQueryLimit: {
      [key: string]: number
    } = Object.fromEntries(Object.values(CONTENT_TYPE_COLLECTION_IDS).map((collectionId) => {
      return [collectionId, 0];
    }))


    const entryCollectionTypeOrderToQueryLimitKeys =
      Object.keys(entryCollectionTypeIdToQueryLimit)

    // gettting maximum queryable total with limit
    for (let key of entryCollectionTypeOrderToQueryLimitKeys) {
      const keyCollectionString = key;
      const queryResult = await Contentful.fetchGraphQL(
        `
          ${keyCollectionString}(
            locale: "${searchLocale}", 
            order: ${searchOrder},
            where: { ${searchFilter} },
            limit: ${searchLimit}
          ) {
            total
          }
        `
      )

      const resultCount = queryResult.data[keyCollectionString].total
      // setting the maximum amount of results first
      entryCollectionTypeIdToQueryLimit[key] =
        resultCount
    }

    let currentResultSum = Object.values(
      entryCollectionTypeIdToQueryLimit
    ).reduce((a, b) => a + b)
    let keyIndex = 0
    while (currentResultSum > 5) {
      let key =
        entryCollectionTypeOrderToQueryLimitKeys[keyIndex]

      if (entryCollectionTypeIdToQueryLimit[key] > 1) {
        entryCollectionTypeIdToQueryLimit[key] =
          entryCollectionTypeIdToQueryLimit[key] - 1
      }
      keyIndex++
    }

    // now we have the exact amount of items we should query for each content type

    let response = []

    for (let key of entryCollectionTypeOrderToQueryLimitKeys) {
      const limit =
        entryCollectionTypeIdToQueryLimit[key]

      if (limit <= 0) {
        continue
      }

      const queryResult =
        await Contentful.getAllOfEntryCollection(
          key,
          entryCollectionTypeIdToQueryLimit[key],
          `
          title
          sys {
            id
          }
        `,
          searchFilter,
          searchOrder,
          0,
          searchLocale
        )

      response.push({
        entryType: key,
        ...queryResult.data[key].items
      })
    }

    res.status(200).json(response)
  } catch (e) {
    res.status(400).json({ error: "something went wrong." })
  }
}
