import Head from "next/head"
import Image from "next/image"
import { CSSProperties, ReactNode } from "react"
import { KEYWORDS } from "../../lib/utils/constants"
import { ImageData } from "../../lib/utils/types"
import { Footer } from "../footer_component/footer_component"
import { Header } from "../header_component"

import cn from "classnames"

import styles from "./post_page_template_component.module.scss"
import globalStyles from "./../../styles/globals.module.scss"

interface PostPageTemplateComponentProps {
  postType: string
  title: string
  metaDescription: string
  additionalInformation?: ReactNode
  children?: ReactNode
  image?: ImageData
  codeSnippet?: string
}

export const PostPageTemplateComponent = (
  p: PostPageTemplateComponentProps
) => {
  return (
    <>
      <Head>
        <title>
          {KEYWORDS.nameSeparate} - {p.postType} - {p.title}
        </title>
        <meta
          name="description"
          content={p.metaDescription}
        />
      </Head>
      <Header />
      <main>
        <section className={styles.headingSection}>
          <h1>
            <span>{p.title} </span>
            <span className={styles.postType}>
              <b>({p.postType})</b>
            </span>
          </h1>
          <article>{p.additionalInformation}</article>
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
        {
          // TODO: make this an image gallery with flex-snap whatever
          // TODO: make all images clickable
          p.image != null ? (
            <section
              className={globalStyles.imageContainer}
            >
              <Image
                width={p.image.width}
                height={p.image.height}
                src={p.image.url}
                alt={p.image.title}
                layout="fill"
              />
            </section>
          ) : null
        }
        <section className={cn(styles.mainContentSection)}>
          {p.children}
        </section>
      </main>
      <Footer />
    </>
  )
}

interface SectionProps {
  style?: CSSProperties
  className?: string
  children?: ReactNode
}

export const PostPageSection = (p: SectionProps) => {
  return (
    <section
      style={p.style}
      className={cn(styles.section, p.className)}
    >
      {p.children}
    </section>
  )
}

PostPageTemplateComponent.section = PostPageSection
