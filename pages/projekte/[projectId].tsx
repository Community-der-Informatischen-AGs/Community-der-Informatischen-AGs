import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import { NextPage } from "next"
import Link from "next/link"
import { Circle } from "phosphor-react"
import { PostPageTemplateComponent } from "../../components"
import { Summary } from "../../components/summary_component"
import { Contentful } from "../../lib/contentful/api"
import {
  COLLECTION_TYPE_IDS,
  CONTENTFUL_ID_QUERY,
  CONTENTFUL_IMAGE_QUERY,
  CONTENT_TYPE_IDS,
} from "../../lib/contentful/constants"
import { getStaticPathsOfPostType } from "../../lib/contentful/util"
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
      codeSnippet={`
        Future<void> invincibilityFrames() async {
          Future.delayed(const Duration(seconds: 1), () {
            _currentlyInvincible = false;
          });
        }
      
        void useExcalibur() {
          _canUseExcalibur = false;
          Future.delayed(const Duration(seconds: Excalibur.useDelayInSeconds)).then((value) => _canUseExcalibur = true);
        }
      
        @override
        void processHit(int dHealth) {
      
          if (!_currentlyInvincible) {
            _currentlyInvincible = true;
            invincibilityFrames();
            updateHealth(-dHealth);
          }
      
        }
      `}
      postType={POST_TYPE}
      title={p.title}
      metaDescription={`Ein Projekt-Eintrag der ${KEYWORDS.nameAbbreviation} über das Projekt ${p.title}`}
      image={p.optionalTitleMediaCollection.items[0]}
      additionalInformation={
        <Summary
          title="Auf einem Blick:"
          summaryPoints={[
            <div key={1} className={styles.status}>
              {" "}
              {p.finished ? "Beendet" : "In Bearbeitung"}
              <Circle
                color={p.finished ? "green" : "orange"}
                weight="fill"
                size={15}
              />
            </div>,
            <div key={2}>
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
            </div>,
            <p key={3}>
              Zuletzt Aktualisiert:{" "}
              {updatedAt.toLocaleDateString()}
            </p>,
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

export async function getStaticPaths() {
  return await getStaticPathsOfPostType(
    COLLECTION_TYPE_IDS.project,
    "projectId"
  )
}

export async function getStaticProps(context: any) {
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
      ${CONTENTFUL_ID_QUERY}
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
