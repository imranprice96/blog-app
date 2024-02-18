import { Link } from "react-router-dom";
import "../styles/Error.css";

const ErrorPage = () => {
  return (
    <div className="error-container">
      <h1 className="error-header">Oh no, an error occurred!</h1>
      <Link to="/" className="error-btn">
        You can go back to the home page by clicking here, though!
      </Link>
    </div>
  );
};

export default ErrorPage;
