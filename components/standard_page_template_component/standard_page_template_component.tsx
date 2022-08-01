import Head from "next/head"
import Image from "next/image"
import { PropsWithChildren, ReactNode } from "react"
import { KEYWORDS } from "../../lib/utils/constants"
import { Footer } from "../footer_component/footer_component"
import { Header } from "../header_component"

import styles from "./standard_page_template_component.module.scss"
import globalStyles from "./../../styles/globals.module.scss"
import cn from "classnames"
import { ImageData } from "../../lib/utils/types"

export const StandardPageTemplate = (
  p: StandardPageTemplateProps
) => {
  return (
    <>
      <Head>
        <title>
          {KEYWORDS.nameSeparate} -{" "}
          {p.titleSentence[p.titleIndex]}
        </title>
        <meta
          name="description"
          content={p.metaDescription}
        />
      </Head>
      <Header />
      <main className={styles.main}>
        <section
          className={cn(
            styles.headingSection,
            globalStyles.headingSection
          )}
        >
          <h1 className={globalStyles.heading}>
            {p.titleSentence.map(
              (word: string, index: number) => {
                return (
                  <span
                    key={index}
                    style={{
                      opacity:
                        index == p.titleIndex ? 1 : 0.1,
                    }}
                  >
                    {word}
                  </span>
                )
              }
            )}
          </h1>
          {p.codeSnippet != null ? (
            <code
              className={cn(
                styles.code,
                globalStyles.preserve,
                globalStyles.decorationCode,
                globalStyles.background
              )}
            >
              {p.codeSnippet}
            </code>
          ) : null}
        </section>
        {p.image != null ? (
          <section className={globalStyles.imageContainer}>
            <Image
              className={styles.image}
              width={p.image.width}
              height={p.image.height}
              alt={p.image.title}
              src={p.image.url}
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
        globalStyles.standardPaddingSection,
        styles.section
      )}
    >
      {p.children}
    </section>
  )
}

StandardPageTemplate.section = StandardPageTemplateSection

interface StandardPageTemplateProps {
  heading: string
  titleSentence: string[]
  titleIndex: number
  image: ImageData
  metaDescription: string
  children?: JSX.Element | JSX.Element[]
  codeSnippet?: string
}
