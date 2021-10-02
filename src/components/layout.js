import * as React from "react";
import { useState, useEffect } from "react";
import debounce from "lodash/debounce";
import { Link, graphql, useStaticQuery } from "gatsby";
import { isMobile } from "react-device-detect";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import {
  container,
  blogContentDefault,
  // blogContentWide,
  blogContentMobile,
  navLinkText,
  siteTitle,
  siteSubtitle,
} from "./layout.module.css";

import "./layout.css";

//#region  useScroll()
function useScroll() {
  const [scrollY, setScrollY] = useState(0);

  const listener = () => {
    setScrollY(window.pageYOffset);
  };

  const delay = 15;

  useEffect(() => {
    window.addEventListener("scroll", debounce(listener, delay), {
      passive: true,
    });
    return () => window.removeEventListener("scroll", listener);
  });

  return {
    scrollY,
  };
}

// function useScroll() {
//   const [lastScrollTop, setLastScrollTop] = useState(0);
//   const [bodyOffset, setBodyOffset] = useState(
//     document.body.getBoundingClientRect()
//   );
//   const [scrollY, setScrollY] = useState(bodyOffset.top);
//   const [scrollX, setScrollX] = useState(bodyOffset.left);
//   const [scrollDirection, setScrollDirection] = useState();

//   const listener = (e) => {
//     setBodyOffset(document.body.getBoundingClientRect());
//     setScrollY(-bodyOffset.top);
//     setScrollX(bodyOffset.left);
//     setScrollDirection(lastScrollTop > -bodyOffset.top ? "down" : "up");
//     setLastScrollTop(-bodyOffset.top);
//   };

//   useEffect(() => {
//     window.addEventListener("scroll", listener);
//     return () => {
//       window.removeEventListener("scroll", listener);
//     };
//   });

//   return {
//     scrollY,
//     scrollX,
//     scrollDirection,
//   };
// }
//#endregion

const Layout = ({ pageTitle, children }) => {
  const subtitle = `기억을 연장하기 위한 블로그`;
  const [toggleButton, setToggleButton] = useState(false);
  const { scrollY } = useScroll();

  //console.log("isMobile? ", isMobile, toggleButton, scrollY);

  // destructuring : this is same with (props) => { const pageTitle = props.pageTitle; const children = props.children;}
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  const dropshadow = {
    boxShadow: "0px 0px 9px 3px rgba(41, 41, 41, 0.25)",
  };

  return (
    <div className={container}>
      <div className={"header"} style={scrollY > 70 ? dropshadow : {}}>
        <title>
          {pageTitle} | {data.site.siteMetadata.title}
        </title>
        <nav className={"navbar"}>
          <div className={"dummy"} />
          <div className={"navbarlogo"}>
            <Link to="/">
              <header className={siteTitle}>
                {data.site.siteMetadata.title}
              </header>
            </Link>
            <header className={siteSubtitle}>{subtitle}</header>
          </div>
          <div className={"dummy"} />
          <div className={"dummy"} />
          <ul
            className={
              "navbarmenu" + (toggleButton && scrollY < 40 ? " active" : "")
            }
          >
            <li>
              <Link to="/tech" className={navLinkText}>
                Tech
              </Link>
            </li>
            <li>
              <Link to="/life" className={navLinkText}>
                Life
              </Link>
            </li>
            <li>
              <Link to="/fun" className={navLinkText}>
                Fun
              </Link>
            </li>
            <li>
              <Link to="/about" className={navLinkText}>
                About
              </Link>
            </li>
          </ul>
          <button
            className={"navbartoggle"}
            style={{ border: 0, backgroundColor: "white" }}
            onClick={() => {
              setToggleButton(!toggleButton);
            }}
          >
            <FontAwesomeIcon icon={toggleButton ? faTimes : faBars} />
          </button>
          <div className={"dummy"} />
        </nav>
      </div>
      <div className={"blogtopdummy"}></div>
      <div className={isMobile ? blogContentMobile : blogContentDefault}>
        <main>
          {/* <h3 className={heading}>{pageTitle}</h3> */}
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
