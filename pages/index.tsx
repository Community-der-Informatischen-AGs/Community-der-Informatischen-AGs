import type { NextPage } from "next"
import AOS from "aos"
import "aos/dist/aos.css"
import Head from "next/head"
import Image from "next/image"
import styles from "../styles/home/home.module.scss"
import globalStyles from "../styles/globals.module.scss"

import { Contentful } from "../lib/contentful/api"

import TypeIt from "typeit-react"
import cn from "classnames"

import {
  Carousel,
  Header,
  JSXElementComponent,
  PostPreviewComponent,
} from "../components"
import { BlogPostPreviewComponent } from "../components/preview_post_component/preview_blog_post_component"
import { Cursor, HandPointing } from "phosphor-react"
import { useEffect, useState } from "react"
import { SchoolPreviewComponent } from "../components/preview_post_component/preview_school_component"
import { ProjectPostPreviewComponent } from "../components/preview_post_component/preview_project_post_component/project_post_preview_component"
import { CardComponent } from "../components/card_component"
import { LINKS } from "../lib/utils/constants"

// TODO: use next images and set the width and height

// TODO: set Concept Section carousel elements to images with text on it.

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
        styles.landingSection,
        styles.standardPaddingSection
      )}
    >
      <code
        lang="python"
        className={cn(
          globalStyles.preserve,
          globalStyles.background,
          styles.decorationCode
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
        <span>Jugend</span>
        <span>Entwickelt</span>
        <span>
          Digital
          <span className={styles.seeThrough}>e</span>
        </span>
        <span className={styles.seeThrough}>Projekte</span>
      </h1>
      <section className={styles.contentSection}>
        <h3>
          <span>Eine Gemeinschaft für </span>
          <TypeIt
            options={{
              speed: 50,
              waitUntilVisible: true,
              loop: true,
            }}
            getBeforeInit={(instance) => {
              const targets = [
                "<span style='color: #82AADF'>&ltVSCodeHocker /&gt</span>",
                "<span style='color: #BC6778'>&ltDBMSNutzer /&gt</span>",
                "<span style='color: #C792EA'>&ltDoksLeser /&gt</span>",
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
  const conceptCode = `

  function breadth_first_search = (start, end) => {

    const frontier = new Queue([start]);

    while (!frontier.isEmpty()) {

      let currentNode = frontier.dequeue();

      for (let neighboringNode of currentNode.neighbors()) {
        if (neighboringNode === end) {
          return "foo";
        } else {
          frontier.enqueue(neighboringNode);
        }
      }

    }

  }

  `

  const getSchoolIds = async () => {
    const queryResponse = await fetch(
      "/api/contentful/query",
      {
        method: "POST",
        body: JSON.stringify({
          query: `
          schoolEntryCollection(limit: 3) {
            items {
              sys {	
                id
              } 
            }
          }
        `,
        }),
      }
    )

    const jsonQueryResponse = await queryResponse.json()

    setSchoolIds(
      Contentful.getIdsFromQueryData(
        jsonQueryResponse,
        "schoolEntryCollection"
      )
    )
  }

  const [schoolIds, setSchoolIds] = useState([])

  useEffect(() => {
    getSchoolIds()
  }, [null])

  return (
    <section
      className={cn(
        styles.conceptSection,
        styles.standardPaddingSection
      )}
      data-aos="fade"
    >
      {" "}
      {/* TODO: Fotos vvon unterschiedlichen Schulen mit Adrian oder selber machne */}
      <code
        lang="javascript"
        className={cn(
          globalStyles.preserve,
          globalStyles.background,
          styles.decorationCode
        )}
      >
        {" "}
        {/* This is decoration*/}
        {conceptCode}
      </code>
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
          Eine Vernetzung von
          <JSXElementComponent
            color={"yellow"}
            style={{
              display: "block",
            }}
          >
            SoftwareAGs
          </JSXElementComponent>
        </TypeIt>
      </h2>
      {/* !improve picture by adding images of schools to it */}
      <section className={styles.conceptCarouselSection}>
        <div className={styles.conceptGraphWrapper}>
          <Image
            className={styles.conceptGraph}
            src="/assets/svgs/home/concept.svg"
            width={409}
            height={415}
            alt="SVG für das Konzept"
          />
        </div>
        {/* //TODO: maybe use another component that looks better. */}
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
          <p>
            Die {"'"}Jugend-Entwickelt-Digital{"'"}{" "}
            Gemeinschaft bietet{" "}
            <u>an unterschiedlichen Schulen </u>
            Software-AGs an und verbindet diese miteinander.
          </p>
          <p>
            Untereinander arbeiten die AGs an schulinterne
            Projekte.
          </p>
          <p>
            Zusammen kooperieren die AGs und arbeiten an
            schulunabhängige Projekte.
          </p>
          <p>
            Nehme zusammen mit deiner Schule am Programm
            teil!
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
  const [projectPostIds, setProjectPostIds] = useState([])
  const [blogPostIds, setblogPostIds] = useState([])

  const extractIds = async () => {
    const queryResponse = await fetch(
      "/api/contentful/query",
      {
        method: "POST",
        body: JSON.stringify({
          query: `
          projectPostCollection(limit: 3) {
            items {
              sys {
                id
              }
            }
          }
          blogPostCollection(limit: 3) {
            items {
              sys {
                id
              }
            }
          }
        `,
        }),
      }
    )

    const jsonQueryResponse = await queryResponse.json()

    setProjectPostIds(
      Contentful.getIdsFromQueryData(
        jsonQueryResponse,
        "projectPostCollection"
      )
    )
    setblogPostIds(
      Contentful.getIdsFromQueryData(
        jsonQueryResponse,
        "blogPostCollection"
      )
    )
  }

  useEffect(() => {
    // getting the entry ids for project posts and blog posts
    extractIds()
  }, [])

  // TODO: insert code snippet
  return (
    <section
      className={cn(
        styles.postSection,
        styles.standardPaddingSection
      )}
      data-aos="fade"
    >
      <Cursor
        className={styles.decoration}
        color="white"
        size={200}
        weight="thin"
      />

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
          Entdecke Spannende
          <JSXElementComponent
            color="green"
            style={{
              display: "block",
            }}
          >
            Projekte
          </JSXElementComponent>
        </TypeIt>
      </h2>
      <p>
        Die Jugend-Entwickelt-Digital Gemeinschaft engagiert
        sich freiwillig in Sachen der digitalen
        Produkteerstellung mit Fokus auf
        Softwareentwicklung.
      </p>
      <h5>Wir reden nicht nur. Wir machen auch.</h5>
      {/* zwei carousels mit blog post teasers und project post teasers */}
      <h3>Project Posts</h3>
      <section className={styles.projectsSection}>
        <Carousel
          uniqueClassName={styles.projectCarousel}
          initialSelectedIndex={0}
          rotationCycleDuration={4000}
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
      <h3>Blog Posts</h3>
      <section className={styles.blogSection}>
        <Carousel
          uniqueClassName={styles.blogCarousel}
          initialSelectedIndex={0}
          rotationCycleDuration={4000}
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
        styles.standardPaddingSection
      )}
      data-aos="fade"
    >
      <h3
        className={styles.standardSectionInvisibleHeading}
      >
        Was fördern wir?
      </h3>
      <h2>
        <TypeIt
          options={{
            speed: 50,
            waitUntilVisible: true,
            loop: true,
          }}
          getBeforeInit={(instance) => {
            const words = [
              "Weiterbildung",
              "Verbesserung",
              "Vernetzung",
            ]
            const targets = [
              " <span style='color: #82AADF'>&ltWeiterbildung /&gt</span>",
              " <span style='color: #BC6778'>&ltVerbesserung /&gt</span>",
              " <span style='color: #C792EA'>&ltVernetzung /&gt</span>",
            ]

            for (let i = 0; i < targets.length; i++) {
              instance
                .type(targets[i])
                .pause(750)
                .delete(words[i].length + 4)
                .pause(500)
            }

            return instance
          }}
        >
          Eine Umgebung für
        </TypeIt>
      </h2>
      <p>
        Jugend-Entwickelt-Digital ist eine Gemeinschaft für
        Jugendliche und bietet eine{" "}
        <u>
          Umgebung für enthusiastische digitale Entwickler.
        </u>
      </p>
      <p>
        Für Programmierer / Software-Developer /
        UX/UI-Designer haben wir eine Gemeinschaft
        aufgebaut, die Gelegenheiten in den folgenden
        Gebieten schafft
      </p>
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
        styles.contactSection,
        styles.standadPaddingSection
      )}
    >
      <h3
        className={styles.standardSectionInvisibleHeading}
      ></h3>
      <h2>
        <TypeIt
          options={{
            speed: 50,
            waitUntilVisible: true,
          }}
        >
          Teilnehmen!
        </TypeIt>
      </h2>
      <p>Worauf wartest du?</p>
      {/* Kontaktformular */}
    </section>
  )
}

const Home: NextPage = (props: any) => {
  useEffect(() => {
    AOS.init()
  }, [])

  // TODO: add social media icons on the side of the landing-section

  return (
    <>
      <Head>
        <title>
          Jugend Entwickelt Digital: Eine Gemeinschaft für
          junge, interessierte Softwareentwickler in
          diversen schulischen Arbeitsgemeischaften
        </title>
        <meta
          name="description"
          content="Die Webseite des Jugend-Entwickelt-Digital-Projekts: Eine Gemeinschaft für junge Softwareentwickler zwischen 15 und 20 Jahren."
        />
      </Head>
      <Header />
      <main>
        <LandingSection />

        <section className={styles.landingCarouselSection}>
          <img
            src="/assets/images/home/testimage4.jpg" //TODO: get better images
            alt="Programming-Image-4"
          />
        </section>
        <div className={styles.line} />

        <ConceptSection />
        <PhilosophySection />
        <PostSection />
        <ContactSection />
      </main>
    </>
  )
}

export default Home

/// !! Be careful! Get static props only generates stuff on build time. does not do it when user rerenders the page
export async function getStaticProps() {
  /*
  console.log(
    await Contentful.getSingleEntry(
      "blogPost",
      "7b14KZa8iHJbqK8blfbjSe",
      `
        title
        sys {
          publishedAt
        }
      `
    )
  )
  */

  return {
    props: {
      bruh: "bruh",
    },
  }
}
