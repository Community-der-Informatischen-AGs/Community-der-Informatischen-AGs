import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import { NextPage } from "next"
import { PostPageTemplateComponent } from "../../components"
import { Summary } from "../../components/summary_component"
import { Contentful } from "../../lib/contentful/api"
import {
  COLLECTION_TYPE_IDS,
  CONTENTFUL_IMAGE_QUERY,
  CONTENT_TYPE_IDS,
} from "../../lib/contentful/constants"
import { getStaticPathsOfPostType } from "../../lib/contentful/util"
import {
  CONTENT_TYPES,
  KEYWORDS,
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
      codeSnippet={`
      def TimerMove():
      global timer, elixir, progress_timer, progress_target, timer_ready, fight_choice, mode, turn, dealt_damage, hit_targets, first_atk

      # the timer tells itself when to inform the game to make a new target depending on the variable target_speed
      if fight_choice == "Hurt":
          if timer_ready:
              progress_timer += 1
          if progress_timer > target_speed and progress_target < target_amount:
              target = Entities(os.path.expanduser("sprites/Attack_Target.gif"),
                                "white", random.randint(215, 565), random.randint(-77, 375), 1)
              targets.append(target)
              progress_timer = 0
              progress_target += 1

      `}
      postType={POST_TYPE}
      title={p.title}
      metaDescription={`Ein Blog-Eintrag der ${KEYWORDS.nameAbbreviation} über ${p.title}`}
      image={p.optionalTitleMediaCollection.items[0]}
      additionalInformation={
        <Summary
          title="Auf einem Blick:"
          summaryPoints={[
            <p key={1}>Autor: {p.author}</p>,
            <p key={2}>
              Veröffentlicht:{" "}
              {firstPublishedAt.toLocaleDateString()}
            </p>,
            <p key={3}>
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
            {downloads.map((download, index) => {
              return (
                <button
                  key={index}
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

export async function getStaticPaths() {
  return await getStaticPathsOfPostType(
    COLLECTION_TYPE_IDS.blog,
    "blogId"
  )
}

export async function getStaticProps(context: any) {
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
