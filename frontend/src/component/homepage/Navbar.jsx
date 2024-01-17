import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import mudrank from "../../images/Mudrank.svg";

// import "../../css/menu_style.css";
// import "../../css/style.css";

export function Navbar() {

  const navigate = useNavigate();
  const location = useLocation();
  // const isAdminPath = location.pathname.startsWith('/admin');
  const isSuperAdminPath = location.pathname.startsWith('/superadmin');
  const [menuActive, setMenuActive] = useState(false);
  const [subMenuActive, setSubMenuActive] = useState(false);
  const [subMenuTitle, setSubMenuTitle] = useState("");

  useEffect(() => {
    // if (isSuperAdminPath) {
      document.body.style.backgroundColor = "black";
    // } 
    const handleResize = () => {
      if (window.innerWidth > 991 && menuActive) {
        toggleMenu();
      }
    };

    window.addEventListener("load", handleResize);

    return () => {
      window.removeEventListener("load", handleResize);
    };
  }, [menuActive]);

  const toggleMenu = () => {
    setMenuActive((prevState) => !prevState);
  };

  const showSubMenu = (hasChildren) => {
    const subMenuElement = hasChildren.querySelector(".menu-subs");
    setSubMenuActive(true);
    setSubMenuTitle(
      hasChildren.querySelector("i").parentNode.childNodes[0].textContent
    );
    subMenuElement.classList.add("active");
    subMenuElement.style.animation = "slideLeft 0.5s ease forwards";
  };

  const hideSubMenu = () => {
    const subMenuElement = document.querySelector(".menu-subs.active");
    subMenuElement.style.animation = "slideRight 0.5s ease forwards";
    setTimeout(() => {
      subMenuElement.classList.remove("active");
      setSubMenuActive(false);
      setSubMenuTitle("");
    }, 300);
  };

  return (
    <>
      <header className="header">
        <div className="container bcontainer">
          <div className="wrapper inner_container">
            <div className="header-item-left">
              <div className="logo">
                <a onClick={() => navigate("/")}>
                  <div
                    className="backimg"
                    style={{ backgroundImage: `url(${mudrank})` }}
                  >
                    <svg
                      className="transparent_svg"
                      data-name="Layer 1"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 175 36"
                    >
                      <rect
                        className="cls-1"
                        x="0.5"
                        y="0.5"
                        width="174"
                        height="35"
                      ></rect>
                    </svg>
                  </div>
                </a>
              </div>
            </div>
            <div className="header-item-center">
              <div className="overlay"></div>
              <nav className={`menu ${menuActive ? "active" : ""}`}>
                <div
                  className={`menu-mobile-header ${
                    subMenuActive ? "active" : ""
                  }`}
                >
                  <button
                    type="button"
                    className="menu-mobile-arrow"
                    // onClick={hideSubMenu}
                  >
                    <i className="ion ion-ios-arrow-back"></i>
                  </button>
                  <div className="menu-mobile-title">{subMenuTitle}</div>
                  <button
                    type="button"
                    className="menu-mobile-close"
                    onClick={toggleMenu}
                  >
                    <p>X</p>
                  </button>
                </div>
                <ul className="menu-section">
                  <li
                    className={location.pathname === "/about" ? "active" : ""}
                  >
                    <Link to={"/about"}>About</Link>
                  </li>
                  <li
                    className={location.pathname === "/startup" ? "active" : ""}
                  >
                    <Link to={"/startup"}>Products</Link>
                  </li>
                  <li className={location.pathname === "/blog" ? "active" : ""}>
                    <Link to={"/blog"}>Blog</Link>
                  </li>
                  <li className={location.pathname === "/faq" ? "active" : ""}>
                    <Link to={"/faq"}>FAQ</Link>
                  </li>
                  <li
                    className={
                      location.pathname === "/raise-capital" ? "active" : ""
                    }
                  >
                    <Link to={"/raise-capital"}>Raise Capital</Link>
                  </li>
                </ul>
              </nav>
            </div>

            <div className="header-item-right">
              <Link to={"/loginpage"}>Login</Link>
              <Link className="button wbg" to="/registerpage">
                Register
              </Link>
              <button
                type="button"
                className="menu-mobile-trigger"
                onClick={toggleMenu}
              >
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
