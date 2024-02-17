import Comment from "./Comment";
import "../styles/Comments.css";
import { useState } from "react";
import { useCollapse } from "react-collapsed";

function Comments({ comments, count, postid, change }) {
  const [data, setData] = useState({ username: "", text: "" });
  const url = import.meta.env.VITE_API_URL;
  const [isExpanded, setExpanded] = useState(false);

  const { getCollapseProps, getToggleProps } = useCollapse({
    duration: 200,
    isExpanded,
  });

  const confirmation = (e) => {
    const confirm = window.confirm(
      `${data.username}: ${data.text} - confirm your submission`
    );
    if (confirm) {
      handleSubmit(e);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${url}/api/posts/${postid}`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();
    change(result);
    resetForm();
  };

  const resetForm = () => {
    setData({ username: "", text: "" });
    toggle();
  };

  const toggle = () => {
    setExpanded((prevExpanded) => !prevExpanded);
  };

  // Comment form can be refactored into its own component
  return (
    <div className="comment-container">
      <div className="add-comment">
        <span
          className="show-add-comment"
          {...getToggleProps({ onClick: () => toggle() })}
        >
          <b>Add Comment ({count})</b>
          <b id="down-arrow">&#8964;</b>
        </span>
        <form
          className="add-comment-form"
          {...getCollapseProps()}
          onSubmit={confirmation}
        >
          <input
            className="form-username"
            name="username"
            placeholder="Name"
            type="text"
            value={data.username}
            required
            maxLength={100}
            onChange={(e) => setData({ ...data, username: e.target.value })}
          />
          <textarea
            className="form-text"
            name="text"
            value={data.text}
            placeholder="Max 512 characters"
            required
            rows={5}
            maxLength={512}
            onChange={(e) => setData({ ...data, text: e.target.value })}
          />
          <span className="form-span">
            <button className="form-submit" type="submit">
              Submit
            </button>
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
