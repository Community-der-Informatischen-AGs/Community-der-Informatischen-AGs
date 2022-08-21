import styles from "./collection_navigation_component.module.scss"
import { Dispatch, SetStateAction } from "react"

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
      <button
        disabled={currentSkipAmount < p.total}
        onClick={() => {
          if (currentSkipAmount >= p.total)
            setCurrentSkipAmount(
              currentSkipAmount - p.total
            )
        }}
      >
        {"<"}
      </button>
      <button
        disabled={p.currentDataLength == 0}
        onClick={() => {
          setCurrentSkipAmount(currentSkipAmount + p.total)
        }}
      >
        {">"}
      </button>
    </section>
  )
}
