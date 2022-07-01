import Link from "next/link";

import styles from "./navigation.module.css";

export const Navigation = () => {

  return <nav className={styles.navigation}>
    <ul>
      <li><Link href={"/mitmachen"}>Mitmachen</Link></li> { /* Contact form for applications */ }
      <li><Link href={"/ueber-uns"}>Über Uns</Link></li> { /* only information about the concept, abstract, with personal message from me */ }
      <li><Link href={"/gemeinschaft"}>Die Gemeinschaft</Link></li> { /* information about specific members and schools */ }
      <li><Link href={"/arbeit"}>Unsere Arbeit</Link></li> { /* Project Posts */ }
      <li><Link href={"/blog"}>Blog</Link></li> { /* Blog Posts */ }
      <li><Link href={"/kontakt"}>Kontakt</Link></li> { /* Social Media, Links, Maps mit Schulen, Emails, etc. */ }
    </ul>
  </nav>;

}

