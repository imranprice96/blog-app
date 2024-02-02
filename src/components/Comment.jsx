import moment from "moment";
import "../styles/Comments.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

function Comment({ comment }) {
  function getDate(date) {
    const dateFormat = "Do MMMM YYYY";
    return moment(date).format(dateFormat);
  }

  return (
    <div>
      <p className="comment-text">{comment.text}</p>
      <div className="comment-info">
        <div className="user">
          <FontAwesomeIcon icon={faUser} style={{ color: "#4b5563" }} />
          <p>{comment.username}</p>
        </div>

        <p>{getDate(comment.createdAt)}</p>
      </div>
    </div>
  );
}
export default Comment;
