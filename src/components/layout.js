import * as React from "react";
import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import debounce from "lodash/debounce";
import { Link, graphql, useStaticQuery } from "gatsby";
import { isMobile } from "react-device-detect";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoffee, faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import {
  container,
  blogContentDefault,
  // blogContentWide,
  blogContentMobile,
  navLinkText,
  navLinkTextCoffee,
  siteTitle,
  siteSubtitle,
} from "./layout.module.css";

import "./layout.css";
import TagPage from "./taglist";
import CategoryPage from "./categorypage";
import ProfilePage from "./profile";
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

let globalCategoryData = undefined;

const getCategoryPath = (data) => {
  if (globalCategoryData !== undefined) return globalCategoryData;
  const categoryRoot = [
    "java",
    "python",
    "javascript",
    "nosql",
    "rdb",
    "message queue",
    "linux",
    "docker",
    "kubernetes",
  ];

  const categoryData = {
    dataName: "root",
    dataCount: 0,
    parent: undefined,
    children: {},
  };

  for (let k = 0; k < data.allMdx.group.length; k++) {
    const tagHierarchy = data.allMdx.group[k];
    if (categoryRoot.indexOf(tagHierarchy.tag) > -1) {
      const tagHierarchyList = tagHierarchy.nodes;
      for (let i = 0; i < tagHierarchyList.length; i++) {
        const tagNodes = tagHierarchyList[i];
        const { tags } = tagNodes.frontmatter;

        //tags.unshift(category);

        let objectPointerParent = categoryData;
        let objectPointer = categoryData.children;

        for (let j = 0; j < tags.length; j++) {
          const tag = tags[j];

          if (objectPointer[tag] === undefined) {
            objectPointer[tag] = {
              dataName: tag,
              dataCount: 0,
              parent: objectPointer.parent,
              children: {},
            };
          }

          objectPointer[tag].dataCount = objectPointer[tag].dataCount + 1;

          while (true) {
            if (objectPointerParent.dataCount === undefined)
              objectPointerParent.dataCount = 0;

            objectPointerParent.dataCount = objectPointerParent.dataCount + 1;

            if (objectPointerParent.parent === undefined) break;

            objectPointerParent = objectPointerParent.parent;
          }

          objectPointerParent = objectPointer;

          objectPointer = objectPointer[tag].children;
        }
      }
    }
  }
  return categoryData;
};

const Layout = ({ pageTitle, children }) => {
  const subtitle = `기억을 연장하기 위한 블로그`;
  const [toggleButton, setToggleButton] = useState(false);
  const { scrollY } = useScroll();

  // destructuring : this is same with (props) => { const pageTitle = props.pageTitle; const children = props.children;}
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
        }
      }
      allMdx {
        group(field: frontmatter___tags) {
          tag: fieldValue
          totalCount
          nodes {
            frontmatter {
              category
              tags
            }
          }
        }
      }
    }
  `);

  const dropshadow = {
    boxShadow: "0px 0px 9px 3px rgba(41, 41, 41, 0.25)",
  };

  globalCategoryData = getCategoryPath(data);

  return (
    <div className={container}>
      <Helmet>
        <meta
          name="theme-color"
          content="#4051b5"
          media="(prefers-color-scheme: light)"
        />

        <meta
          name="theme-color"
          content="#4051b5"
          media="(prefers-color-scheme: dark)"
        />
      </Helmet>
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
            <li>
              <Link to="/about" className={navLinkTextCoffee}>
                <FontAwesomeIcon icon={faCoffee} />
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
        <div className={"categorylistcontainer"}>
          <CategoryPage data={globalCategoryData}></CategoryPage>
        </div>
        <div className={"taglistcontainer"}>
          <TagPage data={data}></TagPage>
        </div>
        <div className={"profilecontainer"}>
          <ProfilePage data={data}></ProfilePage>
        </div>
      </div>
    </div>
  );
};

export default Layout;
