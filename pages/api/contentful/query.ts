
// an api endpoint for all sorts of things. No constraints.

import { NextApiRequest, NextApiResponse } from "next";
import { Contentful } from "../../../lib/contentful/api";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  if (req.method == "GET") res.status(500).json({ "errorMessage": "invalid api method" });

  try {
    const reqbody = JSON.parse(req.body);
    const query = reqbody.query;

    res.status(200).json(await Contentful.fetchGraphQL(
      query
    ))
  } catch (e) {
    res.status(400).json({ "errorMessage": "something went wrong. Please try again" });
  }
}