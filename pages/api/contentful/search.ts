import type { NextApiRequest, NextApiResponse } from "next"
import { Contentful } from "../../../lib/contentful/api"

// TODO: implement search algorithm and return value here

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
      schoolEntryCollection: 0,
      contactPersonCollection: 0,
      projectPostCollection: 0,
      blogPostCollection: 0,
    }

    const entryCollectionTypeOrderToQueryLimitKeys =
      Object.keys(entryCollectionTypeOrderToQueryLimit)

    // gettting maximum queryable total with limit
    for (let key of entryCollectionTypeOrderToQueryLimitKeys) {
      const queryResult = await Contentful.fetchGraphQL(
        `
          ${key}(
            locale: "${searchLocale}", 
            order: ${searchOrder},
            where: { ${searchFilter} },
            limit: ${searchLimit}
          ) {
            total
          }
        `
      )

      const resultCount = queryResult.data[key].total
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
          key,
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

      response.push(...queryResult.data[key].items)
    }

    res.status(200).json(response)
  } catch (e) {
    res.status(400).json({ error: "something went wrong." })
  }
}
