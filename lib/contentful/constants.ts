import { LINKS } from "../utils/constants";

export const CONTENT_TYPE_IDS = {
  project: "projectPost",
  blog: "blogPost",
  school: "schoolEntry"
}

export const CONTENT_TYPE_ID_TO_ROUTE: {
  [key: string]: string
} = {
  [CONTENT_TYPE_IDS.project]: LINKS.projekte,
  [CONTENT_TYPE_IDS.blog]: LINKS.blogs,
  [CONTENT_TYPE_IDS.school]: LINKS.schulen
}

export const CONTENTFUL_IMAGE_QUERY = `{
  title
  width
  height
  url
}
` 