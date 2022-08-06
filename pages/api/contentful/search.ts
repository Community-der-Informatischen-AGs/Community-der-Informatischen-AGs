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
    const entryCollectionTypeOrderToQueryLimit: {
      [key: string]: number
    } = {
      [CONTENT_TYPE_IDS.school]: 0,
      [CONTENT_TYPE_IDS.project]: 0,
      [CONTENT_TYPE_IDS.blog]: 0,
    }


    const entryCollectionTypeOrderToQueryLimitKeys =
      Object.keys(entryCollectionTypeOrderToQueryLimit)

    // gettting maximum queryable total with limit
    for (let key of entryCollectionTypeOrderToQueryLimitKeys) {
      const keyCollectionString = CONTENT_TYPE_COLLECTION_IDS(key);
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
      entryCollectionTypeOrderToQueryLimit[key] =
        resultCount
    }


    let currentResultSum = Object.values(
      entryCollectionTypeOrderToQueryLimit
    ).reduce((a, b) => a + b)
    let keyIndex = 0
    while (currentResultSum > 5) {
      let key =
        entryCollectionTypeOrderToQueryLimitKeys[keyIndex]

      if (entryCollectionTypeOrderToQueryLimit[key] > 1) {
        entryCollectionTypeOrderToQueryLimit[key] =
          entryCollectionTypeOrderToQueryLimit[key] - 1
      }
      keyIndex++
    }

    // now we have the exact amount of items we should query for each content type

    let response = []

    for (let key of entryCollectionTypeOrderToQueryLimitKeys) {
      const limit =
        entryCollectionTypeOrderToQueryLimit[key]

      if (limit <= 0) {
        continue
      }

      const queryResult =
        await Contentful.getAllOfEntryCollection(
          key + "Collection",
          entryCollectionTypeOrderToQueryLimit[key],
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

        console.log(queryResult);

      response.push({
        entryType: key,
        ...queryResult.data[CONTENT_TYPE_COLLECTION_IDS(key)].items
      })
    }

    res.status(200).json(response)
  } catch (e) {
    res.status(400).json({ error: "something went wrong." })
  }
}
