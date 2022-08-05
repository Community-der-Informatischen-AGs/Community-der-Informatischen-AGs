import cn from "classnames"
import TypeIt from "typeit-react"
import globalStyles from "./../../../styles/globals.module.scss"
import styles from "./../../../styles/home/home.module.scss"

export const PhilosophySection = () => {
  return (
    <section
      className={cn(
        styles.philosophySection,
        styles.standardPaddingSection,
        globalStyles.standardPaddingSection
      )}
    >
      <h3
        className={styles.standardSectionInvisibleHeading}
      >
        Wie arbeiten wir?
      </h3>
      <h2>
        <TypeIt
          options={{
            speed: 50,
            waitUntilVisible: true,
          }}
        >
          Unsere{" "}
          <span className={styles.importantHeading}>
            Philosophie.
          </span>
        </TypeIt>
      </h2>
    </section>
  )
}
