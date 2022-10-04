require("dotenv").config({
  path: ".env",
});

module.exports = {
  siteMetadata: {
    siteUrl: "https://www.exegol.fi",
  },
  plugins: [
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Exegol Finance`,
        short_name: `Exegol`,
        start_url: `/`,
        background_color: `#f7f7f2`,
        theme_color: `#f7f7f2`,
        display: `minimal-ui`,
        icon: `src/images/favicon.png`, // This path is relative to the root of the site.
      },
    },
    "gatsby-plugin-postcss",
  ],
};
