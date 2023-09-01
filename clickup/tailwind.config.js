/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      // purple: '#7b68ee',
      // white: '#fff',

      // Black
      inkDarkest: '#090A0A',
      inkDarker: '#202325',
      inkDark: '#303437',
      inkBase: '#404446',
      inkLight: '#6C7072',
      inkLighter: '#72777A',

      // White
      skyDark: '#979C9E',
      skyBase: '#CDCFD0',
      skyLight: '#E3E4E5',
      skyLighter: '#F2F4F5',
      skyLightest: '#F7F9FA',

      // Purple
      purpleDark: '#5538EE',
      purpleBase: '#6B4EFF',
      purpleLight: '#9990FF',
      purpleLighter: '#C6C4FF',
      purpleLightest: '#E7E7FF',
    },
    fontFamily: {
      sans: '"Montserrat", -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif',
    }
  },
  plugins: [],
}

