import type { NextApiRequest, NextApiResponse } from "next"
import { Contentful } from "./../../../lib/contentful/api"

/**
 * @param req a request with json-stringified body which should contain: entryType, entryId, entryQuery 
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
    const entryType = reqbody.entryType;
    const entryId = reqbody.entryId;
    const entryQuery = reqbody.entryQuery;
    let locale = reqbody.entryLocale;

    if (locale === undefined) {
      locale = "de"
    }

    res.status(200).json(await Contentful.getSingleEntry(
      entryType,
      entryId,
      entryQuery,
      locale
    ));
  } catch (e) {
    res.status(400).json({ "errorMessage": "something went wrong. Please try again" });
  }

}
