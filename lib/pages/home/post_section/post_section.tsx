import cn from "classnames"

import globalStyles from "./../../../../styles/globals.module.scss"
import homeStyles from "./../../../../styles/home/home.module.scss"
import postPreviewStyles from "./../../../../styles/home/post_preview_component.module.scss"
import styles from "./post_section.module.scss"

import TypeIt from "typeit-react"
import {
  BlogPostPreviewComponent,
  Carousel,
  ProjectPostPreviewComponent,
} from "../../../../components"
import { KEYWORDS } from "../../../utils/constants"

export const PostSection = (p: {
  blogIds: string[]
  projectIds: string[]
}) => {
  return (
    <section
      className={cn(
        styles.postSection,
        homeStyles.standardSection,
        globalStyles.standardPaddingSection
      )}
    >
      <h3
        className={
          homeStyles.standardSectionInvisibleHeading
        }
      >
        Was machen wir?
      </h3>

      <section className={styles.textSection}>
        <h2>
          <TypeIt
            options={{
              speed: 50,
              waitUntilVisible: true,
            }}
          >
            Entdecke unser{" "}
            <span className={styles.importantHeading}>
              Engagement.
            </span>
          </TypeIt>
        </h2>
        <article>
          <p>
            Die Mitglieder-AGs der {KEYWORDS.nameSeparate}{" "}
            arbeiten zusammen an Software- und Informatik
            Projekte.
          </p>
          <b>Sieh dir unser Engagement in den Posts an!</b>
        </article>
      </section>

      <section className={styles.carouselSection}>
        <section className={styles.projectsSection}>
          <h3 className={styles.projectHeading}>
            Project Posts
          </h3>
          <Carousel
            uniqueClassName={styles.projectCarousel}
            initialSelectedIndex={0}
            rotationCycleDuration={10000}
            heightInPixels={700}
            width={100}
            unit={"%"}
          >
            {p.projectIds.map((id) => {
              return (
                <ProjectPostPreviewComponent
                  stylesheet={postPreviewStyles}
                  key={id}
                  entryId={id}
                />
              )
            })}
          </Carousel>
        </section>
        <section className={styles.blogSection}>
          <h3 className={styles.blogHeading}>Blog Posts</h3>
          <Carousel
            uniqueClassName={styles.blogCarousel}
            initialSelectedIndex={0}
            rotationCycleDuration={10000}
            heightInPixels={700}
            width={100}
            unit={"%"}
          >
            {p.blogIds.map((id) => {
              return (
                <BlogPostPreviewComponent
                  stylesheet={postPreviewStyles}
                  key={id}
                  entryId={id}
                />
              )
            })}
          </Carousel>
        </section>
      </section>
    </section>
  )
}
