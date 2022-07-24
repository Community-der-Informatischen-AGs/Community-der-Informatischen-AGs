import Head from "next/head"
import Image from "next/image"
import { PropsWithChildren, ReactNode } from "react"
import { KEYWORDS } from "../../lib/utils/constants"
import { Footer } from "../footer_component/footer_component"
import { Header } from "../header_component"
import { ImageData } from "../preview_post_component"

import styles from "./standard_page_template_component.module.scss"
import globalStyles from "./../../styles/globals.module.scss"
import cn from "classnames"

export const StandardPageTemplate = (
  p: StandardPageTemplateProps
) => {
  return (
    <>
      <Head>
        <title>
          {KEYWORDS.nameSeparate} - {p.title}
        </title>
        <meta
          name="description"
          content={p.metaDescription}
        />
      </Head>
      <Header />
      <main className={styles.main}>
        <section className={styles.headingSection}>
          <h1 className={globalStyles.heading}>
            {Array.apply(0, Array(7)).map((x, i) => {
              return <span key={i}>{p.heading}</span>
            })}
          </h1>
          {p.codeSnippet != null ? (
            <code>{p.codeSnippet}</code>
          ) : null}
        </section>

        {p.image != null ? (
          <section
            className={cn(
              styles.imageSection,
              globalStyles.standardPaddingSection
            )}
          >
            <Image
              src={p.image.imageUrl}
              alt={p.image.imageTitle}
              height={p.image.imageHeight}
              width={p.image.imageWidth}
              layout="fill"
            />
          </section>
        ) : null}

        {p.children}
      </main>
      <Footer />
    </>
  )
}

export const StandardPageTemplateSection = (
  p: PropsWithChildren
) => {
  return (
    <section
      className={cn(
        styles.section,
        globalStyles.standardPaddingSection
      )}
    >
      {p.children}
    </section>
  )
}

StandardPageTemplate.section = StandardPageTemplateSection

interface StandardPageTemplateProps {
  heading: string
  title: string
  metaDescription: string
  image?: ImageData
  children?: JSX.Element | JSX.Element[]
  codeSnippet?: string
}
