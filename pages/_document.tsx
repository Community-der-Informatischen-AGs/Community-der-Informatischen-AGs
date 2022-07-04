import { Html, Head, Main, NextScript } from "next/document";

// TODO: Google verification and seo stuff

export default function Document() {

  return (
    <Html lang="de">
      <Head>
        <link rel="shortcut icon" href="/favicon.ico"></link>
        <meta charSet="utf-8" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />    
        <meta http-equiv="X-UA-Compatible" content="ie=edge"></meta>
        <meta name="theme-color" content="#000000" />
        <meta
          name="description"
          content="Die Webseite des Jugend-Entwickelt-Software-Projekts"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );

}