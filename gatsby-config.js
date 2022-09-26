require("dotenv").config({
  path: ".env",
});

module.exports = {
  siteMetadata: {
    siteUrl: "https://www.theaerarium.fi",
  },
  plugins: ["gatsby-plugin-postcss"],
};
