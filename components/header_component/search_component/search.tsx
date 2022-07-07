import Link from "next/link"
import {
  LinkSimpleHorizontal,
  LinkSimpleHorizontalBreak,
  MagnifyingGlass,
  X,
} from "phosphor-react"
import {
  FormEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react"

import styles from "./search.module.css"

export const Search = () => {
  const reservedInvalidId = ""
  const [searchInputValue, setSearchInputValue] =
    useState("")
  const [searchActive, setSearchActive] = useState(false)
  const [searchResults, setSearchResults] = useState<
    {
      title: string
      entryId: string
    }[]
  >([])

  useEffect(() => {
    const timeOutId = setTimeout(async () => {
      if (searchInputValue.length < 2) {
        return false
      }

      // TODO: use api, then create list component. update.
      // fetching from nextjs api to get data from contentful

      const searchResults = await fetch(
        "/api/contentful/search",
        {
          method: "POST",
          body: JSON.stringify({
            searchInput: searchInputValue,
            locale: "de", // TODO: implement localization
          }),
        }
      )

      const status = searchResults.status

      if (status != 200) {
        setSearchResults([
          {
            title: "search failed, please try again",
            entryId: reservedInvalidId,
          },
        ])
      }

      const jsonResults = await searchResults.json()

      const temporarySearchResults = []
      for (let result of jsonResults) {
        console.log(result)

        const title = result.title
        const entryId = result.sys.id

        temporarySearchResults.push({
          title: title,
          entryId: entryId,
        })
      }
      setSearchResults(temporarySearchResults)
    })

    return () => clearTimeout(timeOutId)
  }, [searchInputValue])

  async function searchSubmit(e: FormEvent) {
    e.preventDefault()

    // TODO: render a page with all of the posts.
  }

  const handleBlur = useCallback((e: any) => {
    const currentTarget = e.currentTarget
    requestAnimationFrame(() => {
      // Check if the new focused element is a child of the original container
      if (!currentTarget.contains(document.activeElement)) {
        setSearchActive(false)
      }
    })
  }, [])

  return (
    <section className={styles.searchSection}>
      <div className={styles.miniSearch}>
        <MagnifyingGlass
          size={25}
          onClick={() => {
            // TODO: send the user to the search site.
          }}
        />
      </div>
      <form
        action="POST"
        onSubmit={(e) => searchSubmit(e)}
        onFocus={() => setSearchActive(true)}
        onBlur={handleBlur}
      >
        <input
          value={searchInputValue}
          onChange={(e) =>
            setSearchInputValue(e.target.value)
          }
          className={styles.searchInput}
          type="search"
          placeholder="Suchen..."
          minLength={2}
        />{" "}
        {/* !! Minlength von 2, da contentful search nur mit min. 2 Zeiche funktioniert */}
        <button
          className={styles.xButton}
          onClick={() => {
            setSearchInputValue("")
          }}
        >
          <X
            size={25}
            color="white"
            opacity={0.5}
            style={{
              display:
                searchInputValue != "" ? "block" : "none",
            }}
          />
        </button>
        <button
          className={styles.searchButton}
          onClick={(e) => searchSubmit(e)}
        >
          <MagnifyingGlass
            size={25}
            color="white"
            opacity={0.5}
          />
        </button>
        <section
          className={styles.resultsSection}
          style={{
            display: searchActive ? "block" : "none",
          }}
        >
          <ol>
            {searchResults.length == 0 ? (
              <li
                style={{
                  opacity: 0.7,
                }}
              >
                nix.
              </li>
            ) : (
              searchResults.map((pair) => {
                // TODO: implement entry system where the type of entry is protrayed.
                return (
                  <li key={pair.entryId}>
                    <div className={styles.linkTextWrapper}>
                      <Link href={"/" + pair.entryId}>
                        {pair.title}
                      </Link>
                    </div>
                    <LinkSimpleHorizontal
                      size={15}
                      color="white"
                      opacity={0.5}
                    />
                  </li>
                )
              })
            )}
            {searchResults.length != 0 ? (
              <li>
                <Link
                  href="/search"
                  className={styles.viewMore}
                >
                  View more
                </Link>
                <LinkSimpleHorizontalBreak
                  size={17}
                  color="white"
                  opacity={0.7}
                />
              </li>
            ) : null}
          </ol>
        </section>
      </form>
    </section>
  )
}
