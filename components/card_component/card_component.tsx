import { useRouter } from "next/router"
import styles from "./card_component.module.scss"

// TODO: use Next Images
interface CardComponentProps {
  imageSource: string
  imageAlt: string
  title: string
  text: string
  link: string
  className?: string
}

export const CardComponent = (
  props: CardComponentProps
) => {
  const router = useRouter()

  return (
    <div
      className={
        styles.cardComponent + " " + props.className
      }
      onClick={() => {
        router.push(props.link)
      }}
    >
      <img src={props.imageSource} alt={props.imageAlt} />
      <section className={styles.textSection}>
        <h4>{props.title}</h4>
        <p>{props.text}</p>
      </section>
    </div>
  )
}
