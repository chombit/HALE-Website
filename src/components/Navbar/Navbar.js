import { NavLink } from "react-router-dom";
import "./Navbar.css";
import navLogo from "./../../assets/hale-logo.png";
import { useContext, useEffect } from "react";
import { GeneralContext } from "../../hooks/GeneralContext";
export default function Navbar() {
  const { navOpen, setNavOpen } = useContext(GeneralContext);
  useEffect(
    function () {
      const body = document.querySelector("body");
      if (navOpen) {
        body.style.overflowY = "hidden";
      } else {
        body.style.overflowY = "visible";
      }
    },
    [navOpen]
  );
  return (
    <>
    <nav className={`navbar ${!navOpen ? "closed" : ""}`}>
      <div className="logo">
        <img src={navLogo} alt="" />
      </div>
      <div className="nav-links">
        <NavLink onClick={() => setNavOpen(false)} to="/">
          Home
        </NavLink>
        <NavLink onClick={() => setNavOpen(false)} to="/aboutus">
          About Us
        </NavLink>
        <NavLink onClick={() => setNavOpen(false)} to="/programs">
          Programs
        </NavLink>
        <NavLink onClick={() => setNavOpen(false)} to="/team">
          Our Team
        </NavLink>
        <NavLink onClick={() => setNavOpen(false)} to="/events">
          Events
        </NavLink>
        <NavLink onClick={() => setNavOpen(false)} to="/resources">
          Resources
        </NavLink>
        <NavLink onClick={() => setNavOpen(false)} to="/contact">
          Contact Us
        </NavLink>
      </div>
      <div onClick={() => setNavOpen((op) => !op)} className="hamburger-btn">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
          <path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" />
        </svg>
      </div>
    </nav>
    <nav className="mobile-nav">
      <div className="mobile-logo">
        <img src={navLogo} alt="" />
      </div>
      <div className="menu-btn">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
          <path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" />
        </svg>

      </div>
    </nav>
    </>
  );
}
