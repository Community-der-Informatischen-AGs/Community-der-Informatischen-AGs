import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import cn from "classnames"
import { useEffect, useState } from "react"
import {
  CONTENTFUL_IMAGE_QUERY,
  CONTENT_TYPE_IDS,
} from "../../lib/contentful/constants"
import {
  ImageData,
  SCSSStyleSheet,
} from "../../lib/utils/types"
import { ImageComponent } from "../image_component"
import { processImageData } from "../preview_post_component"

import styles from "./contact_person_component.module.scss"

interface ContactPersonProps {
  id: string
  stylesheet?: SCSSStyleSheet
  className?: string
}

interface ContactPersonAttributes {
  title: string
  body: {
    json: any
  }
  agEmail: string
  links: {
    [key: string]: string
  }
  image: ImageData
}

const lazyLoad = async (id: string) => {
  const bodyJson = {
    entryType: CONTENT_TYPE_IDS.person,
    entryId: id,
    entryQuery: `
      title
      body {
        json
      }
      agEmail
      links
      picture ${CONTENTFUL_IMAGE_QUERY}
    `,
  }
  const responsePostData = await fetch(
    "/api/contentful/entry",
    {
      method: "POST",
      body: JSON.stringify(bodyJson),
    }
  )

  const responseJsonData = (await responsePostData.json())
    .data[CONTENT_TYPE_IDS.person]
  const title = responseJsonData.title
  const body = responseJsonData.body
  const agEmail = responseJsonData.agEmail
  const links = responseJsonData.links
  const image = responseJsonData.picture

  return {
    title: title,
    agEmail: agEmail,
    body: body,
    links: links,
    image: processImageData(image),
  }
}

export const ContactPerson = (p: ContactPersonProps) => {
  // TODO: Lazy load, but make sure to fill in with loader beforehand less it looks trash

  const [personAttributes, setPersonAttributes] =
    useState<ContactPersonAttributes>(
      {} as ContactPersonAttributes
    )

  useEffect(() => {
    lazyLoad(p.id).then((loadedPersonAttributes) => {
      if (loadedPersonAttributes != undefined) {
        setPersonAttributes(
          loadedPersonAttributes as ContactPersonAttributes
        )
      }
    })
  }, [p.id])

  let stylesheet = p.stylesheet
  if (stylesheet == undefined) {
    stylesheet = {}
  }

  return (
    <div
      className={cn(
        stylesheet.contactPerson,
        styles.contactPerson,
        p.className,
        personAttributes.title == ""
          ? styles.unloaded
          : styles.loaded
      )}
    >
      <ImageComponent
        className={styles.image}
        image={personAttributes.image}
        stylesheet={stylesheet}
        layout="responsive"
      />
      <h3 className={cn(stylesheet.name, styles.name)}>
        {personAttributes.title}
      </h3>
      <article className={cn(stylesheet.body, styles.body)}>
        {documentToReactComponents(
          personAttributes.body?.json
        )}
      </article>
      <section
        className={cn(stylesheet.links, styles.links)}
      >
        <ul>
          <li>
            Email der AG:{" "}
            <a href={`mailto:${personAttributes.agEmail}`}>
              {personAttributes.agEmail}
            </a>
          </li>
          {personAttributes.links != undefined
            ? Object.entries(personAttributes.links).map(
                (entry, index) => {
                  return (
                    <li key={index}>
                      {entry[0]}
                      {": "}
                      <a href={entry[1]}>{entry[1]}</a>
                    </li>
                  )
                }
              )
            : null}
        </ul>
      </section>
    </div>
  )
}
