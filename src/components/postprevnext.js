import * as React from "react";
import { Link, graphql, useStaticQuery } from "gatsby";
import _ from "lodash";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
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
            frontmatter {
              title
              description
              category
            }
          }
          next {
            slug
            frontmatter {
              title
              description
              category
            }
          }
          previous {
            slug
            frontmatter {
              title
              description
              category
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
      searchItem = { node: { slug: element.node.slug } };

      const defaultNext = {
        slug: slug,
        frontmatter: {
          title: "Coming Soon!",
          description: "언젠가는 또 글을 씁니다.",
          category: element.node.frontmatter.category,
        },
      };

      const defaultPrev = {
        slug: slug,
        frontmatter: {
          title: "블로그를 정복하셨습니다.",
          description: "이 글이 첫번째 글입니다.",
          category: element.node.frontmatter.category,
        },
      };

      searchItem["next"] = element.next ? element.next : defaultNext;
      searchItem["previous"] = element.previous
        ? element.previous
        : defaultPrev;
    }
  }

  return (
    <div>
      <hr></hr>
      <div style={{ height: "100px" }}></div>
      <div className={"postprevnext"}>
        <div className={"postprev"}>
          <div>Prev Post</div>
          <div className={"postprevnexttitle"}>
            <Link
              to={`/${_.kebabCase(searchItem.previous.frontmatter.category)}/${
                searchItem.previous.slug
              }`}
              className={"postprevnexttitle"}
            >
              <FontAwesomeIcon
                icon={faArrowAltCircleLeft}
                style={{
                  "margin-top": "1rem",
                  "margin-right": "0.5rem",
                  "padding-top": "0.1rem",
                }}
              ></FontAwesomeIcon>
              {searchItem.previous ? searchItem.previous.frontmatter.title : ""}
            </Link>
          </div>
          <div>
            {searchItem.previous
              ? searchItem.previous.frontmatter.description
              : ""}
          </div>
        </div>
        <div className={"postnext"}>
          <div>Next Post</div>
          <div className={"postprevnexttitle"}>
            <Link
              to={`/${_.kebabCase(searchItem.next.frontmatter.category)}/${
                searchItem.next.slug
              }`}
              className={"postprevnexttitle"}
            >
              {searchItem.next ? searchItem.next.frontmatter.title : ""}
              <FontAwesomeIcon
                icon={faArrowAltCircleRight}
                style={{
                  "margin-top": "1rem",
                  "margin-left": "0.5rem",
                  "padding-top": "0.1rem",
                }}
              ></FontAwesomeIcon>
            </Link>
          </div>
          <div>
            {searchItem.next ? searchItem.next.frontmatter.description : ""}
          </div>
        </div>
      </div>
      <div style={{ height: "100px" }}></div>
      <hr></hr>
    </div>
  );
};

export default PostPrevNext;
