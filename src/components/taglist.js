import * as React from "react";
import _ from "lodash";
// import { useState, useEffect } from "react";
// import { Link, graphql, useStaticQuery } from "gatsby";
import { Link } from "gatsby";
import { isMobile } from "react-device-detect";

const TagPage = ({ data }) => {
  if (isMobile) {
    return null;
  }

  return (
    <div>
      <p style={{ color: "grey" }}>Tags</p>
      {data.allMdx.group.map((tagValue) => {
        return (
          <div key={tagValue.tag} className={"tagcontainer"}>
            <Link
              to={`/tags/${_.kebabCase(tagValue.tag)}/`}
              className={"taglisttext"}
            >
              # {tagValue.tag} ({tagValue.totalCount})
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default TagPage;
