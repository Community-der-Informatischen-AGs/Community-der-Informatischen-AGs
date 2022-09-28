import cn from "classnames"
import React, { useContext } from "react"
import styles from "./tab_view_component.module.scss"

interface TabProps {
  className?: string // since its only a single wrapper container, we can just use className for simple styling instead of an entire stylesheet
  children: JSX.Element[]
}

interface TabViewContextProps {
  setTabIndex: (index: number) => void
  tabIndex: number
}

export const TabViewContext =
  React.createContext<TabViewContextProps>({
    setTabIndex: (number) => {},
    tabIndex: 0,
  })

// ! no explicit component so that TabBar and TabContents can be placed whereever.
// export const TabView = (p: {
//   tabIcons: JSX.Element[]
//   tabContents: JSX.Element[]
// }) => {
//   const [tabIndex, setTabIndex] = useState(0)

//   if (p.tabContents.length != p.tabContents.length)
//     return (
//       <div>
//         <b>Error: </b> tabIcons and tabContents lenghts do
//         not match.
//       </div>
//     )

//   return (
//     <TabViewContext.Provider
//       value={{
//         tabIndex: tabIndex,
//         setTabIndex: (index: number) => setTabIndex(index),
//       }}
//     >
//       <TabBar></TabBar>
//       <TabContents></TabContents>
//     </TabViewContext.Provider>
//   )
// }

export const TabBar = (p: TabProps) => {
  const context = useContext(TabViewContext)

  return (
    <section className={cn(styles.tabs, p.className)}>
      {p.children.map((element, index) => {
        return (
          <div
            key={index}
            className={cn(
              styles.tabWrapper,
              context.tabIndex == index
                ? styles.visibleTabIcon
                : styles.invisibleTabIcon
            )}
            onClick={() => context.setTabIndex(index)}
          >
            {element}
          </div>
        )
      })}
    </section>
  )
}

export const TabContents = (p: TabProps) => {
  const context = useContext(TabViewContext)

  return (
    <section
      className={cn(styles.tabContents, p.className)}
    >
      {p.children.map((element, index) => {
        return (
          <div
            key={index}
            className={cn(
              styles.tabContentWrapper,
              index == context.tabIndex
                ? styles.visibleTab
                : styles.invisibleTab
            )}
          >
            {element}
          </div>
        )
      })}
    </section>
  )
}
