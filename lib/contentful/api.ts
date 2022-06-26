import internal from "stream";

export namespace Contentful {

  const CONTENTFUL_GRAPH_QL_API: string = "https://graphql.contentful.com/content/v1/spaces/";
  type contentfulLocales = "de" | "en-US";


  async function fetchGraphQL(queryBody: string, preview = false) {
    return fetch(
      CONTENTFUL_GRAPH_QL_API + process.env.CONTENTFUL_SPACE_ID,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${
            preview
              ? process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN
              : process.env.CONTENTFUL_ACCESS_TOKEN
          }`,
        },
        body: JSON.stringify({ 
          query: `
            query {
              ${queryBody}
            } 
          `
        }),
      }
    ).then((response) => response.json())
  }

  /**
   * 
   * @param collection the name of the collection being queried
   * @param limit the amount of entries to be queried
   * @param filter the filter -> where: {...} -> for searching, date, etc.
   * @param itemQuery the information that should be queried for each entry
   * @param order the order of the entries. Default is "sys_firstPublishedAt_ASC"
   * @param skip skip how many entries before the first is shown? Useful for multi-page searching
   * @param locale the language: en-US / de 
   * @returns json with the query results
   */
  export async function getAllOfEntryCollection(
    collection: string, 
    limit: number, 
    itemQuery: string,
    filter: string = "",  
    order: string = "sys_firstPublishedAt_ASC",
    skip: number = 0,
    locale: contentfulLocales = "de"
  ) {


    // ! if the additional query contains a filter with searches (where: {title_contains: ".."}), then that 
    // ! search string must be at least of length 2

    return fetchGraphQL(
      `
        ${collection}(limit: ${limit}, skip: ${skip}, locale: ${locale}, where: {${filter}}, order: ${order}) { 
          total
          items {
            ${itemQuery}
          }
        }
      `
    );

  }

  /**
   * 
   * @param entryType the type of entry queried
   * @param id the id of the entry
   * @param itemQuery the information that is being queried
   * @param locale the language: en-US / de
   * @returns json with query results.
   */
  export async function getSingleEntry(
    entryType: string, 
    id: string, 
    itemQuery: string, 
    locale: contentfulLocales = "de"
  ) {

    return fetchGraphQL(
      `
        ${entryType}(id: "${id}", locale: "${locale}") { 
          ${itemQuery}
        }
      `
    );

  }

}
