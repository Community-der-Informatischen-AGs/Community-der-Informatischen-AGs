import Link from "next/link"
import {
  Envelope,
  GithubLogo,
  InstagramLogo,
  LinkSimple,
  YoutubeLogo,
} from "phosphor-react"
import { KEYWORDS, LINKS } from "../../lib/utils/constants"
import styles from "./footer_component.module.scss"

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <section className={styles.contactSection}>
        <h6>Kontakt</h6>
        <div className={styles.email}>
          <Envelope size={32} weight="thin" />
          <Link
            href={
              "mailto:jugend-entwickelt-software@gmail.com"
            }
          >
            jugend-entwickelt-software@gmail.com
          </Link>
        </div>
        <b>Hauptstandort:</b>
        <p>Brucknerstraße 19, 40593 Düsseldorf</p>
        <p>Annette-von-Droste-Hülshoff-Gymnasium</p>
      </section>
      <section className={styles.linksSection}>
        <h6>Arbeitsgemeinschaften</h6>
        <a href={LINKS.annette}>{KEYWORDS.annette}</a>
        <a href={LINKS.schloss}>{KEYWORDS.schloss}</a>
        <a href={LINKS.kobi}>{KEYWORDS.kobi}</a>
      </section>
      <section className={styles.socialMediaSection}>
        <h6>Social Media</h6>
        {/* bunch of icons here */}
        <div className={styles.logoContainer}>
          <InstagramLogo
            onClick={() => {
              window.location.href =
                "https://www.instagram.com/"
            }}
            size={40}
            weight="thin"
          />
          <YoutubeLogo
            onClick={() => {
              window.location.href =
                "https://www.youtube.com/"
            }}
            size={40}
            weight="thin"
          />
          <GithubLogo
            onClick={() => {
              window.location.href =
                "https://www.github.com/"
            }}
            size={40}
            weight="thin"
          />
        </div>
      </section>
      <h5 className={styles.copyright}>
        © 2022 {KEYWORDS.nameConnected}
      </h5>
    </footer>
  )
}
