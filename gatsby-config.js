module.exports = {
  siteMetadata: {
    siteUrl: "https://eternitywo.github.io",
    title: "eternitywo blog",
    subtitle: "기억을 연장하기 위한 블로그",
  },
  plugins: [
    "gatsby-plugin-mdx",
    "gatsby-plugin-image",
    // `gatsby-remark-images`,
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    `gatsby-plugin-react-helmet`,
    "gatsby-plugin-sitemap",
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
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-prismjs`,
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`,
      },
    },
  ],
};
