require("dotenv").config({
  path: ".env",
});

module.exports = {
  siteMetadata: {
    siteUrl: "https://www.exegol.fi",
  },
  plugins: ["gatsby-plugin-postcss"],
};
