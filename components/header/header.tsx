import styles from "./header.module.css";
import Link from "next/link";
import { FormEvent, useEffect, useRef } from "react";
import { MagnifyingGlass } from "phosphor-react";

export const Header = () => {

  const headerRef = useRef(null);
  const searchInputRef = useRef(null);

  useEffect(() => {

    window.addEventListener("scroll", () => {
      try {

        if (window.scrollY != 0) {
          const element: any = headerRef.current;
          element.style.backgroundColor = "#222b30";
        }
        if (window.scrollY == 0) {
          const element: any = headerRef.current;
          element.style.backgroundColor = "transparent";
        }

      } catch(e) {
        console.log("scrolling error -> " + e);
      }
    });

  });

  function searchSubmit(e: FormEvent) {

    e.preventDefault();

    const searchInputElement: any = searchInputRef.current;
    const searchInputValue = searchInputElement.value;
    const searchOrder = "sys_firstPublishedAt_ASC" // this might be subject to change.

    const queryString = `
      blogPostCollection(limit: 1, order: ${searchOrder}, where: {
        OR: [
          { title_contains: "${searchInputValue}" }
          { body_contains: "${searchInputValue}" }
        ]
      }) {
        items {
          title
        }
      }
      projectPostCollection(limit: 1, order: ${searchOrder}, where: {
        OR: [
          { title_contains: "${searchInputValue}" }
          { description_contains: "${searchInputValue}" }
        ]
      }) {
        items {
          title
        }
      }
      contactPersonCollection(limit: 1, order: ${searchOrder}, where: {
        OR: [
          { title_contains: "${searchInputValue}" }
          { body_contains: "${searchInputValue}" }
        ]
      }) {
        items {
          title
        }
      }
      schoolEntryCollection(limit: 1, order: ${searchOrder}, where: {
        OR: [
          { title_contains: "${searchInputValue}" }
          { body_contains: "${searchInputValue}" }
        ]
      }) {
        items {
          title
        }
      }
    `

    
    // TODO: use api, then create list component. update.

  }

  return <header ref={headerRef} className={styles.header}>
    <i></i> { /* This is the logo, ! will lead to homepage !  */}
    <section className={styles.content}>
      <nav>
        <ul>
          <li><Link href={"/mitmachen"}>Mitmachen</Link></li> { /* Contact form for applications */ }
          <li><Link href={"/ueber-uns"}>Über Uns</Link></li> { /* only information about the concept, abstract, with personal message from me */ }
          <li><Link href={"/gemeinschaft"}>Die Gemeinschaft</Link></li> { /* information about specific members and schools */ }
          <li><Link href={"/arbeit"}>Unsere Arbeit</Link></li> { /* Project Posts */ }
          <li><Link href={"/blog"}>Blog</Link></li> { /* Blog Posts */ }
          <li><Link href={"/kontakt"}>Kontakt</Link></li> { /* Social Media, Links, Maps mit Schulen, Emails, etc. */ }
        </ul>
      </nav>
      <section className={styles.searchSection}>
        <form action="POST" onSubmit={(e) => searchSubmit(e)}>
          <input ref={searchInputRef} type="search" placeholder="Suchen..." minLength={2} /> { /* !! Minlength von 2, da contentful search nur mit min. 2 Zeiche funktioniert */}
          <MagnifyingGlass size={25} color="white" className={styles.searchButton} onClick={(e) => searchSubmit(e)} />
        </form>

        <section className={styles.resultsSection}>
          <ol>
          </ol>
        </section>

      </section>
      <select name="language" id="language-selection"> { /* TODO: implement functionality */ }
        <option value="de" selected>DE</option> 
        <option value="en-US">EN</option>
      </select>
    </section>
  </header>;

}

