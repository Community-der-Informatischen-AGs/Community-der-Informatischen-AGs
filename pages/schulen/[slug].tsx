import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import { NextPage } from "next"
import { AppContext } from "next/app"
import Link from "next/link"
import { useRouter } from "next/router"
import { ReactNode } from "react"
import { Context } from "vm"
import { PostPageTemplateComponent } from "../../components"
import { Contentful } from "../../lib/contentful/api"
import { CONTENT_TYPE_IDS } from "../../lib/contentful/constants"
import {
  CONTENT_TYPES,
  KEYWORDS,
  LINKS,
} from "../../lib/utils/constants"
import { ImageData } from "../../lib/utils/types"

const POST_TYPE = CONTENT_TYPES.school
const POST_TYPE_ID = CONTENT_TYPE_IDS.school

interface SchoolPageProps {
  title: string
  picture: ImageData
  body: any
  location: any
  contactPerson: any
  contactEmail: string
  schoolWebsite: string
  agWebsite: string
}

const SchoolPage: NextPage<SchoolPageProps> = (
  p: SchoolPageProps
) => {
  return (
    <PostPageTemplateComponent
      postType={POST_TYPE}
      title={p.title}
      metaDescription={`Ein Schul- / AG-Eintrag der ${KEYWORDS.nameAbbreviation} über die Schule ${p.title}`}
      image={p.picture}
      additionalInformation={
        <>
          <h2>Auf einem Blick:</h2>
          <ul>
            <li>
              Ansprechpartner:{" "}
              <Link
                href={`${LINKS.ansprechpartner}/${p.contactPerson.sys.id}`}
              >
                {p.contactPerson.title}
              </Link>
            </li>
            <li>
              AG-Webseite:{" "}
              <a href={p.agWebsite}>{p.agWebsite}</a>
            </li>
            <li>
              Schul-Webseite:{" "}
              <a href={p.schoolWebsite}>
                {p.schoolWebsite}
              </a>
            </li>
            <li>
              Email:{" "}
              <a href={"mailto:" + p.contactEmail}>
                {p.contactEmail}
              </a>
            </li>
          </ul>
        </>
      }
    >
      {documentToReactComponents(p.body.json)}
      <div style={{ width: "100%" }}>
        <iframe
          src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2501.8241576294845!2d${p.location.lon}!3d${p.location.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xd0b8c8c2c35d7e46!2zNTHCsDEwJzAxLjMiTiA2wrA1MSc1OS42IkU!5e0!3m2!1sen!2sde!4v1659098690848!5m2!1sen!2sde`}
          width="600"
          height="450"
          style={{ border: 0 }}
          allowFullScreen={false}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </PostPageTemplateComponent>
  )
}

export async function getServerSideProps(context: any) {
  const { slug } = context.params

  const response = await Contentful.getSingleEntry(
    POST_TYPE_ID,
    slug,
    `
      title
      picture {
        title
        width
        height
        url
      }
      body {
        json
      }
      location {
        lat
        lon
      }
      contactPerson {
        title
        picture {
          title
          width
          height
          url
        }
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
