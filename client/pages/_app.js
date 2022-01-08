import Head from "next/head";
import React from "react";
import { GoogleFonts } from "nextjs-google-fonts/GoogleFonts";
import '../styles/global_styles.css'

export default function App({ Component, pageProps }) {
  return (
    <React.Fragment>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;900&display=swap" rel="stylesheet" />
        {
          GoogleFonts()
        }
      </Head>
      <Component {...pageProps} />
    </React.Fragment>
  )
}
