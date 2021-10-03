import * as React from "react";
import { useState } from "react";
import { Link } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";
import _ from "lodash";
import "./postitem.css";

const GetTagLinks = ({ tags }) => {
  return (
    <div className={"taglist"}>
      {tags.map((tag) => (
        <Link key={tag} to={`/tags/${_.kebabCase(tag)}/`}>
          <div className={"posttags"}>#{tag}</div>
        </Link>
      ))}
    </div>
  );
};

const PostItem = ({ slug, nfm }) => {
  const { title, description, date, tags, hero_image } = nfm;
  const dateValues = date.split(",")[0].split(" ");
  const [toggleDateBox, setToggleDateBox] = useState(true);

  return (
    <>
      <div
        role={"button"}
        tabIndex={"0"}
        className={"postbox"}
        onMouseLeave={() => {
          setToggleDateBox(true);
        }}
        onMouseMove={() => {
          setToggleDateBox(false);
        }}
      >
        <div style={{ position: "relative" }}>
          <div className={"postimageblock"}>
            <GatsbyImage
              image={hero_image.childImageSharp.gatsbyImageData}
              className={"postimage"}
              alt="11111123114w=sfiehfisaf-easfasef"
            />
          </div>
          <div
            className={
              toggleDateBox ? "postdateblocktext" : "postdateblocktextshow"
            }
          >
            <div className={"postdateday"}>{dateValues[1]}</div>
            <div className={"postdatemonth"}>{dateValues[0]}</div>
          </div>
        </div>
        <div className={"postinfo"}>
          <GetTagLinks tags={tags}></GetTagLinks>
          <Link to={`/tech/${slug}`}>
            <div className={"posttitle"}>{title}</div>
          </Link>
          <div className={"postdescription"}>{description}</div>
          <Link to={`/tech/${slug}`}>
            <div className={"readmore"}>Read More</div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default PostItem;
