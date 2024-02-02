import { Link } from "react-router-dom";
import "../styles/Navbar.css";

function Navbar() {
  return (
    <>
      <div className="topnav">
        <Link to="/">
          <h1>My Blog</h1>
        </Link>
      </div>
    </>
  );
}

export default Navbar;
