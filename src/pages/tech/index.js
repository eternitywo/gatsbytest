import * as React from "react";
import { graphql } from "gatsby";
import Layout from "../../components/layout";
import PostItem from "../../components/postitem";

const BlogPage = ({ data }) => {
  let cnt = 1;
  return (
    <Layout pageTitle="Tech">
      <div>
        <div className="underlinepost">Recent Posts</div>
        {data.allMdx.nodes.map((node) => (
          <article key={node.id + cnt++}>
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
      filter: { frontmatter: { category: { eq: "Tech" } } }
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
