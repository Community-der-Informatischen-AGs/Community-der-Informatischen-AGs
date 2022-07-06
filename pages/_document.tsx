import { Html, Head, Main, NextScript } from "next/document";

// TODO: Google verification and seo stuff

export default function Document() {

  return (
    <Html lang="de">
      <Head>
        <link rel="shortcut icon" href="/favicon.ico"></link>
        <meta charSet="utf-8" />
        <link rel="icon" href="/assets/svgs/jugend_entwickelt_digital_v_1_0_white.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />    
        <meta httpEquiv="X-UA-Compatible" content="ie=edge"></meta>
        <meta name="theme-color" content="#000000" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );

}