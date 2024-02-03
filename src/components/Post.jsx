import "../styles/Post.css";
import moment from "moment";
import { Link } from "react-router-dom";
import parse from "html-react-parser";

function Post({ post }) {
  function getDate(date) {
    const dateFormat = "Do MMMM YYYY, h:mm:ss a";
    return moment(date).format(dateFormat);
  }

  return (
    <Link to={`posts/${post._id}`}>
      <div className="post-container">
        <h2>{parse(post.title)}</h2>
        <div className="post-info">
          <p>Posted: {getDate(post.createdAt)}</p>
          <p>Updated: {getDate(post.updatedAt)}</p>
        </div>
      </div>
    </Link>
  );
}

export default Post;
