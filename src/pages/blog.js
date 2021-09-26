import * as React from "react";
import { graphql } from "gatsby";
import { MDXRenderer } from "gatsby-plugin-mdx";
import Layout from "../components/layout";

const BlogPage = ({ data }) => {
  return (
    <Layout pageTitle="My Blog Posts">
      <div>
        {data.allMdx.nodes.map((node) => (
          <article key={node.id}>
            <p></p>
            <p>
              {node.parent.sourceInstanceName} | {node.parent.name}
            </p>
            <h2>{node.frontmatter.title}</h2>
            <p>Posted : {node.frontmatter.date}</p>
            <MDXRenderer>{node.body}</MDXRenderer>
          </article>
        ))}
      </div>
    </Layout>
  );
};

export const query = graphql`
  query {
    allMdx(sort: { order: DESC, fields: frontmatter___date }) {
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
          date(formatString: "MMMM D, YYYY")
        }
        id
        body
      }
    }
  }
`;

export default BlogPage;
