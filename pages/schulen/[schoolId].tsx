import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import { NextPage } from "next"
import Image from "next/image"
import Link from "next/link"
import {
  Optional,
  PostPageTemplateComponent,
} from "../../components"
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

import styles from "./../../styles/schulen/schulen.module.scss"

const POST_TYPE = CONTENT_TYPES.school
const POST_TYPE_ID = CONTENT_TYPE_IDS.school

interface SchoolPageProps {
  title: string
  picture: ImageData
  body: {
    json: any
  }
  address: string
  googleMapsLink: string
  googleMapsPicture: ImageData
  contactPerson: {
    title: string
    picture: ImageData
    sys: {
      id: string
    }
  }
  contactEmail: string
  schoolWebsite: string
  agWebsite: string
}

const SchoolPage: NextPage<SchoolPageProps> = (
  p: SchoolPageProps
) => {
  // TODO: change map to image and link to google maps. (primitive type of shit)

  return (
    <PostPageTemplateComponent
      codeSnippet={`
        def change(xc, yc):
          global turn
          global player_all
          if turn == "player" and not said:
              for grid in Grid_blocks:
                  if grid.state == "none" and grid.xcor() - 25 < xc < grid.xcor() + 25 and grid.ycor() - 25 < yc < grid.ycor() + 25:
                      grid.shape(os.path.expanduser("sprites/Player-Block.gif"))
                      grid.state = "player"

                      for route in zip(player_all, all_blocks):
                          if grid in route[1]:
                              route[0].append(grid)

                      player_grids.append(grid)
                      player_all = (
                          player_col1, player_col2, player_col3, player_row1, player_row2, player_row3, player_dia1,
                          player_dia2)

                      turn = "AI"
                      win_check()
        `}
      postType={POST_TYPE}
      title={p.title}
      metaDescription={`Ein Schul- / AG-Eintrag der ${KEYWORDS.nameAbbreviation} über die Schule ${p.title}`}
      image={p.picture}
      additionalInformation={
        <Summary
          title="Auf einem Blick:"
          summaryPoints={[
            <div key={1}>
              <p>
                Ansprechpartner:{" "}
                <Link href={`${LINKS.ansprechpartner}`}>
                  {p.contactPerson.title}
                </Link>
              </p>
            </div>,
            <Optional
              key={2}
              condition={p.agWebsite != null}
            >
              <p>
                AG-Webseite:{" "}
                <a href={p.agWebsite}>{p.agWebsite}</a>
              </p>
            </Optional>,
            <div key={3}>
              <p>
                Schul-Webseite:{" "}
                <a href={p.schoolWebsite}>
                  {p.schoolWebsite}
                </a>
              </p>
            </div>,
            <div key={4}>
              <p>
                Email:{" "}
                <a href={"mailto:" + p.contactEmail}>
                  {p.contactEmail}
                </a>
              </p>
            </div>,
          ]}
        />
      }
    >
      <PostPageTemplateComponent.section>
        {documentToReactComponents(p.body.json)}
      </PostPageTemplateComponent.section>
      {p.googleMapsLink != null &&
      p.address != null &&
      p.googleMapsPicture != null ? (
        <PostPageTemplateComponent.section
          className={styles.location}
        >
          <h2>Standort</h2>
          <a href={p.googleMapsLink}>{p.address}</a>
          <div
            className={styles.imageContainer}
            onClick={() => {
              window.location.href = p.googleMapsLink
            }}
          >
            <Image
              className={styles.image}
              width={p.googleMapsPicture.width}
              height={p.googleMapsPicture.height}
              alt={p.googleMapsPicture.title}
              src={p.googleMapsPicture.url}
              layout="responsive"
            />
          </div>
        </PostPageTemplateComponent.section>
      ) : null}
    </PostPageTemplateComponent>
  )
}

export async function getStaticPaths() {
  return await getStaticPathsOfPostType(
    COLLECTION_TYPE_IDS.school,
    "schoolId"
  )
}

export async function getStaticProps(context: any) {
  const { schoolId } = context.params

  const response = await Contentful.getSingleEntry(
    POST_TYPE_ID,
    schoolId,
    `
      title
      picture ${CONTENTFUL_IMAGE_QUERY}
      body {
        json
      }
      address
      googleMapsLink
      googleMapsPicture ${CONTENTFUL_IMAGE_QUERY}
      contactPerson {
        title
        ${CONTENTFUL_ID_QUERY}
      }
      contactEmail
      schoolWebsite
      agWebsite
    `
  )

  return {
    props: {
      ...response.data.schoolEntry,
    },
  }
}

export default SchoolPage
