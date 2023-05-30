import "../styles/globals.scss"
import type { AppProps } from "next/app"
import { ButtonComponent, Loader } from "../components"
import {CookieConsent} from "react-cookie-consent"

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
    <CookieConsent
    location="top"
        buttonText="Akzeptieren"
        cookieName="cookieConsent"
        overlay
        buttonStyle={{background: "white"}}
        style={{ background: "#2B373B" }}
      > 
        Diese Website benutzt Technologie von Drittanbietern (SendGrind) durch Benutzung dieses Dienstes werden möglicherweise Daten an diese Anbieter übermittelt. Die Website selbst erhebt keine Daten zur Statistik oder Analyse. 
      </CookieConsent>
      <Component {...pageProps} />
      <Loader />
      
    </>
  )
}

export default MyApp
