import Link from "next/link"
import { List } from "phosphor-react"
import { useEffect, useState } from "react"

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
          <Link href={"/"}>Mitmachen</Link>
          <ul className={styles.subLinks}>
            <li>
              <Link href={"/anmeldung"}>Anmeldung</Link>
            </li>
            <li>
              <Link href={"/teilnahme-informationen"}>
                Teilnahme Informationen
              </Link>
            </li>
            <li>
              <Link href={"/kooperation"}>Kooperation</Link>
            </li>
          </ul>
        </li>{" "}
        {/* Contact form for applications */}
        <li>
          <Link href={"/"}>Über Uns</Link>
          <ul className={styles.subLinks}>
            <li>
              <Link href={"/die-idee"}>Die Idee</Link>
            </li>
            <li>
              <Link href={"/philosophie"}>
                Unsere Philosophie
              </Link>
            </li>
            <li>
              <Link href={"/anfaenge"}>Anfänge</Link>
            </li>
          </ul>
        </li>{" "}
        {/* only information about the concept, abstract, with personal message from me */}
        <li>
          <Link href={"/"}>Die Gemeinschaft</Link>
          <ul className={styles.subLinks}>
            <li>
              <Link href={"/schulen"}>Schulen und AGs</Link>
            </li>
            <li>
              <Link href={"/ansprechpartner"}>
                Ansprechpartner
              </Link>
            </li>
          </ul>
        </li>{" "}
        {/* information about specific members and schools */}
        <li>
          <Link href={"/arbeit"}>Unsere Arbeit</Link>
        </li>{" "}
        {/* Project Posts */}
        <li>
          <Link href={"/blog"}>Blog</Link>
        </li>{" "}
        {/* Blog Posts */}
        <li>
          <Link href={"/kontakt"}>Kontakt</Link>
        </li>{" "}
        {/* Social Media, Links, Maps mit Schulen, Emails, etc. */}
      </ul>
    </nav>
  )
}
