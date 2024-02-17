import "../styles/Post.css";
import moment from "moment";
import { Link } from "react-router-dom";
import parse from "html-react-parser";

function Post({ post }) {
  function getDate(date) {
    const dateFormat = "Do MMMM YYYY";
    return moment(date).format(dateFormat);
  }
  const snippet = post.text.substring(0, 150);

  return (
    <Link to={`posts/${post._id}`}>
      <div className="post-container">
        <span className="post-info">
          <p>{getDate(post.createdAt)}</p>
        </span>
        <h2 className="post-header">{parse(post.title)}</h2>
        <p>{parse(snippet)}...</p>
      </div>
    </Link>
  );
}

export default Post;
