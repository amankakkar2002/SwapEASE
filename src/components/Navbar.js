import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import { NavLink } from "react-router-dom";
import logo from "../images/icon1.png";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-md bg-body-tertiary">
  <div className="container-fluid">
    <a href="/">
      <img src={logo} alt="logo" className="navbar-img"></img>
    </a>
    <a
      className="navbar-toggler m-2"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span className="navbar-toggler-icon"></span>
    </a>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <NavLink className="nav-link" aria-current="page" to="/login">
            Login
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" aria-current="page" to="/signup">
            Registration
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" aria-current="page" to="/aboutus">
            About Us
          </NavLink>
        </li>
      </ul>
    </div>
  </div>
</nav>

  );
};

export default Navbar;
