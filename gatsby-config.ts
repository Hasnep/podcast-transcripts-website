import type { GatsbyConfig } from "gatsby";

const config: GatsbyConfig = {
  siteMetadata: {
    title: "Podcast Transcripts",
    siteUrl: "https://www.podcast-transcripts.github.io",
  },
  // graphqlTypegen: true,
  plugins: [
    "gatsby-plugin-sass",
    "gatsby-transformer-json",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "podcast-transcripts",
        path: `${__dirname}/data/podcast-transcripts.json`,
      },
    },
    "gatsby-plugin-no-javascript-utils",
  ],
};

export default config;
