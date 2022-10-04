import { NextPage } from "next"
import { useRouter } from "next/router"

import styles from "./../styles/404/404.module.scss"

const FourOhFour: NextPage = () => {
  const router = useRouter()

  return (
    <main className={styles.main}>
      <div className={styles.div}></div>
      <h1 className={styles.bruh}>Bruh.</h1>
      <h1 className={styles.backrooms}>
        Du bist in den Backrooms angekommen.
      </h1>
      <div
        className={styles.back}
        onClick={() => {
          router.back()
        }}
      >
        <a>Zurück</a>
      </div>
    </main>
  )
}
export default FourOhFour
