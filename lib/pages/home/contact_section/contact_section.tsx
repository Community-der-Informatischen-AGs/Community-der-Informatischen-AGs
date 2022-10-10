import cn from "classnames"
import TypeIt from "typeit-react"
import {
  ImageComponent,
  LinkButton,
} from "../../../../components"
import { LINKS } from "../../../utils/constants"

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
      <ImageComponent
        stylesheet={styles}
        image={{
          url: "/assets/images/home/teilnahme.jpg",
          width: 5304,
          height: 7952,
          title:
            "Bild von Teilnahme und Zusammenarbeit in der Programmierung",
        }}
        layout="fill"
        objectFit="cover"
        src=""
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
          <LinkButton
            weight="high"
            link={`${LINKS.mitmachen}#${LINKS.anmeldeFormular}`}
          >
            Zur Teilnahme!
          </LinkButton>
          <LinkButton
            weight="low"
            link={LINKS.ansprechpartner}
            className={styles.lowButton}
          >
            Ansprechpartner und Kontakt
          </LinkButton>
          <LinkButton
            weight="low"
            link={LINKS.schulen}
            className={styles.lowButton}
          >
            AG-Verzeichnis
          </LinkButton>
        </section>
      </section>
    </section>
  )
}
