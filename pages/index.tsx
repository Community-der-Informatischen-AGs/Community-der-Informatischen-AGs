import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/home/home.module.css'
import globalStyles from "../styles/globals.module.css";

import { Contentful } from '../lib/contentful/api'


import TypeIt from 'typeit-react';
import { Header } from '../components/header_component/header';


// ! https://www.npmjs.com/package/@contentful/rich-text-react-renderer for rendering rich text

const Home: NextPage = (props) => {

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
      <title>Jugend Entwickelt Digital Projekt</title>
    </Head>
    <Header/>
    <main>
      <section className={styles.landingSection}>
          
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
      <section className={styles.imageSection}>
          <img
            src="/assets/images/home/testimage1.jpg" //TODO: get better images
            alt="Programming-Image"
          />
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
