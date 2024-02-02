import Comment from "./Comment";
import "../styles/Comments.css";

function Comments({ comments, count }) {
  return <div className="comment-container">Comments: {count}</div>;
}

export default Comments;
