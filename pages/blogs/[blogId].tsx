import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import { NextPage } from "next"
import Link from "next/link"
import { Circle } from "phosphor-react"
import { PostPageTemplateComponent } from "../../components"
import { Summary } from "../../components/summary_component"
import { Contentful } from "../../lib/contentful/api"
import {
  CONTENTFUL_IMAGE_QUERY,
  CONTENT_TYPE_IDS,
} from "../../lib/contentful/constants"
import {
  CONTENT_TYPES,
  KEYWORDS,
  LINKS,
} from "../../lib/utils/constants"
import { ImageData } from "../../lib/utils/types"

import styles from "./../../styles/blogs/blogs.module.scss"

const POST_TYPE = CONTENT_TYPES.blog
const POST_TYPE_ID = CONTENT_TYPE_IDS.blog

interface BlogPageProps {
  title: string
  author: string
  sys: {
    publishedAt: string
    firstPublishedAt: string
  }
  optionalTitleMediaCollection: {
    items: ImageData[]
  }
  optionalDownloadsCollection: {
    items: {
      url: string
      fileName: string
    }[]
  }
  body: {
    json: any
  }
}

const BlogPage: NextPage<BlogPageProps> = (
  p: BlogPageProps
) => {
  const firstPublishedAt = new Date(p.sys.firstPublishedAt)
  const updatedAt = new Date(p.sys.publishedAt)
  const downloads = p.optionalDownloadsCollection.items

  return (
    <PostPageTemplateComponent
      postType={POST_TYPE}
      title={p.title}
      metaDescription={`Ein Blog-Eintrag der ${KEYWORDS.nameAbbreviation} über ${p.title}`}
      image={p.optionalTitleMediaCollection.items[0]}
      additionalInformation={
        <Summary
          title="Auf einem Blick:"
          summaryPoints={[
            <p>Autor: {p.author}</p>,
            <p>
              Veröffentlicht:{" "}
              {firstPublishedAt.toLocaleDateString()}
            </p>,
            <p>
              Aktualisiert: {updatedAt.toLocaleDateString()}
            </p>,
          ]}
        />
      }
    >
      <PostPageTemplateComponent.section>
        {documentToReactComponents(p.body.json)}
      </PostPageTemplateComponent.section>
      {downloads.length != 0 ? (
        <PostPageTemplateComponent.section
          className={styles.downloadsSection}
        >
          <h2>Downloads</h2>
          <section className={styles.downloads}>
            {downloads.map((download) => {
              return (
                <button
                  onClick={() =>
                    (window.location.href = download.url)
                  }
                >
                  {download.fileName}
                </button>
              )
            })}
          </section>
        </PostPageTemplateComponent.section>
      ) : null}
    </PostPageTemplateComponent>
  )
}

export async function getServerSideProps(context: any) {
  const { blogId } = context.params

  const response = await Contentful.getSingleEntry(
    POST_TYPE_ID,
    blogId,
    `
    title
    author
    sys {
      publishedAt
      firstPublishedAt
    }
    optionalTitleMediaCollection {
      items ${CONTENTFUL_IMAGE_QUERY}
    }
    body {
      json
    }
    optionalDownloadsCollection {
      items {
        url
        fileName
      }
    }
    `
  )

  return {
    props: {
      ...response.data.blogPost,
    },
  }
}

export default BlogPage
