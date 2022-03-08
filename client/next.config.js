const { withGoogleFonts } = require('nextjs-google-fonts');

module.exports = withGoogleFonts({
  googleFonts: {
    fonts: [
      'https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700;800;900&display=swap',
    ],
  },
});
