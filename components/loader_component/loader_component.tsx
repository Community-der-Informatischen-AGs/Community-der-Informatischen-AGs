import React, { useEffect, useRef } from "react"
import styles from "./loader_component.module.scss"

const LOADER_COUNT = 3

export const Loader = () => {
  const loaders = []
  const refs: React.MutableRefObject<HTMLDivElement>[] = []
  /*
  for (let i = 0; i < LOADER_COUNT; i++) {
    const ref = useRef<HTMLDivElement>(null!)
    loaders.push(
      <div className={styles.loaderBlock} ref={ref} />
    )
    refs.push(ref)
  }

  const assignAnimations = () => {
    refs.forEach((ref, index) => {
      ref.current.style.animationName = "loaderAnimation"
      ref.current.style.animationDuration = "5s"
      ref.current.style.animationDelay = index * 0.5 + "s"
      ref.current.style.animationIterationCount = "infinite"
    })
  }

  useEffect(() => {
    window.addEventListener("load", assignAnimations)
    return () =>
      window.removeEventListener("load", assignAnimations)
  }, [assignAnimations])

  return (
    <div className={styles.loaderWrapper}>
      <div className={styles.loader}>{loaders}</div>
    </div>
  )
  */
  return <div></div>
}
