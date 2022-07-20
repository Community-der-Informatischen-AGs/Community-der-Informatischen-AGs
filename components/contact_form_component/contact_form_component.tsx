import styles from "./contact_form_component.module.scss"

// Make sure to run npm install @formspree/react
// For more help visit https://formspr.ee/react-help
import React, { FormEvent, useRef, useState } from "react"
import { CONTACT_FORM } from "../../lib/utils/constants"

const useFormSubmission = (
  formRef: React.RefObject<HTMLFormElement>
): [string, (e: FormEvent) => Promise<void>] => {
  const [statusMessage, setStatusMessage] = useState("")

  const submit = async (e: FormEvent) => {
    e.preventDefault()

    const currentFormElement = formRef.current!

    const nameInput: HTMLInputElement =
      currentFormElement.querySelector(
        `#${CONTACT_FORM.name}`
      )!
    const emailInput: HTMLInputElement =
      currentFormElement.querySelector(
        `#${CONTACT_FORM.email}`
      )!
    const schoolInput: HTMLInputElement =
      currentFormElement.querySelector(
        `#${CONTACT_FORM.school}`
      )!
    const schoolMailInput: HTMLInputElement =
      currentFormElement.querySelector(
        `#${CONTACT_FORM.schoolMail}`
      )!
    const messageInput: HTMLTextAreaElement =
      currentFormElement.querySelector(
        `#${CONTACT_FORM.message}`
      )!

    // TODO: send to api endpoint

    const formData = {
      [CONTACT_FORM.name]: nameInput.value,
      [CONTACT_FORM.email]: emailInput.value,
      [CONTACT_FORM.school]: schoolInput.value,
      [CONTACT_FORM.schoolMail]: schoolMailInput.value,
      [CONTACT_FORM.message]: messageInput.value,
    }

    const response = await fetch("/api/contact", {
      method: "POST",
      body: JSON.stringify(formData),
    })

    switch (response.status) {
      case 200:
        break
      case 400:
        break
      case 500:
        break
      default:
    }

    // * this works.
    //setStatusMessage("bullshit")
  }

  return [statusMessage, submit]
}

export const ContactForm = () => {
  const formRef = useRef<HTMLFormElement>(null!)

  const [statusMessage, submit] = useFormSubmission(formRef)

  return (
    <form
      method="POST"
      ref={formRef}
      onSubmit={(e) => submit(e)}
      className={styles.contactForm}
    >
      <label htmlFor={CONTACT_FORM.name}>Dein Name</label>
      <input
        id={CONTACT_FORM.name}
        type="text"
        name={CONTACT_FORM.name}
        placeholder="Max Mustermann"
        required
      />

      <label htmlFor={CONTACT_FORM.email}>
        Deine Email
      </label>
      <input
        placeholder="max.mustermann@gmail.com"
        id={CONTACT_FORM.email}
        type="email"
        name={CONTACT_FORM.email}
        required
      />

      <label htmlFor={CONTACT_FORM.school}>
        Name der Schule
      </label>
      <input
        placeholder="Annette-von-Droste-Hülshoff-Gymnasium"
        id={CONTACT_FORM.school}
        type="text"
        name={CONTACT_FORM.school}
        required
      />

      <label htmlFor={CONTACT_FORM.schoolMail}>
        Email der Schule
      </label>
      <input
        placeholder="annettegymnasium@mail.com"
        id={CONTACT_FORM.schoolMail}
        type="email"
        name={CONTACT_FORM.schoolMail}
        required
      />

      <label htmlFor={CONTACT_FORM.message}>
        Nachricht
      </label>
      <textarea
        id={CONTACT_FORM.message}
        placeholder="Weitere Gedanken, Fragen, Unklarheiten, Anmerkungen..."
        name={CONTACT_FORM.message}
      />

      <button type="submit">Anmeldung einreichen</button>

      <p>{statusMessage}</p>
    </form>
  )
}
