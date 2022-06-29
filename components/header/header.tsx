import styles from "./header.module.css";
import Link from "next/link";
import { FormEvent, MutableRefObject, useEffect, useRef, useState } from "react";
import { LinkSimpleHorizontal, MagnifyingGlass, X } from "phosphor-react";
import { Select } from "../select/select";


function useWindowScrollEvent(headerRef: MutableRefObject<null>) {

  useEffect(() => {

    function windowScrollEvent() {
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
    }

    window.addEventListener("scroll", windowScrollEvent);

    return () => {
      window.removeEventListener("scroll", windowScrollEvent);
    }

  }, [headerRef]);
}

export const Header = () => {

  const reservedInvalidId = "";
  const headerRef = useRef(null);
  const searchInputRef = useRef(null);
  const [searchActive, setSearchActive] = useState(false);
  const [searchResults, setSearchResults] = 
    useState<{
      title: string,
      entryId: string
    }[]>([]);

  useWindowScrollEvent(headerRef);

  async function searchSubmit(e: FormEvent) {

    e.preventDefault();

    const searchInputElement: any = searchInputRef.current;
    const searchInputValue = searchInputElement.value;

    if (searchInputValue.length < 2) {
      return false;
    }

    
    // TODO: use api, then create list component. update.
    // fetching from nextjs api to get data from contentful


    const searchResults = await fetch("/api/contentful/search", {
      method: "POST",
      body: JSON.stringify({
        searchInput: searchInputValue,
        locale: "de" // TODO: implement localization
      })
    });

    const status = searchResults.status;

    if (status != 200) {
      setSearchResults([{
        title: "search failed, please try again",
        entryId: reservedInvalidId
      }]);
    }

    const jsonResults = await searchResults.json();

    const temporarySearchResults = [];
    for (let result of jsonResults) {
      console.log(result);

      const title = result.title;
      const entryId = result.sys.id;

      temporarySearchResults.push({
        title: title,
        entryId: entryId
      });

      
    }

    setSearchActive(true);
    setSearchResults(temporarySearchResults);

  }

  return <header ref={headerRef} className={styles.header}>
    <i></i> { /* This is the logo, ! will lead to homepage ! */}
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
        <form action="POST" onSubmit={(e) => searchSubmit(e)}
          onFocus={() => setSearchActive(true)}
        >
          <input 
            ref={searchInputRef}
            className={styles.searchInput}
            type="search" 
            placeholder="Suchen..." 
            minLength={2}
          /> { /* !! Minlength von 2, da contentful search nur mit min. 2 Zeiche funktioniert */ }
          <X
            size={20} 
            color="white" 
            className={styles.xButton} 
            opacity={0.5} 
            style={{
              display: searchActive ? "block" : "none"
            }}
            onClick={() => setSearchActive(false)}
          />
          <MagnifyingGlass
            size={25} 
            color="white"
            opacity={0.5} 
            className={styles.searchButton} 
            onClick={(e) => searchSubmit(e)} 
          />
          <section 
            className={styles.resultsSection}
            style={{
              display: searchActive ? "block" : "none"
            }}
          >
            <ol>
              {
                searchResults.length == 0 ?
                  <li>press enter</li>
                  :
                  searchResults.map((pair) => {
                    return <li key={pair.entryId}>
                      <Link href={"/" + pair.entryId}>{pair.title}</Link>
                      <LinkSimpleHorizontal size={15} color="white" opacity={0.5} />
                    </li>
                  })
              }
            </ol>
          </section>
        </form>

      </section>
      <Select
        options={[
          {  
            key: "DE",
            value: "de"
          },
          { 
            key: "EN",
            value:"en-US"
          }
        ]}
        initialSelectedIndex={0}
        onSelect={(selectedValue: string) => {
          // TODO: change localization and implement localization
          console.log(selectedValue);
        }}
      />
    </section>
  </header>;

}

