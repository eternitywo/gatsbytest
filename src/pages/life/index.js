import * as React from "react";
import { graphql } from "gatsby";
import Layout from "../../components/layout";
import PostItem from "../../components/postitem";

const BlogPage = ({ data }) => {
  return (
    <Layout pageTitle="My Blog Posts">
      <div>
        <div className="underlinepost">Posts...</div>
        {data.allMdx.nodes.map((node) => (
          <article key={node.id}>
            <PostItem slug={node.slug} nfm={node.frontmatter}></PostItem>
          </article>
        ))}
      </div>
    </Layout>
  );
};

export const query = graphql`
  query {
    allMdx(
      sort: { order: DESC, fields: frontmatter___date }
      filter: { frontmatter: { category: { eq: "Life" } } }
    ) {
      nodes {
        parent {
          ... on File {
            sourceInstanceName
            name
          }
        }
        frontmatter {
          category
          tags
          title
          description
          date(formatString: "MMMM D, YYYY")
          hero_image {
            absolutePath
            childImageSharp {
              fluid {
                src
              }
            }
          }
        }
        id
        slug
      }
    }
  }
`;

export default BlogPage;
