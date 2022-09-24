import "aos/dist/aos.css"
import cn from "classnames"
import TypeIt from "typeit-react"
import { KEYWORDS } from "../../../utils/constants"
import {
  Carousel,
  SchoolPreviewComponent,
} from "./../../../../components"

import globalStyles from "./../../../../styles/globals.module.scss"
import homeStyles from "./../../../../styles/home/home.module.scss"
import postPreviewStyles from "./../../../../styles/home/post_preview_component.module.scss"
import styles from "./concept_section.module.scss"

export const ConceptSection = (p: {
  schoolIds: string[]
}) => {
  console.log("bruh")

  return (
    <section
      className={cn(
        styles.conceptSection,
        homeStyles.standardSection,
        globalStyles.standardPaddingSection
      )}
    >
      <h3
        className={
          homeStyles.standardSectionInvisibleHeading
        }
      >
        Was sind wir?
      </h3>
      {/* !improve picture by adding images of schools to it */}
      <section className={styles.conceptCarouselSection}>
        <h4>Mitglieder-AGs</h4>
        <Carousel
          initialSelectedIndex={0}
          uniqueClassName={styles.conceptImageCarousel}
          rotationCycleDuration={5000}
          heightInPixels={500}
          width={100}
          unit="%"
        >
          {p.schoolIds.map((entryId) => {
            return (
              <SchoolPreviewComponent
                optStyles={postPreviewStyles}
                key={entryId}
                entryId={entryId}
              />
            )
          })}
        </Carousel>
      </section>
      <section className={styles.textSection}>
        <h2>
          <TypeIt
            options={{
              speed: 50,
              waitUntilVisible: true,
            }}
          >
            Eine Vernetzung von{" "}
            <span className={styles.importantHeading}>
              Software AGs.
            </span>
          </TypeIt>
        </h2>
        <article>
          <p>
            Die {KEYWORDS.nameSeparate} ist eine Verbindung
            von mehreren Schul-AGs, die sich auf
            Software-Entwicklung und Informatik fokussieren.
          </p>
          <p>
            Wir bieten an unterschiedlichen Schulen AGs an
            und nehmen auch ähnliche AGs auf.
          </p>
        </article>

        <section className={styles.buttonSection}>
          <button>Anmeldung</button>
          <button
            className={globalStyles.unimportantButton}
          >
            Mehr über das Konzept
          </button>
        </section>
      </section>
    </section>
  )
}
