module.exports = {
  siteMetadata: {
    siteUrl: "https://eternitywo.github.io",
    title: "eternitywo blog",
  },
  plugins: [
    "gatsby-plugin-image",
    "gatsby-plugin-sharp",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "Tech",
        path: `${__dirname}/blog_tech`,
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "Life",
        path: `${__dirname}/blog_life`,
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "Fun",
        path: `${__dirname}/blog_fun`,
      },
    },
    "gatsby-plugin-mdx",
  ],
};
