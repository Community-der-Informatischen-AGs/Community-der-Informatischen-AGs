import { StandardPageTemplate } from "../components"
import { KEYWORDS } from "../lib/utils/constants"
import { ImageData } from "../components"
import { ContactForm } from "../components/contact_form_component/contact_form_component"

const Anmeldung = () => {
  return (
    <StandardPageTemplate
      heading={"Anmeldung"}
      title={"Anmeldung"}
      metaDescription={`Auf dieser Seite meldest Du dich für die Teilnahme beim Programm des ${KEYWORDS.nameSeparate} an`}
      image={{
        imageUrl: "/assets/images/home/testimage1.jpg",
        imageTitle: "Anmeldung Picture",
        imageWidth: 3840,
        imageHeight: 5760,
      }}
    >
      <StandardPageTemplate.section>
        <h2>Hello</h2>
        <article>
          Lorem ipsum dolor sit amet consectetur,
          adipisicing elit. Voluptates sint fugit expedita
          odio tempora distinctio natus repellat est, alias
          ad molestias consequatur doloribus ratione autem
          rerum dolores, perferendis in? Quaerat.
        </article>
      </StandardPageTemplate.section>
      <StandardPageTemplate.section>
        <h2>Contact</h2>
        <ContactForm />
      </StandardPageTemplate.section>
    </StandardPageTemplate>
  )
}

export default Anmeldung
