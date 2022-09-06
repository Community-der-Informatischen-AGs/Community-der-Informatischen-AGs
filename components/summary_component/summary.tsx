import { ReactNode } from "react"
import styles from "./summary.module.scss"

interface SummaryProps {
  title: string
  summaryPoints: ReactNode[]
}

export const Summary = (p: SummaryProps) => {
  return (
    <>
      <h3 className={styles.summaryHeading}>{p.title}</h3>
      <ul>
        {p.summaryPoints.map((point, index) => {
          return <li key={index}>{point}</li>
        })}
      </ul>
    </>
  )
}
