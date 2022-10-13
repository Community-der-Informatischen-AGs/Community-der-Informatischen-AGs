import { useRouter } from "next/router"
import { MagnifyingGlass } from "phosphor-react"
import { MutableRefObject, useEffect, useRef } from "react"
import { Navigation, SearchComponent } from ".."
import styles from "./header_component.module.scss"

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

interface HeaderProps {
  onSearch?: () => void
}

export const Header = (p: HeaderProps) => {
  const router = useRouter()

  const headerRef = useRef<HTMLElement>(null!)

  useWindowScrollEvent(headerRef)

  return (
    <header ref={headerRef} className={styles.header}>
      <i
        className={styles.logo}
        onClick={() =>
          router.push("/", "/", {
            shallow: true,
          })
        }
      ></i>

      <section className={styles.content}>
        <Navigation />
        <div className={styles.miniSearch}>
          <MagnifyingGlass
            alt="confirm search query"
            size={25}
            color="white"
          />
        </div>
        <SearchComponent onSearch={p.onSearch} />
      </section>
    </header>
  )

  /*
  *: maybe implement localization
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
            console.log(selectedValue)
          }}
        />
  */
}
