import styles from "./collection_navigation_component.module.scss"
import { Dispatch, SetStateAction } from "react"
import { ButtonComponent } from "../button_component"

interface SearchNavigationProps {
  skipState: [number, Dispatch<SetStateAction<number>>]
  // the amount of entries currently shown on the page
  currentDataLength: number
  total: number
}
export const CollectionNavigation = (
  p: SearchNavigationProps
) => {
  const [currentSkipAmount, setCurrentSkipAmount] =
    p.skipState

  return (
    <section className={styles.navigationSection}>
      <ButtonComponent
        title="Vorherige Seite"
        weight="high"
        disabled={currentSkipAmount < p.total}
        onClick={() => {
          if (currentSkipAmount >= p.total)
            setCurrentSkipAmount(
              currentSkipAmount - p.total
            )
        }}
      >
        {"<"}
      </ButtonComponent>
      <ButtonComponent
        title="Nächste Seite"
        weight="high"
        disabled={p.currentDataLength == 0}
        onClick={() => {
          setCurrentSkipAmount(currentSkipAmount + p.total)
        }}
      >
        {">"}
      </ButtonComponent>
    </section>
  )
}
