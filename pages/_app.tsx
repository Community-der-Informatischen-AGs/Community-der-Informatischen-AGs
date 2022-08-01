import "../styles/globals.scss"
import type { AppProps } from "next/app"
import { Loader } from "../components"

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <Loader />
    </>
  )
}

export default MyApp
