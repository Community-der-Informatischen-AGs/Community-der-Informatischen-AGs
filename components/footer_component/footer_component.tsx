import Link from "next/link"
import {
  Envelope,
  GithubLogo,
  InstagramLogo,
  User,
  YoutubeLogo,
} from "phosphor-react"
import { KEYWORDS, LINKS } from "../../lib/utils/constants"
import styles from "./footer_component.module.scss"

export const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className={styles.footer}>
      <main>
        <section className={styles.contactSection}>
          <h6>Kontakt</h6>
          <div className={styles.email}>
            <Envelope size={32} weight="thin" />
            <Link href={`mailto:${LINKS.email}`}>
              {LINKS.email}
            </Link>
          </div>
          <h6>Beratende Lehrkraft:</h6>
          <p>{LINKS.beratungslehrer}</p>
          <div className={styles.email}>
            <User size={32} weight="thin" />
            <Link href={`mailto:${LINKS.beratungsemail}`}>
              {LINKS.beratungsemail}
            </Link>
          </div>
        </section>
        <section className={styles.socialMediaSection}>
          <h6>Social Media</h6>
          {/* bunch of icons here */}
          <div className={styles.logoContainer}>
            <InstagramLogo
              onClick={() => {
                window.location.href = LINKS.instagram
              }}
              size={40}
              weight="thin"
            />
            <YoutubeLogo
              onClick={() => {
                window.location.href = LINKS.youtube
              }}
              size={40}
              weight="thin"
            />
            <GithubLogo
              onClick={() => {
                window.location.href = LINKS.github
              }}
              size={40}
              weight="thin"
            />
          </div>
        </section>
        <section>
          <h6>Verweise</h6>
          <p>
            Webseite von:{" "}
            <a href={LINKS.ruizhang}>
              Rui Zhang (TotallyInformatik)
            </a>
          </p>
          <p>
            Unterstützung und Wartung:{" "}
            <a href="mailto:nicostender@duck.com">
              Nico Stender
            </a>
          </p>
        </section>
      </main>
      <h5 className={styles.copyright}>
        ©{" "}
        {currentYear == 2022
          ? "2022"
          : `2022 - ${currentYear}`}{" "}
        {KEYWORDS.nameConnected}
      </h5>
    </footer>
  )
}
