import * as React from "react";
import { graphql } from "gatsby";
import Layout from "../../components/layout";
import PostItem from "../../components/postitem";

const BlogPage = ({ data }) => {
  return (
    <Layout pageTitle="Fun">
      <div>
        <div className="underlinepost">Recent Posts</div>
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
      filter: { frontmatter: { category: { eq: "Fun" } } }
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
            childImageSharp {
              gatsbyImageData(layout: FULL_WIDTH)
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
