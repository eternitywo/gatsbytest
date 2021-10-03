import * as React from "react";
import { Link, graphql, useStaticQuery } from "gatsby";
import _ from "lodash";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCoffee,
  faArrowAltCircleLeft,
  faArrowAltCircleRight,
} from "@fortawesome/free-solid-svg-icons";

const PostPrevNext = ({ slug }) => {
  const searchList = useStaticQuery(graphql`
    query {
      allMdx {
        edges {
          node {
            slug
          }
          next {
            slug
            frontmatter {
              title
              description
            }
          }
          previous {
            slug
            frontmatter {
              title
              description
            }
          }
        }
      }
    }
  `);

  let searchItem = searchList.allMdx.edges[0];

  for (let index = 0; index < searchList.allMdx.edges.length; index++) {
    const element = searchList.allMdx.edges[index];
    if (slug === element.node.slug) {
      searchItem = element;
    }
  }

  // const searchItem = searchList.allMdx.edges.filter(
  //   (item) => item.node.slug === slug
  // );

  return (
    <div>
      <div style={{ height: "100px" }}></div>
      <div className={"postprevnext"}>
        <div className={"postprev"}>
          <div>Prev Post</div>
          <div className={"postprevnexttitle"}>
            {" "}
            <FontAwesomeIcon
              icon={faArrowAltCircleLeft}
              style={{
                "margin-top": "1rem",
                "margin-right": "0.5rem",
                "padding-top": "0.1rem",
              }}
            />
            {searchItem.next ? searchItem.next.frontmatter.title : ""}
          </div>
          <div>
            {searchItem.next ? searchItem.next.frontmatter.description : ""}
          </div>
        </div>
        <div className={"postnext"}>
          <div>Next Post</div>
          <div className={"postprevnexttitle"}>
            {searchItem.previous ? searchItem.previous.frontmatter.title : ""}{" "}
            <FontAwesomeIcon
              icon={faArrowAltCircleRight}
              style={{
                "margin-top": "1rem",
                "margin-left": "0.5rem",
                "padding-top": "0.1rem",
              }}
            />
          </div>
          <div>
            {searchItem.previous
              ? searchItem.previous.frontmatter.description
              : ""}
          </div>
        </div>
      </div>
      <div style={{ height: "400px" }}></div>
    </div>
  );
};

export default PostPrevNext;
