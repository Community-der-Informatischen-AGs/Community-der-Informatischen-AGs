import styles from "./header_component.module.scss"
import { useRouter } from "next/router"
import { MutableRefObject, useEffect, useRef } from "react"
import { Navigation, Select, Search } from ".."

function useWindowScrollEvent(
  headerRef: MutableRefObject<HTMLElement>
) {
  useEffect(() => {
    function windowScrollEvent() {
      try {
        if (window.scrollY != 0) {
          const element = headerRef.current
          element.classList.add(styles.headerActive)
        }
        if (window.scrollY == 0) {
          const element = headerRef.current
          element.classList.remove(styles.headerActive)
        }
      } catch (e) {
        console.log("scrolling error -> " + e)
      }
    }

    window.addEventListener("scroll", windowScrollEvent)

    return () => {
      window.removeEventListener(
        "scroll",
        windowScrollEvent
      )
    }
  }, [headerRef])
}

export const Header = () => {
  const router = useRouter()

  const headerRef = useRef<HTMLElement>(null!)

  useWindowScrollEvent(headerRef)

  return (
    <header ref={headerRef} className={styles.header}>
      <i
        className={styles.logo}
        onClick={() =>
          router.push("/", undefined, { shallow: true })
        }
      ></i>

      <section className={styles.content}>
        <Navigation />
        <Search />
      </section>
    </header>
  )

  /*
  TODO: maybe implement localization
          <Select
          options={[
            {
              key: "DE",
              value: "de",
            },
            {
              key: "EN",
              value: "en-US",
            },
          ]}
          initialSelectedIndex={0}
          onSelect={(selectedValue: string) => {
            // TODO: change localization and implement localization
            console.log(selectedValue)
          }}
        />
  */
}
