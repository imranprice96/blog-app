import { useEffect, useState } from "react";
import "../styles/Post.css";
import moment from "moment";
import { Link } from "react-router-dom";

function Post({ post }) {
  const [comments, setComments] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [commentCount, setCommentCount] = useState(0);

  useEffect(() => {
    const getComments = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/posts/${post._id}/comments`,
          { method: "GET" }
        );
        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }
        const data = await response.json();
        setComments(data.comments);
        setCommentCount(data.comments.length);
        //console.log(data.comments);
        setError(null);
      } catch (err) {
        setError(err.message);
        setComments(null);
      } finally {
        setLoading(false);
      }
    };
    getComments();
  }, []);

  function getDate(date) {
    const dateFormat = "Do MMMM YYYY, h:mm:ss a";
    return moment(date).format(dateFormat);
  }

  if (error) {
    return (
      <div className="post-container">
        <p>Error loading comments</p>
      </div>
    );
  } else {
    return (
      <Link to={`posts/${post._id}`}>
        <div className="post-container">
          <h2>{post.title}</h2>
          <div className="post-info">
            <p>Posted: {getDate(post.createdAt)}</p>
            <p>Updated: {getDate(post.updatedAt)}</p>
            <p>Comments: {commentCount}</p>
          </div>
        </div>
      </Link>
    );
  }
}

export default Post;
