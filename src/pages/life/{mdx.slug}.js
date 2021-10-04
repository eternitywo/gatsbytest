import * as React from "react";
import { graphql } from "gatsby";
import { MDXRenderer } from "gatsby-plugin-mdx";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import GetTagLinks from "../../components/posttags";
import PostPrevNext from "../../components/postprevnext";
import Layout from "../../components/layout";

const BlogPost = ({ data }) => {
  const image = getImage(data.mdx.frontmatter.hero_image);
  return (
    <Layout pageTitle={data.mdx.frontmatter.title}>
      <header className="posttitle underlinetitle">
        {data.mdx.frontmatter.title}
      </header>
      <p>{data.mdx.frontmatter.date}</p>
      <GatsbyImage
        image={image}
        alt={data.mdx.frontmatter.hero_image_alt}
      ></GatsbyImage>
      <p></p>
      <MDXRenderer>{data.mdx.body}</MDXRenderer>
      <div className="posttagspace"></div>
      <GetTagLinks tags={data.mdx.frontmatter.tags}></GetTagLinks>
      <div className="posttagspace"></div>

      <div className="prevnext">
        <PostPrevNext slug={data}></PostPrevNext>
      </div>
    </Layout>
  );
};

export const query = graphql`
  query ($id: String) {
    mdx(id: { eq: $id }) {
      slug
      frontmatter {
        title
        tags
        date(formatString: "MMMM D, YYYY")
        hero_image_alt
        hero_image_credit_link
        hero_image_credit_text
        hero_image {
          childImageSharp {
            gatsbyImageData
          }
        }
      }
      body
    }
  }
`;

export default BlogPost;
