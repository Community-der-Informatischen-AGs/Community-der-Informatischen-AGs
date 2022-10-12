import { getServerSideSitemap } from "next-sitemap";
import { COLLECTION_TYPE_IDS, COLLECTION_TYPE_ID_TO_ROUTE, CONTENTFUL_ID_QUERY, CONTENT_TYPE_ID_TO_ROUTE } from "../../lib/contentful/constants";
import { useEntryIds } from "../../lib/contentful/util";
import { LINKS } from "../../lib/utils/constants";

import { Contentful } from "./../../lib/contentful/api";

export async function getServerSideProps(ctx: any) {

  
  const fields: {
    loc: string
    lastmod: string
  }[] = [];

  for (const collectionId of Object.values(COLLECTION_TYPE_IDS)) {
    
    console.log("===")
    console.log(collectionId)
    console.log("===")
    
    if (collectionId == COLLECTION_TYPE_IDS.person) continue

    const response = await Contentful.fetchGraphQL(`
      ${collectionId} {
        items {
          ${CONTENTFUL_ID_QUERY}
        }
      }
    `)

    const ids = Contentful.getIdsFromQueryData(response, collectionId)

    const newSitemaps = ids.map((id) => ({
      loc: `${process.env.NEXT_PUBLIC_DOMAIN_URL}${COLLECTION_TYPE_ID_TO_ROUTE[collectionId].replace("/", "")}/${id}`,
      lastmod: new Date().toISOString(),
    }));

    fields.push(...newSitemaps)
  }


  return getServerSideSitemap(ctx, fields);
};

export default function Site() {}

