import Head from 'next/head';
import React from 'react';
import { GoogleFonts } from 'nextjs-google-fonts/GoogleFonts';
import { Provider } from 'react-redux';

import store from '../redux/store';
import '../styles/global_styles.css';

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;900&display=swap" rel="stylesheet" />
        {/* <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        /> */}
        {
          GoogleFonts()
        }
      </Head>
      <Component {...pageProps} />
    </Provider>
  );
}
