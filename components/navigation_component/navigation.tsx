import Link from "next/link"
import { List } from "phosphor-react"
import { useEffect, useState } from "react"
import { LINKS } from "../../lib/utils/constants"

import styles from "./navigation.module.scss"

export const Navigation = () => {
  const [menuActive, setMenuActive] = useState(false)

  useEffect(() => {
    if (menuActive) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }
  }, [menuActive])

  return (
    <nav className={styles.navigation}>
      <button
        className={styles.menuButton}
        onClick={() => setMenuActive(!menuActive)}
      >
        <List size={40} color="white" />
      </button>
      <ul
        style={{
          top: menuActive ? "0" : "-100vh",
        }}
      >
        <li>
          <Link href={"#"}>Mitmachen</Link>
          <ul className={styles.subLinks}>
            <li>
              <Link href={LINKS.anmeldung}>Anmeldung</Link>
            </li>
            <li>
              <Link href={LINKS.informationen}>
                Informationen
              </Link>
            </li>
            <li>
              <Link href={LINKS.kooperation}>
                Kooperation
              </Link>
            </li>
          </ul>
        </li>{" "}
        {/* Contact form for applications */}
        <li>
          <Link href={"#"}>Über Uns</Link>
          <ul className={styles.subLinks}>
            <li>
              <Link href={LINKS.generelleInformationen}>
                Generelles
              </Link>
            </li>
            <li>
              <Link href={LINKS.philosophie}>
                Philosophie
              </Link>
            </li>
          </ul>
        </li>{" "}
        {/* only information about the concept, abstract, with personal message from me */}
        <li>
          <Link href={"#"}>Die Gemeinschaft</Link>
          <ul className={styles.subLinks}>
            <li>
              <Link href={LINKS.schulen}>
                Schulen und AGs
              </Link>
            </li>
            <li>
              <Link href={LINKS.ansprechpartner}>
                Ansprechpartner
              </Link>
            </li>
          </ul>
        </li>{" "}
        {/* information about specific members and schools */}
        <li>
          <Link href={"#"}>Unsere Arbeit</Link>
          <ul className={styles.subLinks}>
            <li>
              <Link href={LINKS.projekte}>Projekte</Link>
            </li>
            <li>
              <Link href={LINKS.blogs}>Blogs</Link>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  )
}
