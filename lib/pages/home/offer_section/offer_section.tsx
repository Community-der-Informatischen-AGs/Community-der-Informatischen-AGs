import cn from "classnames"
import TypeIt from "typeit-react"
import { CardComponent } from "../../../../components"
import { KEYWORDS, LINKS } from "../../../utils/constants"

import globalStyles from "./../../../../styles/globals.module.scss"
import homeStyles from "./../../../../styles/home/home.module.scss"
import styles from "./offer_section.module.scss"
import cardStyles from "./../../../../styles/home/card_component.module.scss"

export const OfferSection = () => {
  return (
    <section
      className={cn(
        styles.offerSection,
        homeStyles.standardSection,
        globalStyles.standardPaddingSection
      )}
    >
      <h3
        className={
          homeStyles.standardSectionInvisibleHeading
        }
      >
        Was bieten wir?
      </h3>
      <h2>
        <TypeIt
          options={{
            speed: 50,
            waitUntilVisible: true,
          }}
        >
          Eine fördernde{" "}
          <span className={homeStyles.importantHeading}>
            Umgebung.
          </span>
        </TypeIt>
      </h2>
      <article>
        <p>
          {"'"}
          {KEYWORDS.nameConnected}
          {"'"} ist eine Gemeinschaft für Jugendliche und
          bietet eine{" "}
          <b>
            Umgebung für enthusiastische digitale
            Entwickler, die Folgendes fördert
          </b>
        </p>
      </article>
      <section className={styles.cardSection}>
        <CardComponent
          styleSheet={cardStyles}
          className={styles.card}
          title="Kooperation"
          text="Arbeite mit anderen Gleichgesinnten zusammen und stärke deine Teamfähigkeiten"
          imageSource="assets/images/home/philosophy1.jpg"
          imageAlt="Kooperationsbild"
          link={`${LINKS.about}#kooperation`}
        />
        <CardComponent
          styleSheet={cardStyles}
          className={styles.card}
          title="Verbesserung"
          text="Bilde dich weiter. Zusammen in einer Gruppe kann man sich gegenseitig Tipps geben und etwas beibringen"
          imageSource="assets/images/home/philosophy2.jpg"
          imageAlt="Verbesserungsbild"
          link={`${LINKS.about}#verbesserung`}
        />
        <CardComponent
          styleSheet={cardStyles}
          className={styles.card}
          title="Vernetzung"
          text="Lerne Glechgesinnte kennen und erweitere deinen Horizont."
          imageSource="assets/images/home/philosophy3.jpg"
          imageAlt="Vernetzungsbild"
          link={`${LINKS.about}#vernetzung`}
        />
      </section>
      <article>
        <p>
          Innerhalb der Umgebung halten wir uns an
          grundlegende Prinzipien einer gelungenen
          Zusammenarbeit.
        </p>
        <p>
          Unsere Philosophie besteht auch aus 3
          Hauptaspekten:
        </p>
      </article>
      <section className={styles.cardSection}>
        <CardComponent
          styleSheet={cardStyles}
          className={styles.card}
          title="Eigentempo"
          text="Jeder lernt im eigenen Tempo. Kein Druck. Kein Stress."
          imageSource="assets/images/home/testimage1.jpg"
          imageAlt="Kooperationsbild"
          link={`${LINKS.about}#kooperation`}
        />
        <CardComponent
          styleSheet={cardStyles}
          className={styles.card}
          title="Neutralität"
          text="Unsere Gemeinschaft hält sich fern von starker Politik. Kein Drama."
          imageSource="assets/images/home/testimage2.jpg"
          imageAlt="Verbesserungsbild"
          link={`${LINKS.about}#verbesserung`}
        />
        <CardComponent
          styleSheet={cardStyles}
          className={styles.card}
          title="Respekt und Vertrauen"
          text="Engagement und Fähigkeiten der Mitglieder werden respektiert. Nur konstruktive Kritik."
          imageSource="assets/images/home/testimage3.jpg"
          imageAlt="Vernetzungsbild"
          link={`${LINKS.about}#vernetzung`}
        />
      </section>
      <section className={styles.buttonSection}>
        <button className={globalStyles.unimportantButton}>
          Mehr über das Konzept
        </button>
      </section>
    </section>
  )
}
