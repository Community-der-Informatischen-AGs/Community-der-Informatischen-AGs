import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/home/home.module.css'

import { Contentful } from '../lib/contentful/api'

// ! https://www.npmjs.com/package/@contentful/rich-text-react-renderer for rendering rich text

const Home: NextPage = (props) => {

  return <>
    <h1>Jugend Entwickelt Informatik</h1>
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
