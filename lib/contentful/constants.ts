import { LINKS } from "../utils/constants";

export const PROJECT_CONTENT_TYPE_ID = "projectPost";
export const BLOG_CONTENT_TYPE_ID = "blogPost";
export const SCHOOL_CONTENT_TYPE_ID = "schoolEntry";

export const CONTENT_TYPE_ID_TO_ROUTE: {
  [key: string]: string
} = {
  [PROJECT_CONTENT_TYPE_ID]: LINKS.projekte,
  [BLOG_CONTENT_TYPE_ID]: LINKS.blogs,
  [SCHOOL_CONTENT_TYPE_ID]: LINKS.schulen
}

