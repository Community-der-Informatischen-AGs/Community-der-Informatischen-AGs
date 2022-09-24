interface TabData {
  tabIcon: JSX.Element
  tabContent: JSX.Element | JSX.Element[]
}

interface TabViewComponentProps {
  tabs: TabData[]
}

export const TabViewComponent = (
  p: TabViewComponentProps
) => {
  return <section></section>
}
