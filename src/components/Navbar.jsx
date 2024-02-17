import { Link } from "react-router-dom";
import "../styles/Navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon } from "@fortawesome/free-solid-svg-icons";

function Navbar() {
  return (
    <>
      <div className="topnav">
        <span className="nav-items">
          <Link to="/" className="nav-link">
            <h1 className="nav-header">Blog.Imi</h1>{" "}
            <FontAwesomeIcon icon={faMoon} className="moon" />
          </Link>{" "}
        </span>
      </div>
    </>
  );
}

export default Navbar;
