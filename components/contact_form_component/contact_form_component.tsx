import styles from "./contact_form_component.module.scss"

// Make sure to run npm install @formspree/react
// For more help visit https://formspr.ee/react-help
import React, { FormEvent, useRef, useState } from "react"

const NAME = "name"
const EMAIL = "email"
const SCHOOL = "school"
const SCHOOLMAIL = "schoolMail"
const MESSAGE = "message"

const useFormSubmission = (
  formRef: React.RefObject<HTMLFormElement>
): [string, (e: FormEvent) => Promise<void>] => {
  const [statusMessage, setStatusMessage] = useState("")

  const submit = async (e: FormEvent) => {
    e.preventDefault()

    const currentFormElement = formRef.current!

    const nameInput: HTMLInputElement =
      currentFormElement.querySelector(`#${NAME}`)!
    const emailInput: HTMLInputElement =
      currentFormElement.querySelector(`#${EMAIL}`)!
    const schoolInput: HTMLInputElement =
      currentFormElement.querySelector(`#${SCHOOL}`)!
    const schoolMailInput: HTMLInputElement =
      currentFormElement.querySelector(`#${SCHOOLMAIL}`)!
    const messageInput: HTMLTextAreaElement =
      currentFormElement.querySelector(`#${MESSAGE}`)!

    // TODO: send to api endpoint

    const formData: FormData = new FormData()
    formData.append(NAME, nameInput.value)
    formData.append(EMAIL, emailInput.value)
    formData.append(SCHOOL, schoolInput.value)
    formData.append(SCHOOLMAIL, schoolMailInput.value)
    formData.append(MESSAGE, messageInput.value)

    const response = await fetch("/api/contact", {
      method: "POST",
      body: formData,
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
      <label htmlFor={NAME}>Dein Name</label>
      <input
        id={NAME}
        type="text"
        name={NAME}
        placeholder="Max Mustermann"
        required
      />

      <label htmlFor={EMAIL}>Deine Email</label>
      <input
        placeholder="max.mustermann@gmail.com"
        id={EMAIL}
        type="email"
        name={EMAIL}
        required
      />

      <label htmlFor={SCHOOL}>Name der Schule</label>
      <input
        placeholder="Annette-von-Droste-Hülshoff-Gymnasium"
        id={SCHOOL}
        type="text"
        name={SCHOOL}
        required
      />

      <label htmlFor={SCHOOLMAIL}>Email der Schule</label>
      <input
        placeholder="annettegymnasium@mail.com"
        id={SCHOOLMAIL}
        type="email"
        name={SCHOOLMAIL}
        required
      />

      <label htmlFor={MESSAGE}>Nachricht</label>
      <textarea
        id={MESSAGE}
        placeholder="Weitere Gedanken, Fragen, Unklarheiten, Anmerkungen..."
        name={MESSAGE}
      />

      <button type="submit">Anmeldung einreichen</button>

      <p>{statusMessage}</p>
    </form>
  )
}
