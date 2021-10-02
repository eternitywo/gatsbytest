module.exports = {
  siteMetadata: {
    siteUrl: "https://eternitywo.github.io",
    title: "eternitywo blog",
    subtitle: "기억을 연장하기 위한 블로그",
  },
  plugins: [
    "gatsby-plugin-image",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    `gatsby-transformer-remark`,
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        // Footnotes mode (default: true)
        footnotes: true,
        // GitHub Flavored Markdown mode (default: true)
        gfm: true,
        // Plugins configs
        plugins: [],
      },
    },
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
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-prismjs`,
          },
          {
            resolve: `gatsby-remark-images`,
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
    "gatsby-plugin-sitemap",
  ],
};
