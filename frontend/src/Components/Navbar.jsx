// Navbar.jsx
import { Link, useLocation } from "react-router-dom";
import LoginIcon from "@mui/icons-material/Login";
import InfoIcon from "@mui/icons-material/Info";
import HomeIcon from "@mui/icons-material/Home";
import ListAltIcon from "@mui/icons-material/ListAlt"; // Problems
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn"; // Submissions
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents"; // Leaderboard
import "../style/Navbar.css";
import logo from "../logo.png";
import alextremeLogo from "../AleXtreme .png";
import { useContext } from "react";
import { AuthContext } from "../context/ContextCreation";

const Navbar = () => {
  const { isLoggedIn } = useContext(AuthContext);
  const location = useLocation();
  const path = location.pathname;

  const isHomePage = path === "/";
  const isAboutPage = path === "/About";
  const isProblemsPage = path === "/problems";
  const isSubmissionsPage = path === "/submissions";
  const isLeaderboardPage = path === "/leaderboard";

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
          {isLoggedIn ? (
            <>
              {!isProblemsPage && (
                <Link to="/problems" className="nav-link" title="Problems">
                  <ListAltIcon className="nav-icon" />
                </Link>
              )}
              {!isSubmissionsPage && (
                <Link to="/submissions" className="nav-link" title="Submissions">
                  <AssignmentTurnedInIcon className="nav-icon" />
                </Link>
              )}
              {!isLeaderboardPage && (
                <Link to="/leaderboard" className="nav-link" title="Leaderboard">
                  <EmojiEventsIcon className="nav-icon" />
                </Link>
              )}
            </>
          ) : (
            <>
              {!isAboutPage && (
                <Link to="/About" className="nav-link" title="About">
                  <InfoIcon className="nav-icon" />
                </Link>
              )}
              {!isHomePage && (
                <Link to="/" className="nav-link" title="Home">
                  <HomeIcon className="nav-icon" />
                </Link>
              )}
              {(isHomePage || isAboutPage) && (
                <Link to="/Login" className="nav-link" title="Login">
                  <LoginIcon className="nav-icon" />
                </Link>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
