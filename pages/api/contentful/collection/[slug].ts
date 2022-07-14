import type { NextApiRequest, NextApiResponse } from "next"
import { Contentful } from "../../../../lib/contentful/api"

/**
 * @param req a request with json-stringified body which should contain: collectionType, limit, itemQuery, filter
 * @param res returns the queried data according to the graphql query
 * @returns noething
 */
export default async function handler(
  req: NextApiRequest, 
  res: NextApiResponse
) {

  if (req.method == "GET") res.status(500).json({ "errorMessage": "invalid api method" });

  try {

    const reqbody = JSON.parse(req.body);
    const collectionType = reqbody.collectionType;
    const limit = reqbody.limit;
    const itemQuery = reqbody.itemQuery;
    let locale = reqbody.entryLocale;
    let filter = reqbody.filter;
    let skip = reqbody.skip;
    let order = reqbody.order;

    

    if (filter === undefined) filter = "";
    if (order === undefined) order = "sys_firstPublishedAt_ASC";
    if (skip === undefined) skip = 0;
    if (locale === undefined) locale = "de";
  
    res.status(200).json(await Contentful.getAllOfEntryCollection(
      collectionType,
      limit,
      itemQuery,
      filter,
      order,
      skip,
      locale
    ));
  } catch (e) {
    res.status(400).json({"errorMessage": "something went wrong. Please try again"});
  }

}
