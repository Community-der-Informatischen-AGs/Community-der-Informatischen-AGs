import cn from "classnames"
import TypeIt from "typeit-react"
import { ImageWrapper } from "../../../../components"

import globalStyles from "./../../../../styles/globals.module.scss"
import homeStyles from "./../../../../styles/home/home.module.scss"
import styles from "./contact_section.module.scss"

export const ContactSection = () => {
  return (
    <section
      className={cn(
        homeStyles.standardSection,
        styles.contactSection,
        globalStyles.standardPaddingSection
      )}
    >
      <h3
        className={
          homeStyles.standardSectionInvisibleHeading
        }
      >
        Anmeldung
      </h3>
      <ImageWrapper
        className={styles.imageWrapper}
        image={{
          url: "/assets/images/home/philosophy3.jpg",
          width: 3456,
          height: 2304,
          title: "Bild von Partizipation",
        }}
      />
      <section className={styles.contentSection}>
        <h2>
          <TypeIt
            options={{
              speed: 50,
              waitUntilVisible: true,
            }}
          >
            Jetzt{" "}
            <span className={styles.importantHeading}>
              Teilnehmen.
            </span>
          </TypeIt>
        </h2>
        <p>
          Werde Teil einer vielfältigen Gesellschaft von
          digitalen Entwicklern.
        </p>
        <section className={styles.buttonSection}>
          <button>Zur Teilnahme!</button>
          <button
            className={globalStyles.unimportantButton}
          >
            Ansprechpartner und Kontakt
          </button>
          <button
            className={globalStyles.unimportantButton}
          >
            AG-Verzeichnis
          </button>
        </section>
      </section>
    </section>
  )
}
