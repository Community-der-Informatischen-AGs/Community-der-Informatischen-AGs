import { NextPage } from "next"
import Link from "next/link"
import {
  Backpack,
  Clock,
  FlagCheckered,
  HandPalm,
  Handshake,
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
        title: "Foto von Vernetzungen",
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
        <p>
          <b>
            Im Folgenden genauere Erläuterungen zum Konzept:
          </b>
        </p>
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
            <TabIcon
              icon={
                <FlagCheckered size={32} weight="thin" />
              }
              text="Ziel"
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
                  {'Auf der Seite "Mitmachen"'}
                </Link>
              </p>
              <p>
                Die Schul-AGs halten wöchentliche Sitzungen
                (überwiegend online) auf unserem Discord
                Server. Sie entscheiden unter sich, welche
                Projekte bearbeitet werden und programmieren
                zusammen.
              </p>
            </section>
            <section>
              <h3>Kooperation zwischen Schulen</h3>
              <p>
                Zwischen den Schulen gibt es auch
                Kooperationsmöglichkeiten
              </p>
              <p>
                Die {KEYWORDS.nameAbbreviation} erlaubt
                beispielsweise das Mitmachen an AGs, die
                nicht von der eigenen Schule sind. So darf
                ein KOBI-Schüler die online-Sitzungen der
                Annette-Softwareentwicklung besuchen und an
                den Projekten mitwirken.
              </p>
              <p>
                Zudem legen wir zusammen auf
                Vollversammlungen zwischenschulische
                Projekte fest und lassen Arbeitsgruppen
                entstehen, die nicht gebunden an Schulen und
                AGs sind.
              </p>
            </section>
            <section>
              <h3>Bildungsangebote; Von SuS, Für SuS</h3>
              <p>
                Die {KEYWORDS.nameSeparate} schafft zudem
                auch Gelegenheiten für Externe, sich in der
                Informatik fortzubilden oder diese
                kennenzulernen.
              </p>
              <p>
                So bieten wir beispielsweise
                Programmier-Bootcamps nach dem {'"'}Von SuS
                für SuS{'"'}-Prinzip.
              </p>
              <p>
                Geplant sind auch Hackathons und diverse
                andere Events, die die
                Programmier-Kenntnisse auch von Externe
                stärkt.
              </p>
            </section>
            <section>
              <h3>Unsere Zielsetzung</h3>
              <p>
                Unser Ziel ist es, die Präsenz der
                Informatik und der Programmierung bei
                Jugendlichen zu stärken und ein Netzwerk und
                Umgebung für informatisch Interessierte
                aufzubauen.
              </p>
              <p>
                Dieses Ziel wollen wir erreichen, indem wir
                den Zugang zur Programmierung so einfach wie
                möglich durch Schul-AGs zu gestalten.
              </p>
            </section>
          </TabContents>
        </TabViewContext.Provider>
      </StandardPageTemplate.section>
      <StandardPageTemplate.section id={LINKS.philosophie}>
        <h2>Die Philosophie der Community</h2>
        <p>
          Unsere Community hält sich bei ihrer
          Vorgehensweise an einige grundlegende Prinzipien.
          Mit den folgenden Punkte zur Arbeitsphilosophie
          schaffen wir eine angenehme Kultur in der
          Community, die die Zusammenarbeit und den
          Fortschritt fördert:
        </p>
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
              text='"Eigentempo"'
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
              <p>
                Bei der {KEYWORDS.nameAbbreviation} wissen
                und verstehen wir, dass unsere Mitglieder
                SuS sind.
              </p>
              <p>
                Wir verstehen, dass die Schule (insbesondere
                in Klausuphasen) oft in Verbindung mit
                Stress stehen. Dementsprechend ist für uns
                wichtig, dass alle SuS sich im{" "}
                <b>eigenen Tempo</b> fortbilden und das
                Engagement für die Community vollbringen
                kann.
              </p>
              <p>
                Das Konzept basiert auf lockeres Engagement.
                Es besteht also keinen Zwang-Verpflichtungen
                außer bei der Teilnahme bei den AGs.
              </p>
            </section>
            <section>
              <h3>Neutralität und Objektivität</h3>
              <p>
                Bei unserer Gemeinschaft versuchen wir uns
                von allzu persönlichen Ansichten
                (beispielsweise im Bereich der Politik) und
                Meinungen fernzuhalten. Wir wollen damit
                eine ruhige und neutrale Haltung gegenüber
                anderen Mitgliedern und AGs.
              </p>
              <p>
                <b>
                  Das heißt nicht, dass man sich nicht über
                  das Verhalten einzelner Mitglieder
                  beschweren darf. Das bedeutet nur, dass
                  persönliche Konflikte, die außerhalb des
                  Projekts entstehen, nicht für die
                  Besprechungen herangezogen werden sollten.
                </b>
              </p>
              <p>
                <b>
                  Das heißt auch, dass wir die innere Ruhe
                  und objektive Diskussionen anregen wollen.
                </b>
              </p>
              <p>
                Falls es Konflikte geben sollte, so äußern
                wir unsere Bedenken konstruktiv und
                objektiv.
              </p>
              <p>
                Wir wollen damit auch eine lockere
                Atmosphäre fördern.
              </p>
            </section>
            <section>
              <h3>Respekt und Vertrauen</h3>
              <p>
                Gelungene Kooperation kann nicht
                zustandekommen, ohne dass es Vertrauen und
                Respekt zwischen allen Teilen der Community
                besteht.
              </p>
              <ol className={styles.orderedList}>
                <li>
                  Es geht nicht um Wettbewerb. Die AGs
                  wirken zusammen, nicht entgegen einander.
                  Keine AG oder Person muss besser als eine
                  andere AG oder Person sein.
                </li>
                <li>
                  Wir gehen immer von einer anfänglichen
                  Vertrauenslage aus. Wir zweifeln also
                  nicht sofort die Fähigkeiten der Person /
                  AG an.
                </li>
                <li>
                  Wir bestehen auf konstruktive Kritik. Der
                  Begriff konstruktive Kritik wird allzu oft
                  willkürlich verwendet. Bei uns hat der
                  Begriff aber eine genauere Bedeutung:{" "}
                  <b>
                    Wir attackieren nicht die Person. Wir
                    attackieren die Problemstellung.
                    Gemeinsam.
                  </b>
                </li>
              </ol>
            </section>
          </TabContents>
        </TabViewContext.Provider>
      </StandardPageTemplate.section>
    </StandardPageTemplate>
  )
}

export default About
