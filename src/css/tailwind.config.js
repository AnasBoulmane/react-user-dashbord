const plugin = require('tailwindcss/plugin');
const forms = require("@tailwindcss/forms");

module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  plugins: [forms],
};
