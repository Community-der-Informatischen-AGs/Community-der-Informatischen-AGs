import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {

  return (
    <Html lang="de">
      <Head>
        <link rel="shortcut icon" href="/favicon.ico"></link>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );

}