import * as React from "react";
import { Link } from "gatsby";
import _ from "lodash";

const GetTagLinks = ({ tags }) => {
  return (
    <div className={"posttaglist"}>
      {tags.map((tag) => (
        <Link key={tag} to={`/tags/${_.kebabCase(tag)}/`}>
          <div className={"posttags"}>#{tag}</div>
        </Link>
      ))}
    </div>
  );
};

export default GetTagLinks;
