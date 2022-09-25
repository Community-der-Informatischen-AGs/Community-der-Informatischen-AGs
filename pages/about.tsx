import { NextPage } from "next"
import Link from "next/link"
import {
  Backpack,
  Clock,
  HandPalm,
  Handshake,
  House,
  Notebook,
  UsersFour,
} from "phosphor-react"
import { useState } from "react"
import {
  StandardPageTemplate,
  TabBar,
  TabContents,
  TabViewContext,
} from "../components"
import { KEYWORDS, LINKS } from "../lib/utils/constants"

import styles from "./../styles/about/about.module.scss"

const TabIcon = (p: {
  icon: JSX.Element
  text: string
}) => {
  return (
    <div className={styles.tabIcon}>
      {p.icon}
      <h6 className={styles.tabLabel}>{p.text}</h6>
    </div>
  )
}

const About: NextPage = () => {
  const [conceptTabIndex, setConceptTabIndex] = useState(0)
  const [philosophyTabIndex, setPhilosophyTabIndex] =
    useState(0)

  return (
    <StandardPageTemplate
      heading="Über uns"
      titleIndex={2}
      titleSentence={["Über", "die", KEYWORDS.nameSeparate]}
      metaDescription={
        "Auf dieser Seite findest Du allgemeine Informationen zu der Community der Informatischen AGs"
      }
      codeSnippet={`
        render() {

          let routes = [];
          for (let post of this.context.posts) {
            let PostComponent = post[0];
            let postLink = post[1];
      
            routes.push(<Route key={postLink} path={postLink} element={<PostComponent type="page"></PostComponent>} ></Route>);
      
          }
      
          return (
            <Routes location={this.props.location}>
              <Route path="/" element={<Home />} />
              <Route path="/aktuelles" element={<Aktuelles />} />
              <Route path="/mach-mit" element={<MachMit />} />
              <Route path="/contact" element={<Kontakt />} />
              
              { routes }
      
              <Route path="*" element={<Page404 />}></Route> 
            </Routes>
          ); 
        }`}
      image={{
        url: "/assets/images/home/philosophy3.jpg",
        width: 3456,
        height: 2304,
        title: "image",
      }}
    >
      <StandardPageTemplate.section id={LINKS.konzept}>
        <h2>Das Konzept der Community</h2>
        <p>
          Die Community kann als Zusammenschluss mehrerer,
          informatischer, Schul-AGs aufgefasst werden. Diese
          AGs arbeiten untereinander an selbst bestimmte
          Projekte und kooperieren auch miteinander.
        </p>
        <p>
          Die hauptsächliche Arbeit geschieht zuhause;
          online auf einem Discord Server.{" "}
        </p>
        <p>
          Wir setzen uns das Ziel, eine Umgebung für junge
          Programmierer zu schaffen, in der sie sich mit
          anderen Programmierern beschäftigen und ihre
          Horizonten erweitern können.
        </p>
        <b>Zusammen schafft man einfach mehr.</b>
        <TabViewContext.Provider
          value={{
            tabIndex: conceptTabIndex,
            setTabIndex: (index: number) =>
              setConceptTabIndex(index),
          }}
        >
          <TabBar className={styles.tabBar}>
            <TabIcon
              icon={<Backpack size={32} weight="thin" />}
              text="AGs"
            />
            <TabIcon
              icon={<UsersFour size={32} weight="thin" />}
              text="Kooperation"
            />
            <TabIcon
              icon={<Notebook size={32} weight="thin" />}
              text="Bildung"
            />
          </TabBar>
          <TabContents>
            <section>
              <h3>Software AGs an Schulen</h3>
              <p>
                Die {KEYWORDS.nameSeparate} hilft bei der
                Gründung und Leitung von Software AGs an
                diversen Schulen mit. Sie unterstützt die
                AGs mit Rat, vorschläge und freiwillige
                Programme.
              </p>
              <p>
                Wir nehmen außerdem auch schon bestehende
                AGs an Schulen auf.
              </p>
              <p>
                Genauere Informationen:{" "}
                <Link href={LINKS.mitmachen}>
                  Auf der Seite "Mitmachen"
                </Link>
              </p>
              <p>
                Die Schul-AGs halten wöchentliche online
                Sitzungen auf unserem Discord Server. Sie
                entscheiden unter sich, welche Projekte
                bearbeitet werden und programmieren
                zusammen.
              </p>
            </section>
            <section>
              <h3>Kooperation zwischen Schulen</h3>
              <p>
                Zwischen den Schulen gibt es auch
                Kooperationsmöglichkeiten
              </p>
            </section>
            <section>
              <h3>Bildungsangebote; Von SuS, Für SuS</h3>
            </section>
          </TabContents>
        </TabViewContext.Provider>
      </StandardPageTemplate.section>
      <StandardPageTemplate.section id={LINKS.philosophie}>
        <h2>Die Philosophie der Community</h2>
        <TabViewContext.Provider
          value={{
            tabIndex: philosophyTabIndex,
            setTabIndex: (index: number) =>
              setPhilosophyTabIndex(index),
          }}
        >
          <TabBar className={styles.tabBar}>
            <TabIcon
              icon={<Clock size={32} weight="thin" />}
              text="Tempo"
            />
            <TabIcon
              icon={<HandPalm size={32} weight="thin" />}
              text="Neutralität"
            />
            <TabIcon
              icon={<Handshake size={32} weight="thin" />}
              text="Vertrauen"
            />
          </TabBar>
          <TabContents>
            <section>
              <h3>Das eigene Tempo</h3>
            </section>
            <section>
              <h3>Neutralität und Objektivität</h3>
            </section>
            <section>
              <h3>Respekt und Vertrauen</h3>
            </section>
          </TabContents>
        </TabViewContext.Provider>
      </StandardPageTemplate.section>
    </StandardPageTemplate>
  )
}
export default About
