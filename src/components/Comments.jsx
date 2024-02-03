import Comment from "./Comment";
import "../styles/Comments.css";
import { useState } from "react";
import { useCollapse } from "react-collapsed";

function Comments({ comments, count }) {
  const [data, setData] = useState({});
  const { getCollapseProps, getToggleProps, isExpanded } = useCollapse({
    duration: 200,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  return (
    <div className="comment-container">
      <div className="add-comment">
        <span className="show-add-comment" {...getToggleProps()}>
          <b>Add Comment</b>
          <b id="down-arrow">&#8964;</b>
        </span>
        <form
          className="add-comment-form"
          {...getCollapseProps()}
          onSubmit={handleSubmit}
        >
          <input
            className="form-username"
            name="username"
            placeholder="Name"
            type="text"
            required
            maxLength={100}
            onChange={(e) => setData({ ...data, username: e.target.value })}
          />
          <textarea
            className="form-text"
            name="text"
            placeholder="Max 512 characters"
            required
            rows={5}
            maxLength={512}
          />
          <span className="form-span">
            <button className="form-submit">Submit</button>
          </span>
        </form>
      </div>

      <ul className="comment-list">
        {comments.map((comment) => (
          <li key={comment._id} className="comment-list-item">
            <Comment comment={comment} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Comments;
