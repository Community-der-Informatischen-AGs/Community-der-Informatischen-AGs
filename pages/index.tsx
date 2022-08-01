import { useEffect, useState } from "react"

import type { NextPage } from "next"
import AOS from "aos"
import "aos/dist/aos.css"
import Head from "next/head"
import globalStyles from "../styles/globals.module.scss"
import styles from "../styles/home/home.module.scss"

import { Contentful } from "../lib/contentful/api"

import cn from "classnames"
import TypeIt from "typeit-react"

import {
  BlogPostPreviewComponent,
  CardComponent,
  Carousel,
  ContactForm,
  Footer,
  Header,
  ProjectPostPreviewComponent,
  SchoolPreviewComponent,
} from "../components"
import { KEYWORDS, LINKS } from "../lib/utils/constants"

// TODO: add social media icons on the side of the landing-section
// TODO: Fotos von unterschiedlichen Schulen mit Adrian oder selber machne
// TODO: add code snippets

// ! https://www.npmjs.com/package/@contentful/rich-text-react-renderer for rendering rich text

const useEntryIds = (
  query: string,
  entryCollection: string
) => {
  const getEntryIds = async () => {
    const queryResponse = await fetch(
      "/api/contentful/query",
      {
        method: "POST",
        body: JSON.stringify({
          query: query,
        }),
      }
    )

    const jsonQueryResponse = await queryResponse.json()

    setEntryIds(
      Contentful.getIdsFromQueryData(
        jsonQueryResponse,
        entryCollection
      )
    )
  }

  const [entryIds, setEntryIds] = useState([])

  useEffect(() => {
    getEntryIds()
  }, [getEntryIds])

  return entryIds
}

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
        styles.landingSection
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
                "<span style='color: #82AADF'>&ltVSCodeHocker/&gt</span>",
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
          <button>Teilnehmen</button>
          <button
            className={globalStyles.unimportantButton}
          >
            Mehr Infos
          </button>
        </section>
      </section>
    </section>
  )
}

const ConceptSection = () => {
  const schoolIds = useEntryIds(
    `
    schoolEntryCollection(limit: 3) {
      items {
        sys {	
          id
        } 
      }
    }`,
    "schoolEntryCollection"
  )

  return (
    <section
      className={cn(
        styles.conceptSection,
        styles.standardSection,
        globalStyles.standardPaddingSection
      )}
    >
      <h3
        className={styles.standardSectionInvisibleHeading}
      >
        Was sind wir?
      </h3>
      <h2>
        <TypeIt
          options={{
            speed: 50,
            waitUntilVisible: true,
          }}
        >
          Eine Vernetzung von{" "}
          <span className={styles.importantHeading}>
            Software AGs.
          </span>
        </TypeIt>
      </h2>
      {/* !improve picture by adding images of schools to it */}
      <section className={styles.conceptCarouselSection}>
        <h4>Mitglieder-AGs</h4>
        <Carousel
          initialSelectedIndex={0}
          uniqueClassName={styles.conceptImageCarousel}
          rotationCycleDuration={5000}
          heightInPixels={650}
          width={100}
          unit="%"
        >
          {schoolIds.map((entryId) => {
            return (
              <SchoolPreviewComponent
                key={entryId}
                entryId={entryId}
              />
            )
          })}
        </Carousel>
      </section>
      <section className={styles.textSection}>
        <article>
          <b>
            Trete einer Gemeinschaft von Software-AGs bei
          </b>
          <p>
            Die {KEYWORDS.nameSeparate} <b>bietet</b> an
            unterschiedlichen Schulen <b>Software-AGs an</b>{" "}
            und verbindet diese miteinander
          </p>
          <br />
          <p>
            Wir helfen interessierte Programmierer dabei,
            eine eigene Software-AG zu gründen und
            fortzuführen
          </p>
          <p>
            Wir nehmen schon bestehende AGs auf und
            integrieren diese in die Community
          </p>
          <br />
          <p>
            Mit unserer Arbeitsgemeinschaften-Erfahrung und
            -Arbeit garantieren wir eine sichere
            Einarbeitung, spannende Kooperation
          </p>
        </article>

        <section className={styles.buttonSection}>
          <button>Anmeldung</button>
          <button
            className={globalStyles.unimportantButton}
          >
            Mehr über das Konzept
          </button>
        </section>
      </section>
    </section>
  )
}

const PostSection = () => {
  const projectPostIds = useEntryIds(
    `
    projectPostCollection(limit: 3) {
      items {
        sys {
          id
        }
      }
    }`,
    "projectPostCollection"
  )
  const blogPostIds = useEntryIds(
    `
    blogPostCollection(limit: 3) {
      items {
        sys {
          id
        }
      }
    }
    `,
    "blogPostCollection"
  )

  return (
    <section
      className={cn(
        styles.postSection,
        styles.standardSection,
        globalStyles.standardPaddingSection
      )}
    >
      <h3
        className={styles.standardSectionInvisibleHeading}
      >
        Was machen wir?
      </h3>
      <h2>
        <TypeIt
          options={{
            speed: 50,
            waitUntilVisible: true,
          }}
        >
          Entdecke unser{" "}
          <span className={styles.importantHeading}>
            Engagement.
          </span>
        </TypeIt>
      </h2>
      <article>
        <p>
          Die {KEYWORDS.nameSeparate} besteht aus mehreren
          Mitglieder-AGs
        </p>
        <p>
          Die AGs engagieren sich freiwillig in Sachen der
          digitalen Produkteerstellung mit Fokus auf
          Softwareentwicklung
        </p>
        <b>Sieh dir unser Engagement in den Posts an!</b>
      </article>
      <section className={styles.projectsSection}>
        <h3 className={styles.projectHeading}>
          Project Posts
        </h3>
        <Carousel
          uniqueClassName={styles.projectCarousel}
          initialSelectedIndex={0}
          rotationCycleDuration={10000}
          heightInPixels={700}
          width={100}
          unit={"%"}
        >
          {projectPostIds.map((id) => {
            return (
              <ProjectPostPreviewComponent
                key={id}
                entryId={id}
              />
            )
          })}
        </Carousel>
      </section>
      <section className={styles.blogSection}>
        <h3 className={styles.blogHeading}>Blog Posts</h3>
        <Carousel
          uniqueClassName={styles.blogCarousel}
          initialSelectedIndex={0}
          rotationCycleDuration={10000}
          heightInPixels={700}
          width={100}
          unit={"%"}
        >
          {blogPostIds.map((id) => {
            return (
              <BlogPostPreviewComponent
                key={id}
                entryId={id}
              />
            )
          })}
        </Carousel>
      </section>
    </section>
  )
}

const PhilosophySection = () => {
  return (
    <section
      className={cn(
        styles.philosophySection,
        styles.standardSection,
        globalStyles.standardPaddingSection
      )}
    >
      <h3
        className={styles.standardSectionInvisibleHeading}
      >
        Was bieten wir?
      </h3>
      <h2>
        <TypeIt
          options={{
            speed: 50,
            waitUntilVisible: true,
          }}
        >
          Eine fördernde{" "}
          <span className={styles.importantHeading}>
            Umgebung.
          </span>
        </TypeIt>
      </h2>
      <article>
        <p>
          {"'"}
          {KEYWORDS.nameConnected}
          {"'"} ist eine Gemeinschaft für Jugendliche und
          bietet eine{" "}
          <b>
            Umgebung für enthusiastische digitale Entwickler
          </b>
        </p>
        <p>
          Für Programmierer / Software-Developer /
          UX/UI-Designer haben wir eine Gemeinschaft von
          Software-AGs an diversen Schulen aufgebaut, die
          Folgendes fördert:
        </p>
      </article>
      <section className={styles.cardSection}>
        <CardComponent
          className={styles.card}
          title="Kooperation"
          text="Arbeite mit anderen Gleichgesinnten zusammen und stärke deine Teamfähigkeiten"
          imageSource="assets/images/home/philosophy1.jpg"
          imageAlt="Kooperationsbild"
          link={`${LINKS.philosophie}#kooperation`}
        />
        <CardComponent
          className={styles.card}
          title="Verbesserung"
          text="Bilde dich weiter. Zusammen in einer Gruppe kann man sich gegenseitig Tipps geben und etwas beibringen"
          imageSource="assets/images/home/philosophy2.jpg"
          imageAlt="Verbesserungsbild"
          link={`${LINKS.philosophie}#verbesserung`}
        />
        <CardComponent
          className={styles.card}
          title="Vernetzung"
          text="Lerne Glechgesinnte kennen und erweitere deinen Horizont."
          imageSource="assets/images/home/philosophy3.jpg"
          imageAlt="Vernetzungsbild"
          link={`${LINKS.philosophie}#vernetzung`}
        />
        <CardComponent
          className={styles.card}
          title="Im eigenen Tempo"
          text="Jeder lernt mit der eigenen Geschwindigkeit. Hierfür setzt sich JED aktiv ein."
          imageSource="assets/images/home/philosophy4.jpg"
          imageAlt="Tempobild"
          link={`${LINKS.philosophie}#tempo`}
        />
      </section>
      <section className={styles.buttonSection}>
        <button>Unsere Philosophie</button>
      </section>
    </section>
  )
}

const ContactSection = () => {
  return (
    <section
      className={cn(
        styles.standardSection,
        styles.contactSection,
        globalStyles.standardPaddingSection
      )}
    >
      <h3
        className={styles.standardSectionInvisibleHeading}
      >
        Anmeldung
      </h3>
      <h2>
        <TypeIt
          options={{
            speed: 50,
            waitUntilVisible: true,
          }}
        >
          Jetzt{" "}
          <span className={styles.importantHeading}>
            Teilnehmen.
          </span>
        </TypeIt>
      </h2>
      <article>
        <p>
          Werdet Teil einer vielfältigen Community von
          digitalen Entwicklern!
        </p>
        <p>
          Egal wie die Situation aussieht, wir können euch
          in unsere Community von Software-AGs einführen und
          integrieren
        </p>
      </article>
      <ContactForm />
    </section>
  )
}

const Home: NextPage = () => {
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

        <ConceptSection />
        <PhilosophySection />
        <PostSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  )
}

export default Home
