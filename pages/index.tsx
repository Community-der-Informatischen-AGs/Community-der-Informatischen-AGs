import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/home/home.module.css'
import globalStyles from "../styles/globals.module.css";

import { Contentful } from '../lib/contentful/api'

import TypeAnimation from "react-type-animation";

// ! https://www.npmjs.com/package/@contentful/rich-text-react-renderer for rendering rich text

const Home: NextPage = (props) => {

  return <>
    <Head>
      <title>Jugend Entwickelt Informatik</title>
    </Head>
    <main>
      <section className={styles.headingSection}>
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
            Informatik
            <span className={styles.seeThrough}>
             -
            </span>
          </span>
          <span className={styles.seeThrough}>
            Projekte
          </span>
        </h1>
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
