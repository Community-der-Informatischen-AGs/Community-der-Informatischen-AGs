import styles from "./header.module.css";
import Link from "next/link";
import { useRouter } from "next/router";
import { FormEvent, MutableRefObject, useEffect, useRef, useState } from "react";
import { LinkSimpleHorizontal, LinkSimpleHorizontalBreak, List, MagnifyingGlass } from "phosphor-react";
import { Select } from "../select_component/select";
import { Search } from "./search_component/search";
import { Navigation } from "./navigation_component/navigation";



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

  const router = useRouter();

  const headerRef = useRef(null);

  useWindowScrollEvent(headerRef);


  return <header ref={headerRef} className={styles.header}>
    <i className={styles.logo} onClick={() => router.push("/", undefined, { shallow: true })}>
    </i>

    <section className={styles.content}>
      <Navigation/>
      <Search />
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

