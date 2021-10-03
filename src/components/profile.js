import * as React from "react";
import { StaticImage } from "gatsby-plugin-image";
import { isMobile } from "react-device-detect";

const ProfilePage = ({ data }) => {
  if (isMobile) {
    return null;
  }

  return (
    <div>
      <StaticImage
        className={"profileimage"}
        alt="Clifford, a reddish-brown pitbull, dozing in a bean bag chair"
        src="../images/profile.png"
      />
      <div className={"profiletitle"}>Dongho Seo</div>
      <div className={"profilesubtitle"}>Software Engineer</div>
    </div>
  );
};

export default ProfilePage;
