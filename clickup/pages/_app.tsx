import React from 'react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import theme from '../themes/mui-theme';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>,
      <CssBaseline>
        <Component {...pageProps} />
      </CssBaseline>
    </ThemeProvider>
  );
}

export default MyApp
