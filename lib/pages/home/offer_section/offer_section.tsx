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
          Eine fördernde Umgebung.
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
          optStyles={cardStyles}
          className={styles.card}
          title="Kooperation"
          text="Arbeite mit anderen Gleichgesinnten zusammen und stärke deine Teamfähigkeiten"
          image={{
            title: "Kooperationsbild",
            width: 6336,
            height: 9504,
            url: "/assets/images/home/philosophy1.jpg",
          }}
        />
        <CardComponent
          optStyles={cardStyles}
          className={styles.card}
          title="Verbesserung"
          text="Bilde dich weiter. Zusammen in einer Gruppe kann man sich gegenseitig Tipps geben und etwas beibringen"
          image={{
            title: "Verbesserungsbild",
            width: 4608,
            height: 3072,
            url: "/assets/images/home/philosophy2.jpg",
          }}
        />
        <CardComponent
          optStyles={cardStyles}
          className={styles.card}
          title="Vernetzung"
          text="Lerne Glechgesinnte kennen und erweitere deinen Horizont."
          image={{
            title: "Vernetzungsbild",
            width: 3456,
            height: 2304,
            url: "/assets/images/home/philosophy3.jpg",
          }}
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
          optStyles={cardStyles}
          className={styles.card}
          title="Eigentempo"
          text="Jeder lernt im eigenen Tempo. Kein Druck. Kein Stress."
          image={{
            title: "Bild zum Eigentempo",
            width: 3840,
            height: 5760,
            url: "/assets/images/home/testimage1.jpg",
          }}
        />
        <CardComponent
          optStyles={cardStyles}
          className={styles.card}
          title="Neutralität"
          text="Unsere Gemeinschaft hält sich fern von starker Politik. Kein Drama."
          image={{
            title: "Neutralitätsbild",
            width: 6000,
            height: 4000,
            url: "/assets/images/home/testimage2.jpg",
          }}
        />
        <CardComponent
          optStyles={cardStyles}
          className={styles.card}
          title="Respekt und Vertrauen"
          text="Engagement und Fähigkeiten der Mitglieder werden respektiert. Nur konstruktive Kritik."
          image={{
            title: "Bild zu Respekt und Vertrauen",
            width: 3099,
            height: 5099,
            url: "/assets/images/home/testimage3.jpg",
          }}
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
