import React from "react";

const Youtube = ({ url }) => (
  <div className={"youtubediv"}>
    <iframe
      className={"youtubeiframe"}
      title="YoutubeIframe"
      src={`https://www.youtube.com/embed/` + url}
      frameBorder={`0`}
      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    ></iframe>
  </div>
);

export default Youtube;
