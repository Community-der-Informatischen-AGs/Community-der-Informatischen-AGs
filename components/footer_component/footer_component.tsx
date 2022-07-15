import Link from "next/link"
import {
  Envelope,
  GithubLogo,
  InstagramLogo,
  YoutubeLogo,
} from "phosphor-react"
import styles from "./footer_component.module.scss"

export const Footer = () => {
  return (
    <footer>
      <section className={styles.socialMedia}>
        {/* bunch of icons here */}
        <InstagramLogo size={32} weight="thin" />
        <YoutubeLogo size={32} weight="thin" />
        <Envelope size={32} weight="thin" />
        <GithubLogo size={32} weight="thin" />
      </section>
      <section className={styles.links}>
        <Link href={}>Impressum</Link>
        <Link href={}>Annette-Entwickelt-Digital</Link>
        <Link href={}>Schloß-Entwickelt-Digital</Link>
        <Link href={}>Kobi-Entwickelt-Digital</Link>
      </section>
      <h6>2022 © Jugend-Entwickelt-Digital</h6>
    </footer>
  )
}
