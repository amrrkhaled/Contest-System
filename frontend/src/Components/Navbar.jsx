import { Link, useLocation } from "react-router-dom";
import LoginIcon from "@mui/icons-material/Login";
import InfoIcon from "@mui/icons-material/Info";
import HomeIcon from "@mui/icons-material/Home";
import "../style/Navbar.css";
import logo from "../logo.png";
import alextremeLogo from "../AleXtreme .png";

const Navbar = () => {
  const location = useLocation();
  const path = location.pathname;

  const isAboutPage = path === "/About";
  const isHomePage = path === "/";

  return (
    <div className="navbar-wrapper">
      <div className="nav-content">
        <div className="nav-left">
          <img src={logo} alt="IEEE AlexSB Logo" className="logo-image" />
        </div>

        <div className="nav-title">
          <img src={alextremeLogo} alt="ALexTreme Logo" className="title-image" />
        </div>

        <div className="nav-links">
          {/* Show About icon only if not on /About */}
          {!isAboutPage && (
            <Link to="/About" className="nav-link" title="About">
              <InfoIcon className="nav-icon" />
            </Link>
          )}

          {/* Show Home icon only if not on / */}
          {!isHomePage && (
            <Link to="/" className="nav-link" title="Home">
              <HomeIcon className="nav-icon" />
            </Link>
          )}

          {/* ✅ Show Login icon only on Home or About */}
          {(isHomePage || isAboutPage) && (
            <Link to="/Login" className="nav-link" title="Login">
              <LoginIcon className="nav-icon" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
