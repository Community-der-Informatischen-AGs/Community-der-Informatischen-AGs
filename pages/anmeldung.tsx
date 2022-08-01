import { StandardPageTemplate } from "../components"
import { KEYWORDS, LINKS } from "../lib/utils/constants"
import { ContactForm } from "../components/contact_form_component/contact_form_component"
import Link from "next/link"
import { NextPage } from "next"

const Anmeldung: NextPage = () => {
  return (
    <StandardPageTemplate
      heading={"Anmeldung"}
      image={{
        url: "/assets/images/home/philosophy3.jpg",
        width: 3456,
        height: 2304,
        title: "image",
      }}
      titleSentence={[
        "Die",
        "Anmeldung",
        "bei der",
        "C.D.I.A.",
      ]}
      titleIndex={1}
      metaDescription={`Auf dieser Seite meldest Du dich für die Teilnahme beim Programm des ${KEYWORDS.nameSeparate} an`}
      codeSnippet={`
  
      def foo(bar, leftBar, rightBar, x):
        while leftBar <= rightBar:
    
            foobar = leftBar + (rightBar - leftBar) // 2
    
            if array[foobar] == x:
                return foobar
    
            elif array[foobar] < x:
              leftBar = foobar + 1
    
            else:
              rightBar = foobar - 1
    
        return "could not be found"
    
      `}
    >
      <StandardPageTemplate.section>
        <h2>Details zur Anmeldung</h2>
        <article>
          <b>
            Genauere Informationen zur Anmeldung und auch
            Teilnahme bei unserer Community findet ihr{" "}
            <Link href={`/${LINKS.informationen}`}>
              hier
            </Link>
          </b>
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

export default Anmeldung
