import { NextPage } from "next"
import { Envelope } from "phosphor-react"
import {
  ContactPerson,
  StandardPageTemplate,
} from "../components"
import { Contentful } from "../lib/contentful/api"
import {
  COLLECTION_TYPE_IDS,
  CONTACT_PERSON_ROLE,
  CONTENTFUL_ID_QUERY,
} from "../lib/contentful/constants"
import {
  KEYWORDS,
  LINKS,
  RESERVED,
} from "../lib/utils/constants"

import styles from "./../styles/kontakt/kontakt.module.scss"

interface ContactModule {
  title: string
  contactEmail: string
}

interface KontaktProps {
  contactEmails: ContactModule[]
  managementContactPeople: {
    sys: {
      id: string
    }
  }[]
}

const contactPair = (contactModule: ContactModule) => {
  return (
    <>
      <h6>{contactModule.title}</h6>
      <p className={styles.email}>
        <Envelope />
        <a href={`mailto:${contactModule.contactEmail}`}>
          {contactModule.contactEmail}
        </a>
      </p>
    </>
  )
}

const Kontakt: NextPage<KontaktProps> = (
  p: KontaktProps
) => {
  return (
    <StandardPageTemplate
      heading={"Ansprechpartner und Kontakt"}
      image={{
        url: "/assets/images/home/philosophy3.jpg",
        width: 3456,
        height: 2304,
        title: "image",
      }}
      titleSentence={[
        "Ansprechpartner,",
        "Kontakt",
        "und",
        "Mitglieder",
      ]}
      titleIndex={0}
      metaDescription={`Auf dieser Seite findest Du die Ansprechpartner und Kontaktinformationen der ${KEYWORDS.nameSeparate}`}
      codeSnippet={`
  
      if (formatList.length != replaceList.length) {
        console.log("%c util, l. 31: formatList length not equal to replaceList length", 
                    "color: red");
        return;
      } else {

          // replaces all ~tag~ with its contents
          for (let index=0; index<formatList.length; index++) {
              let formatString = "...";

              let replaceString = replaceList[index];

              domTemplate = domTemplate.replace(
                  new RegExp(formatString, "g"), 
                  replaceString
              );
          }

          return domTemplate;

      }
    
      `}
    >
      <StandardPageTemplate.section>
        <h2>Direkter Kontakt und Links</h2>
        <div className={styles.contactGrid}>
          <h6>Gemeinschaft:</h6>
          <p className={styles.email}>
            <Envelope />
            <a href={`mailto:${LINKS.email}`}>
              {LINKS.email}
            </a>
          </p>

          {p.contactEmails.map((contactModule) => {
            return contactPair(contactModule)
          })}
        </div>
      </StandardPageTemplate.section>
      <StandardPageTemplate.section>
        <h2>Gemeinschafts-Leiter:</h2>
        <ContactPerson
          id={RESERVED.ruizhangid}
          stylesheet={styles}
        />
      </StandardPageTemplate.section>
      <StandardPageTemplate.section>
        <h2>AG-Management</h2>
        {p.managementContactPeople.map(
          (contactPerson, index) => {
            return (
              <ContactPerson
                key={index}
                id={contactPerson.sys.id}
                stylesheet={styles}
                className={styles.contactPersonWithMargin}
              />
            )
          }
        )}
      </StandardPageTemplate.section>
    </StandardPageTemplate>
  )
}

export async function getStaticProps(context: any) {
  const response = await Contentful.fetchGraphQL(
    `
    ${COLLECTION_TYPE_IDS.school}{
      items {
        title
        contactEmail
      }
    }
    ${COLLECTION_TYPE_IDS.person}(where: {
      role: "${CONTACT_PERSON_ROLE.agManagement}"
    }) {
      items { ${CONTENTFUL_ID_QUERY} }
    }
    `
  )

  return {
    props: {
      contactEmails: [
        ...response.data[COLLECTION_TYPE_IDS.school].items,
      ],
      managementContactPeople: [
        ...response.data[COLLECTION_TYPE_IDS.person].items,
      ],
    },
  }
}

export default Kontakt
