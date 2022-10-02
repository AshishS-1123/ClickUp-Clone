// eslint-disable-file react/prop-types
// eslint-disable-file react/jsx-props-no-spreading
import Head from "next/head";
import React from "react";
import { Provider } from "react-redux";

import store from "../redux/store";
import "../styles/global_styles.css";

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </Head>
      <Component {...pageProps} />
    </Provider>
  );
}
