import {
  StandardPageTemplate,
  ContactForm,
} from "../components"
import { KEYWORDS } from "../lib/utils/constants"
import { NextPage } from "next"

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
        "C.D.I.A.",
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
        <article>
          <p>Zusammengefasst gilt jedoch Folgendes:</p>
          <ul>
            <li>
              Du bist Schüler / Schülerin an einer Schule in
              NRW
            </li>
            <li>
              An deiner Schule gibt es eine Gruppe von
              mindestens <b>3</b>
            </li>
          </ul>
        </article>
      </StandardPageTemplate.section>
      <StandardPageTemplate.section>
        <h2>Anmeldeformular</h2>
        <ContactForm />
      </StandardPageTemplate.section>
    </StandardPageTemplate>
  )
}

export default Teilnahme
