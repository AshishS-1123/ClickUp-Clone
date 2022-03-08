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
        {/* <GoogleFonts href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700;800;900&display=swap" /> */}
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
        {/* {
          GoogleFonts()
        } */}
      </Head>
      <Component {...pageProps} />
    </Provider>
  );
}
