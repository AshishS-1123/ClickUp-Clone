import { Shadows, createTheme } from "@mui/material";

const theme = createTheme({
  typography: {
    fontFamily: 'Montserrat',
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        @font-face {
          font-family: 'Montserrat';
        }
        * {
          font-size: 14px;
        }
      `,
    },
  },
  palette: {
    primary: {
      main: '#6B4EFF',
    },
    secondary: {
      main: '#ffffff',
    },
  },
  shadows: Array(25).fill("none") as Shadows,
});

export default theme;