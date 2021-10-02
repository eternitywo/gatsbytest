import React from "react";

const Youtube = ({ url, width, height }) => (
  <div style={{ textAlign: "center", padding: "1rem", width: "100%" }}>
    <iframe
      title="YoutubeIframe"
      width={width | 900}
      height={height | 493}
      src={`https://www.youtube.com/embed/` + url}
      frameBorder={`0`}
      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    ></iframe>
  </div>
);

export default Youtube;
