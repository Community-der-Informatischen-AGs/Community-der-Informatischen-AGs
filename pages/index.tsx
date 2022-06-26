import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/home/home.module.css'

import { Contentful } from '../lib/contentful/api'

// ! https://www.npmjs.com/package/@contentful/rich-text-react-renderer for rendering rich text

const Home: NextPage = (props) => {

  return <>
    <h1>Jugend Entwickelt Informatik</h1>
    <h2>Jugend Entwickelt Informatik</h2>
    <h3>Jugend Entwickelt Informatik</h3>
    <h4>Jugend Entwickelt Informatik</h4>
    <h5>Jugend Entwickelt Informatik</h5>
    <h6>Jugend Entwickelt Informatik</h6>
    <p>Gemeinschaft für Digitales Entwickeln für Jugendliche</p>
  </>
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
