import Comment from "./Comment";
import "../styles/Comments.css";
import { useState, useRef, useEffect } from "react";
import { useCollapse } from "react-collapsed";
import ConfirmModal from "./ConformModal";

function Comments({ comments, count, postid, change }) {
  const [data, setData] = useState({ username: "", text: "" });
  const url = import.meta.env.VITE_API_URL;
  const [isExpanded, setExpanded] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const modalRef = useRef(null);
  const bottomRef = useRef(null);

  const { getCollapseProps, getToggleProps } = useCollapse({
    duration: 200,
    isExpanded,
  });

  useEffect(() => {
    if (isExpanded && modalRef.current) {
      modalRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [isExpanded]);

  const handleConfirm = (e) => {
    e.preventDefault();
    handleSubmit(e);
    setShowModal(false);
  };

  const handleCancel = (e) => {
    e.preventDefault();
    setShowModal(false);
  };

  const confirmation = (e) => {
    e.preventDefault();
    setShowModal(true);
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
    scrollToBottom();
  };

  const resetForm = () => {
    setData({ username: "", text: "" });
    toggle();
  };

  const toggle = () => {
    setExpanded((prevExpanded) => !prevExpanded);
  };

  const scrollToBottom = () => {
    bottomRef.current.scrollIntoView({ behavior: "smooth" });
  };

  // Comment form can be refactored into its own component
  return (
    <div className="comment-container">
      {showModal && (
        <div className="modal-overlay">
          <ConfirmModal
            message={`${data.username}:\n${data.text}`}
            onConfirm={handleConfirm}
            onCancel={handleCancel}
          />
        </div>
      )}
      <div className="add-comment">
        <span
          className="show-add-comment"
          {...getToggleProps({ onClick: () => toggle() })}
          ref={modalRef}
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
      <span ref={bottomRef}></span>
    </div>
  );
}

export default Comments;
