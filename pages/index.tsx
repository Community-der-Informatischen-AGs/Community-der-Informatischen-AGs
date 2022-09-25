import { useEffect } from "react"

import AOS from "aos"
import "aos/dist/aos.css"
import type { NextPage } from "next"
import Head from "next/head"
import globalStyles from "../styles/globals.module.scss"
import styles from "../styles/home/home.module.scss"

import cn from "classnames"
import TypeIt from "typeit-react"

import { LinkSimple } from "phosphor-react"
import {
  ButtonComponent,
  Footer,
  Header,
  LinkButton,
} from "../components"
import { Contentful } from "../lib/contentful/api"
import {
  COLLECTION_TYPE_IDS,
  CONTENTFUL_ID_QUERY,
} from "../lib/contentful/constants"
import {
  ConceptSection,
  ContactSection,
  OfferSection,
  PostSection,
} from "../lib/pages/home"
import { KEYWORDS, LINKS } from "../lib/utils/constants"

// TODO: add social media icons on the side of the landing-section
// TODO: Fotos von unterschiedlichen Schulen mit Adrian oder selber machne
// TODO: add code snippets

// ! https://www.npmjs.com/package/@contentful/rich-text-react-renderer for rendering rich text

const LandingSection = () => {
  const landingCode = `
  
  def foo(bar, leftBar, rightBar, x):
    while leftBar <= rightBar:

        foobar = leftBar + (rightBar - leftBar) // 2

        if array[foobar] == x:
            return foobar

        elif array[foobar] < x:
          leftBar = foobar + 1

        else:
          rightBar = foobar - 1

    return "could not be found"

  `

  return (
    <section
      className={cn(
        globalStyles.standardPaddingSection,
        styles.landingSection,
        globalStyles.headingSection
      )}
    >
      <code
        lang="python"
        className={cn(
          styles.decorationCode,
          globalStyles.preserve,
          globalStyles.background,
          globalStyles.decorationCode
        )}
      >
        {" "}
        {/* This is decoration*/}
        {landingCode}
      </code>

      <h1
        className={cn(globalStyles.heading, styles.heading)}
      >
        <span className={styles.seeThrough}>Die</span>
        <span>Community d.</span>
        <span>Informatischen AGs</span>
        <span className={styles.seeThrough}>
          Entwickelt
        </span>
      </h1>
      <section className={styles.contentSection}>
        <h3>
          <span
            style={{
              opacity: 0.75,
            }}
          >
            Eine Gemeinschaft für{" "}
          </span>
          <TypeIt
            options={{
              speed: 50,
              waitUntilVisible: true,
              loop: true,
            }}
            getBeforeInit={(instance: any) => {
              const targets = [
                "<span style='color: #82AADF'>&ltVSCoder/&gt</span>",
                "<span style='color: #BC6778'>&ltDBMSNutzer/&gt</span>",
                "<span style='color: #C792EA'>&ltDoksLeser/&gt</span>",
              ]

              for (const target of targets) {
                instance
                  .type(target)
                  .pause(750)
                  .delete(target.length)
                  .pause(500)
              }

              return instance
            }}
          />
        </h3>

        <section className={styles.buttonSection}>
          <LinkButton link={LINKS.mitmachen} weight="high">
            Teilnehmen
          </LinkButton>
          <LinkButton link={LINKS.about} weight="low">
            Mehr Infos
          </LinkButton>
        </section>
      </section>
    </section>
  )
}

interface HomeProps {
  schoolIds: string[]
  blogIds: string[]
  projectIds: string[]
}

const Home: NextPage<HomeProps> = (p: HomeProps) => {
  useEffect(() => {
    AOS.init({
      anchorPlacement: "top-bottom",
    })
  }, [])

  return (
    <>
      <Head>
        <title>
          {KEYWORDS.nameSeparate} - Eine Gemeinschaft für
          junge Softwareentwickler
        </title>
        <meta
          name="description"
          content={`Die Webseite des ${KEYWORDS.nameConnected}-Projekts: Eine Gemeinschaft für junge Softwareentwickler zwischen 15 und 20 Jahren.`}
        />
      </Head>
      <Header />
      <main>
        <LandingSection />

        <ConceptSection schoolIds={p.schoolIds} />
        <OfferSection />
        <PostSection
          blogIds={p.blogIds}
          projectIds={p.projectIds}
        />
        <ContactSection />
      </main>
      <Footer />
    </>
  )
}

export async function getStaticProps() {
  const query = `
  ${COLLECTION_TYPE_IDS.school} {
    items {${CONTENTFUL_ID_QUERY}}
  }
  ${COLLECTION_TYPE_IDS.blog}(limit: 3) {
    items{${CONTENTFUL_ID_QUERY}}
  }
  ${COLLECTION_TYPE_IDS.project}(limit: 3) {
    items {${CONTENTFUL_ID_QUERY}}
  }
`
  console.log(query)

  const response = await Contentful.fetchGraphQL(query)

  console.log(response)

  return {
    props: {
      schoolIds: Contentful.getIdsFromQueryData(
        response,
        COLLECTION_TYPE_IDS.school
      ),
      blogIds: Contentful.getIdsFromQueryData(
        response,
        COLLECTION_TYPE_IDS.blog
      ),
      projectIds: Contentful.getIdsFromQueryData(
        response,
        COLLECTION_TYPE_IDS.project
      ),
    },
  }
}

export default Home
