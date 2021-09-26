import * as React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";

const BlogPage = ({ data }) => {
  return (
    <Layout pageTitle="My Blog Posts">
      <div>
        <ul>
          {data.allFile.nodes.map((node) => (
            <li key={node.name}>
              <p></p>
              <p>
                {node.sourceInstanceName} | {node.birthtime} | {node.ctime}
              </p>
              {node.name}
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  );
};

export const query = graphql`
  query {
    allFile {
      nodes {
        sourceInstanceName
        birthtime
        ctime
        name
      }
    }
  }
`;

export default BlogPage;
