import Head from "next/head"
import { ReactNode } from "react"
import { KEYWORDS } from "../../lib/utils/constants"
import { Header } from "../header_component"

interface StandardPageProps {
  heading: string
  title: string
  metaDescription: string
  image: string
  children?: ReactNode | ReactNode[]
}

export const StandardPage = (p: StandardPageProps) => {
  return (
    <>
      <Head>
        <title>
          {KEYWORDS.name} - {p.title}
        </title>
        <meta
          name="description"
          content={p.metaDescription}
        />
      </Head>
      <Header />
      <main></main>
      <Footer />
    </>
  )
}
