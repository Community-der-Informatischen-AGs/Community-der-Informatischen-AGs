import {
  StandardPageTemplate,
  ContactForm,
} from "../components"
import { KEYWORDS } from "../lib/utils/constants"
import { NextPage } from "next"

import styles from "./../styles/teilnahme/teilnahme.module.scss"

const Teilnahme: NextPage = () => {
  return (
    <StandardPageTemplate
      heading={"Teilnahme"}
      image={{
        url: "/assets/images/home/philosophy3.jpg",
        width: 3456,
        height: 2304,
        title: "image",
      }}
      titleSentence={[
        "Die",
        "Teilnahme",
        "bei der",
        "Community",
      ]}
      titleIndex={1}
      metaDescription={`Auf dieser Seite meldest Du dich für die Teilnahme beim Programm des ${KEYWORDS.nameSeparate} an`}
      codeSnippet={`
  
      if (formatList.length != replaceList.length) {
        console.log("%c util, l. 31: formatList length not equal to replaceList length", 
                    "color: red");
        return;
      } else {

          // replaces all ~tag~ with its contents
          for (let index=0; index<formatList.length; index++) {
              let formatString = "...";

              let replaceString = replaceList[index];

              domTemplate = domTemplate.replace(
                  new RegExp(formatString, "g"), 
                  replaceString
              );
          }

          return domTemplate;

      }
    
      `}
    >
      <StandardPageTemplate.section>
        <h2>Details zur Anmeldung</h2>
        <p>
          Bei der Community nehmen wir folgende Mitglieder /
          AGs:
        </p>
        <br />
        <p>1. Entweder:</p>
        <ol className={styles.list}>
          <li>
            Du bist Schüler in der Oberstufe (EF - Q2) in
            Nordrhein-Westfalen
          </li>
          <li>
            Du hast an deiner Schule ca. 5 Schüler gefunden,
            die ähnlich an dem Projekt interessiert sind und
            gerne eine AG an eurer Schule starten möchten
          </li>
        </ol>
        <br />
        <p>2. Oder:</p>
        <ol className={styles.list}>
          <li>
            Du bist der Leiter einer informatischen AG an
            deiner Schule
          </li>
          <li>
            Deine AG besteht aus mindestens um die 5
            Mitglieder
          </li>
          <li>
            Die AG ist für Schüler in den Jahrgangsstufen EF
            - Q2 gemeint
          </li>
        </ol>
        <br />
        <p>
          Im <u>1. Fall</u> bitten wir euch dazu, bei der
          Anmeldung die{" "}
          <b>Namen, Discord Usernames und Stufen</b> aller
          Interessenten anzugeben
        </p>
        <br />
        <p>
          Im <u>2. Fall</u> bitten wir euch dazu, den{" "}
          <b>
            Namen eurer AG, das genaue informatische Thema
          </b>{" "}
          (Sei es Software-Entwicklung, Datenstrukturen und
          Algorithmen, etc.){" "}
          <b>
            sowie die Mitglieder und deren Namen und Stufen
            sowie Discord Usernames
          </b>
          anzugeben.
        </p>
        <br />
        <p>Es gilt jedoch:</p>
        <h5>
          Ein Versuch ist es immer wert, auch wenn ihr die
          Bedingungen nicht erfüllt, könnt ihr eure
          individuellen Situation und Wünsche beschreiben.
          Wir versuchen, etwas draus zu machen.
        </h5>
      </StandardPageTemplate.section>
      <StandardPageTemplate.section>
        <h2>Anmeldeformular</h2>
        <ContactForm />
      </StandardPageTemplate.section>
    </StandardPageTemplate>
  )
}

export default Teilnahme
