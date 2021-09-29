module.exports = {
  siteMetadata: {
    siteUrl: "https://eternitywo.github.io",
    title: "eternitywo blog",
  },
  plugins: [
    "gatsby-plugin-image",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "Tech",
        path: `${__dirname}/blog/tech`,
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "Life",
        path: `${__dirname}/blog/life`,
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "Fun",
        path: `${__dirname}/blog/fun`,
      },
    },
    "gatsby-plugin-mdx",
  ],
};
