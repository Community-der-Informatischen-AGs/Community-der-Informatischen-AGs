import "aos/dist/aos.css"
import cn from "classnames"
import TypeIt from "typeit-react"
import {
  Carousel,
  SchoolPreviewComponent,
} from "../../../components"
import { KEYWORDS } from "../../utils/constants"
import globalStyles from "./../../../styles/globals.module.scss"
import styles from "./../../../styles/home/home.module.scss"
import { useEntryIds } from "./util"

export const ConceptSection = () => {
  const schoolIds = useEntryIds(
    `
    schoolEntryCollection(limit: 3) {
      items {
        sys {	
          id
        } 
      }
    }`,
    "schoolEntryCollection"
  )

  return (
    <section
      className={cn(
        styles.conceptSection,
        styles.standardSection,
        globalStyles.standardPaddingSection
      )}
    >
      <h3
        className={styles.standardSectionInvisibleHeading}
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
          heightInPixels={650}
          width={100}
          unit="%"
        >
          {schoolIds.map((entryId) => {
            return (
              <SchoolPreviewComponent
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