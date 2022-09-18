import { ReactNode } from "react"

interface SummaryProps {
  title: string
  summaryPoints: ReactNode[]
}

export const Summary = (p: SummaryProps) => {
  return (
    <>
      <ul>
        {p.summaryPoints.map((point, index) => {
          return <li key={index}>{point}</li>
        })}
      </ul>
    </>
  )
}
