import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/home/home.module.css'
import globalStyles from "../styles/globals.module.css";

import { Contentful } from '../lib/contentful/api'


import TypeIt from 'typeit-react';
import { Header } from '../components/header_component/header';
import { Circle } from 'phosphor-react';
import { Carousel } from '../components/carousel_component/carousel';

// media:
import conceptSVG from "./../public/assets/svgs/home/concept.svg";


// ! https://www.npmjs.com/package/@contentful/rich-text-react-renderer for rendering rich text

const Home: NextPage = (props: any) => {

  const decorationCode = `
  
  def foo(bar, leftBar, rightBar, x):
    whileleftBar <= rightBar:

        foobar = leftBar + (rightBar - leftBar) // 2

        if arr[foobar] == x:
            return foobar

        elif arr[foobar] < x:
          leftBar = foobar + 1

        else:
          rightBar = foobar - 1

    return -1

  `;

  // TODO: add social media icons on the side of the landing-section

  return <>
    <Head>
      <title>Jugend Entwickelt Digital: Eine Gemeinschaft für junge, interessierte Softwareentwickler in diversen schulischen Arbeitsgemeischaften</title>
    </Head>
    <Header/>
    <main>
      <section className={styles.landingSection + " " + styles.standardPaddingSection}>
          
        <code lang="python" className={globalStyles.preserve + " " + globalStyles.background}>  {/* This is decoration*/}
          {decorationCode}
        </code>

        <h1 className={globalStyles.heading + " " + styles.heading}>
          <span className={styles.seeThrough}>
            Die
          </span>
          <span>
            Jugend
          </span>
          <span>
            Entwickelt
          </span>
          <span>
            Digital
            <span className={styles.seeThrough}>
            e
            </span>
          </span>
          <span className={styles.seeThrough}>
            Projekte
          </span>
        </h1>
        <section className={styles.contentSection}>
          <h3>
            <span>Eine Gemeinschaft für </span>
            <TypeIt
              options={{
                speed: 50,
                waitUntilVisible: true,
                loop: true
              }}
              getBeforeInit={(instance) => {

                const targets = [
                  "VS-Code Hocker",
                  "DBMS Nutzer",
                  "Figma Enjoyer",
                ];

                for (const target of targets) {

                  instance.type(target).pause(750).delete(target.length).pause(500);

                }

                return instance;

              }}
            />
          </h3>
          
          <section className={styles.buttonSection}> 
            <button>
              Teilnehmen
            </button>
            <button className={globalStyles.unimportantButton}>
              Mehr Infos
            </button>
          </section>

        </section>
      </section>
      <section className={styles.landingCarouselSection}>
        <Carousel
          initialSelectedIndex={0}
          uniqueClassName={styles.landingCarousel}
          rotationCycleDuration={20000}
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

      <section className={styles.conceptSection + " " + styles.standardPaddingSection}>
        <TypeIt
          options={{
            speed: 50,
            waitUntilVisible: true,
            loop: true
          }}
        >

        </TypeIt>
        <h2>
          Eine Vernetzung von Software-AGs
        </h2>
        <section className={styles.contentSubsection}>
          <Image
            src="/assets/svgs/home/concept.svg"
            width={409}
            height={415}
            alt="SVG für das Konzept"
          />
          <article>

            <p>
              Die {"'"}Jugend-Entwickelt-Digital{"'"} Gemeinschaft bietet an unterschiedlichen Schulen Software-AGs an und verbindet diese miteinander.
            </p>
            <p>
              Nehme zusammen mit deiner Schule am Programm teil!
            </p>
            
            <button>
              Anmeldung
            </button>
            <button className={globalStyles.unimportantButton}>
              Mehr über das Konzept
            </button>

          </article>
        </section>
      </section>

      <section className={styles.postSection + " " + styles.standardPaddingSection}>
        <h2>
          Spannende Projekte. Grenzenlose Kooperation.
        </h2>
        <p>
          Zusammen arbeiten und kooperieren die Arbeitsgemeinschaften an weiterbildende und interessante Software-Projekte
        </p>
        <section>
          { /* zwei carousels mit blog post teasers und project post teasers */ }
        </section>
      </section>

      <section className={styles.philosophySection + " " + styles.standardPaddingSection}>
        <h2>Weiterbildung, Verbesserung, Vernetzung.</h2>
        <h3>Alles im eigenen Tempo</h3>
        <p>
          Bei der Jugend Entwickelt Digital Gemeinschaft erlauben wir 
        </p>
        <ul>
          <li>Weiterbildung</li>
          <li>Kooperation</li>
          <li>und Verbesserung</li>
          <li>Und alles ohne Stress. Alles im eigenen Tempo.</li>
        </ul>
      </section>

      <section className={styles.contactSection + " " + styles.standardPaddingSection}>
        <h2>Teilnehmen!</h2>
        <p>Worauf wartest du?</p>
        { /* Kontaktformular */ }
      </section>

    </main>
  </>;
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
    ));

  return {
    props: {
      bruh: "bruh"
    }
  }

}
