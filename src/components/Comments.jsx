import Comment from "./Comment";
import "../styles/Comments.css";
import { useState } from "react";
import { useCollapse } from "react-collapsed";

function Comments({ comments, count }) {
  const { getCollapseProps, getToggleProps, isExpanded } = useCollapse({
    duration: 200,
  });
  return (
    <div className="comment-container">
      <div className="add-comment">
        <span className="show-add-comment" {...getToggleProps()}>
          <b>Add Comment</b>
          <b id="down-arrow">&#8964;</b>
        </span>
        <form className="add-comment-form" {...getCollapseProps()}>
          <p>Username</p>
          <p>text</p>
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
