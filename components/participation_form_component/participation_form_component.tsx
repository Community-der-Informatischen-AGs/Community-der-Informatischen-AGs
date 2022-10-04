import styles from "./participation_form_component.module.scss"

// Make sure to run npm install @formspree/react
// For more help visit https://formspr.ee/react-help
import React, { FormEvent, useRef, useState } from "react"
import {
  CONTACT_FORM,
  LINKS,
} from "../../lib/utils/constants"
import { ButtonComponent } from "../button_component"
import { PaperPlaneRight } from "phosphor-react"
import { HasOptionalStyleSheet } from "../../lib/utils/types"
import cn from "classnames"

const useFormSubmission = (
  formRef: React.RefObject<HTMLFormElement>
): [string, string, (e: FormEvent) => Promise<void>] => {
  const [statusMessage, setStatusMessage] = useState("")
  const [statusColor, setStatusColor] = useState("white")

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

    const json = await response.json()

    switch (response.status) {
      case 200:
        setStatusMessage("Email abgeschickt!")
        setStatusColor("green")
        break
      case 400:
        setStatusMessage(json.message)
        setStatusColor("indianred")
        break
      case 500:
        setStatusColor("indianred")
        setStatusMessage(
          `Serverseitiger Fehler. Bitte versuche später nochmal oder schreibe die Anmeldung und diesen Fehler an ${LINKS.email}`
        )
        break
    }
  }

  return [statusMessage, statusColor, submit]
}

export const ParticipationForm = (
  p: HasOptionalStyleSheet
) => {
  const formRef = useRef<HTMLFormElement>(null!)

  const [statusMessage, statusColor, submit] =
    useFormSubmission(formRef)

  let stylesheet = p.stylesheet ?? {} // !! this is how you can quickly create a working stylesheet

  return (
    <form
      method="POST"
      ref={formRef}
      onSubmit={(e) => submit(e)}
      className={cn(
        styles.participationForm,
        stylesheet.participationForm
      )}
    >
      <section className={stylesheet.name}>
        <label htmlFor={CONTACT_FORM.name}>Dein Name</label>
        <input
          id={CONTACT_FORM.name}
          type="text"
          name={CONTACT_FORM.name}
          placeholder="Max Mustermann"
          required
        />
      </section>

      <section className={stylesheet.email}>
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
      </section>

      <section className={stylesheet.school}>
        <label htmlFor={CONTACT_FORM.school}>
          Vollständiger Name der Schule und Ort
        </label>
        <input
          placeholder="Annette-von-Droste-Hülshoff-Gymnasium, Düsseldorf"
          id={CONTACT_FORM.school}
          type="text"
          name={CONTACT_FORM.school}
          required
        />
      </section>

      <section className={stylesheet.schoolMail}>
        <label htmlFor={CONTACT_FORM.schoolMail}>
          Email der Schule / Email deiner AG
        </label>
        <input
          placeholder="annettegymnasium@mail.com"
          id={CONTACT_FORM.schoolMail}
          type="email"
          name={CONTACT_FORM.schoolMail}
          required
        />
      </section>

      <section className={stylesheet.message}>
        <label htmlFor={CONTACT_FORM.message}>
          Nachricht
        </label>
        <textarea
          id={CONTACT_FORM.message}
          placeholder="Weitere Gedanken, Fragen, Unklarheiten, Anmerkungen, Angaben..."
          name={CONTACT_FORM.message}
        />
      </section>

      <ButtonComponent
        className={stylesheet.submit}
        weight="high"
        icon={<PaperPlaneRight />}
        type="submit"
      >
        Anmeldung einreichen
      </ButtonComponent>

      <p
        className={stylesheet.status}
        style={{ color: statusColor }}
      >
        {statusMessage}
      </p>
    </form>
  )
}
