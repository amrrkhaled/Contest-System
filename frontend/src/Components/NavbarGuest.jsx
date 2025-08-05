import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import LoginIcon from "@mui/icons-material/Login";
import InfoIcon from "@mui/icons-material/Info";
import { Typography } from "@mui/material";
import "../style/Navbar.css";
import logo from "../logo.png";
import alextremeLogo from "../AleXtreme .png";

const NavbarGuest = () => {
  return (
    <div className="navbar-wrapper">
      <div className="nav-content">
        <div className="nav-left">
          <img src={logo} alt="IEEE AlexSB Logo" className="logo-image" />
        </div>
        <div className="nav-title">
          <img
            src={alextremeLogo}
            alt="ALexTreme Logo"
            className="title-image"
          />
        </div>

        <div className="nav-links">
          <Link to="/About" className="nav-link" title="About">
            <InfoIcon className="nav-icon" />
          </Link>
          <Link to="/Login" className="nav-link" title="Login">
            <LoginIcon className="nav-icon" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NavbarGuest;
