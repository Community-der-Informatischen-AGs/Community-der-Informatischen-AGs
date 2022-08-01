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
  CONTENTFUL_IMAGE_QUERY,
  CONTENT_TYPE_IDS,
} from "../../lib/contentful/constants"
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
      postType={POST_TYPE}
      title={p.title}
      metaDescription={`Ein Schul- / AG-Eintrag der ${KEYWORDS.nameAbbreviation} über die Schule ${p.title}`}
      image={p.picture}
      additionalInformation={
        <Summary
          title="Auf einem Blick:"
          summaryPoints={[
            <>
              <p>Ansprechpartner: </p>
              <Link href={p.contactPerson.sys.id}>
                {p.contactPerson.title}
              </Link>
            </>,
            <Optional condition={p.agWebsite != null}>
              <p>AG-Webseite: </p>
              <a href={p.agWebsite}>{p.agWebsite}</a>
            </Optional>,
            <>
              <p>Schul-Webseite: </p>
              <a href={p.schoolWebsite}>
                {p.schoolWebsite}
              </a>
            </>,
            <>
              <p>Email: </p>
              <a href={"mailto:" + p.contactEmail}>
                {p.contactEmail}
              </a>
            </>,
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

export async function getServerSideProps(context: any) {
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
        sys {
          id
        }
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
