import type { NextPage } from "next"
import Head from "next/head"
import Image from "next/image"
import styles from "../styles/home/home.module.css"
import globalStyles from "../styles/globals.module.css"

import { Contentful } from "../lib/contentful/api"

import TypeIt from "typeit-react"
import { Header } from "../components/header_component/header"
import { Circle } from "phosphor-react"
import { Carousel } from "../components/carousel_component/carousel"

// media:
import conceptSVG from "./../public/assets/svgs/home/concept.svg"
import { JSXElementComponent } from "../components/jsx_element_component/jsx_element_component"

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
      className={
        styles.landingSection +
        " " +
        styles.standardPaddingSection
      }
    >
      <code
        lang="python"
        className={
          globalStyles.preserve +
          " " +
          globalStyles.background +
          " " +
          styles.decorationCode
        }
      >
        {" "}
        {/* This is decoration*/}
        {landingCode}
      </code>

      <h1
        className={
          globalStyles.heading + " " + styles.heading
        }
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

  return (
    <section
      className={
        styles.conceptSection +
        " " +
        styles.standardPaddingSection
      }
    >
      {" "}
      {/* TODO: Fotos vvon unterschiedlichen Schulen mit Adrian oder selber machne */}
      <code
        lang="javascript"
        className={
          globalStyles.preserve +
          " " +
          globalStyles.background +
          " " +
          styles.decorationCode
        }
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
        <Carousel
          initialSelectedIndex={0}
          uniqueClassName={styles.conceptImageCarousel}
          rotationCycleDuration={2500}
          heightInPixels={650}
          width={100}
          unit="%"
        >
          <img
            src="/assets/images/home/schoolimage1.jpg" //TODO: get better images
            alt="Programming-Image-1"
          />
          <img
            src="/assets/images/home/schoolimage2.jpg" //TODO: get better images
            alt="Programming-Image-2"
          />
          <img
            src="/assets/images/home/schoolimage3.jpg" //TODO: get better images
            alt="Programming-Image-3"
          />
        </Carousel>
      </section>
      <section className={styles.textSection}>
        <article>
          <p>
            Die {"'"}Jugend-Entwickelt-Digital{"'"}{" "}
            Gemeinschaft bietet an unterschiedlichen Schulen
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
  return (
    <section
      className={
        styles.postSection +
        " " +
        styles.standardPaddingSection
      }
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
          Entdecke Spannende Projekte
        </TypeIt>
      </h2>
      {/* zwei carousels mit blog post teasers und project post teasers */}
      <section className={styles.projectsSection}>
        <Carousel
          uniqueClassName={styles.projectCarousel}
          initialSelectedIndex={0}
          rotationCycleDuration={4000}
          heightInPixels={500}
          width={45}
          unit={"vw"}
        >
          <div></div>
          <div></div>
        </Carousel>
      </section>
      <section className={styles.blogSection}>
        <Carousel
          uniqueClassName={styles.blogCarousel}
          initialSelectedIndex={0}
          rotationCycleDuration={4000}
          heightInPixels={500}
          width={45}
          unit={"vw"}
        >
          <div></div>
          <div></div>
        </Carousel>
      </section>
    </section>
  )
}

const PhilosophySection = () => {
  return (
    <section
      className={
        styles.philosophySection +
        " " +
        styles.standardPaddingSection
      }
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
          }}
        >
          Weiterbildung. Verbesserung. Vernetzung.
        </TypeIt>
      </h2>
      <h3>Alles im eigenen Tempo</h3>
      <p>
        Bei der Jugend Entwickelt Digital Gemeinschaft
        erlauben wir
      </p>
      <ul>
        <li>Weiterbildung</li>
        <li>Kooperation</li>
        <li>und Verbesserung</li>
        <li>
          Und alles ohne Stress. Alles im eigenen Tempo.
        </li>
      </ul>
    </section>
  )
}

const ContactSection = () => {
  return (
    <section
      className={
        styles.contactSection +
        " " +
        styles.standardPaddingSection
      }
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
  // Code snippets for decoration purposes:

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
          <Carousel
            initialSelectedIndex={0}
            uniqueClassName={styles.landingCarousel}
            rotationCycleDuration={3000}
            heightInPixels={500}
            width={100}
            unit="vw"
          >
            <img
              src="/assets/images/home/testimage1.jpg" //TODO: get better images
              alt="Programming-Image-1"
            />
            <img
              src="/assets/images/home/testimage2.jpg" //TODO: get better images
              alt="Programming-Image-2"
            />
            <img
              src="/assets/images/home/testimage3.jpg" //TODO: get better images
              alt="Programming-Image-3"
            />
            <img
              src="/assets/images/home/testimage4.jpg" //TODO: get better images
              alt="Programming-Image-4"
            />
          </Carousel>
        </section>

        <ConceptSection />
        <PostSection />
        <PhilosophySection />
        <ContactSection />
      </main>
    </>
  )
}

export default Home

export async function getStaticProps() {
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

  return {
    props: {
      bruh: "bruh",
    },
  }
}
