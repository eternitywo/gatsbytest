import React from "react";
import PropTypes from "prop-types";
// import { useState } from "react";
import { graphql } from "gatsby";
import Layout from "../../components/layout";
import PostItem from "../../components/postitem";

const Tags = ({ pageContext, data }) => {
  const { tag } = pageContext;
  const { edges, totalCount } = data.allMdx;
  const tagHeader = `${totalCount} post${
    totalCount === 1 ? "" : "s"
  } tagged with "${tag}"`;

  const nodes = [];

  for (let i = 0; i < edges.length; i++) {
    const { id, slug, frontmatter } = edges[i].node;
    nodes.push({ id, slug, nfm: frontmatter });
  }

  return (
    <div>
      <Layout pageTitle="Fun">
        <div>
          <div className="underlinepost">{tagHeader}</div>
          {nodes.map((node) => (
            <article key={node.id}>
              <PostItem slug={node.slug} nfm={node.nfm}></PostItem>
            </article>
          ))}
        </div>
      </Layout>
    </div>
  );
};
Tags.propTypes = {
  pageContext: PropTypes.shape({
    tag: PropTypes.string.isRequired,
  }),
  data: PropTypes.shape({
    allMdx: PropTypes.shape({
      totalCount: PropTypes.number.isRequired,
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: PropTypes.shape({
            frontmatter: PropTypes.shape({
              title: PropTypes.string.isRequired,
            }),
            fields: PropTypes.shape({
              slug: PropTypes.string.isRequired,
            }),
          }),
        }).isRequired
      ),
    }),
  }),
};
export default Tags;
export const pageQuery = graphql`
  query ($tag: String) {
    allMdx(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      edges {
        node {
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
  }
`;
