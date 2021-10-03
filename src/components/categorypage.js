import * as React from "react";
import _ from "lodash";
// import { useState, useEffect } from "react";
// import { Link, graphql, useStaticQuery } from "gatsby";
import { Link } from "gatsby";
import { isMobile } from "react-device-detect";

const getCategory = ({ children }, level) => {
  if (children === undefined) return "";
  const keyList = Object.keys(children);
  const keyData = [];

  for (let i = 0; i < keyList.length; i++) {
    const keyValue = keyList[i];
    if (keyValue === "dataCount") continue;
    keyData.push(children[keyValue]);
  }

  // console.log("children", children);
  // console.log("keyList", keyList);
  // console.log("keyData", keyData);

  return (
    <div>
      {keyData.map((keyDataItem) => {
        const childCategory = getCategory(keyDataItem, level + 1);
        return (
          <div key={keyDataItem.dataName} className={"categorycontainer"}>
            <div className={"categorycontainer" + level}>
              {" - "}{" "}
              <Link
                to={`/tags/${_.kebabCase(keyDataItem.dataName)}/`}
                className={"categorylisttext"}
              >
                {keyDataItem.dataName} ({keyDataItem.dataCount})
              </Link>
              {childCategory}
            </div>
          </div>
        );
      })}
    </div>
  );
};

const CategoryPage = ({ data }) => {
  if (isMobile) {
    return null;
  }

  const treeDatas = getCategory(data, 0);

  return (
    <div>
      <p style={{ color: "grey" }}>Category ({data.dataCount}) </p>
      {treeDatas}
    </div>
  );
};

export default CategoryPage;
