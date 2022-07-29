import Head from "next/head"
import Image from "next/image"
import { ReactNode } from "react"
import { KEYWORDS } from "../../lib/utils/constants"
import { ImageData } from "../../lib/utils/types"
import { Footer } from "../footer_component/footer_component"
import { Header } from "../header_component"

import styles from "./post_page_template_component.module.scss"

interface PostPageTemplateComponentProps {
  postType: string
  title: string
  metaDescription: string
  additionalInformation?: ReactNode
  children?: ReactNode
  image?: ImageData
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
          <h1>{p.title}</h1>
          <article>
            <b>{p.postType}</b>
            {p.additionalInformation}
          </article>
        </section>
        {p.image != null ? (
          <section>
            <Image
              width={p.image.width}
              height={p.image.height}
              src={p.image.url}
              alt={p.image.title}
              layout="fill"
            />
          </section>
        ) : null}
        <section>{p.children}</section>
      </main>
      <Footer />
    </>
  )
}
