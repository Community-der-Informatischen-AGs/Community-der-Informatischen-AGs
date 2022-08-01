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

import styles from "./../../styles/projekte/projekte.module.scss"

const POST_TYPE = CONTENT_TYPES.project
const POST_TYPE_ID = CONTENT_TYPE_IDS.project

interface ProjectPageProps {
  title: string
  optionalTitleMediaCollection: {
    items: ImageData[]
  }
  body: any
  assignedSchool: {
    title: string
    sys: {
      id: string
    }
  }
  finished: boolean
  sys: {
    publishedAt: string
  }
}

const ProjectPage: NextPage<ProjectPageProps> = (
  p: ProjectPageProps
) => {
  const updatedAt = new Date(p.sys.publishedAt)

  return (
    <PostPageTemplateComponent
      postType={POST_TYPE}
      title={p.title}
      metaDescription={`Ein Projekt-Eintrag der ${KEYWORDS.nameAbbreviation} über das Projekt ${p.title}`}
      image={p.optionalTitleMediaCollection.items[0]}
      additionalInformation={
        <Summary
          title="Auf einem Blick:"
          summaryPoints={[
            <div className={styles.status}>
              {" "}
              {p.finished ? "Beendet" : "In Bearbeitung"}
              <Circle
                color={p.finished ? "green" : "orange"}
                weight="fill"
                size={15}
              />
            </div>,
            <>
              Arbeitsgruppe:{" "}
              {p.assignedSchool != null ? (
                <Link
                  href={
                    LINKS.schulen +
                    "/" +
                    p.assignedSchool.sys.id
                  }
                >
                  {p.assignedSchool.title}
                </Link>
              ) : (
                "gesamte Gemeinschaft"
              )}
            </>,
            <>
              <p>
                Zuletzt Aktualisiert:{" "}
                {updatedAt.toLocaleDateString()}
              </p>
            </>,
          ]}
        />
      }
    >
      <PostPageTemplateComponent.section>
        {documentToReactComponents(p.body.json)}
      </PostPageTemplateComponent.section>
    </PostPageTemplateComponent>
  )
}

export async function getServerSideProps(context: any) {
  const { projectId } = context.params

  const response = await Contentful.getSingleEntry(
    POST_TYPE_ID,
    projectId,
    `
    title
    optionalTitleMediaCollection {
      items ${CONTENTFUL_IMAGE_QUERY}
    }
    body {
      json
    }
    assignedSchool {
      title
      sys {
        id
      }
    }
    finished  
    sys {
      publishedAt
	  } 
    `
  )

  return {
    props: {
      ...response.data.projectPost,
    },
  }
}

export default ProjectPage
