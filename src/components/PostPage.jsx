import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import moment from "moment";
import "../styles/PostPage.css";

function PostPage() {
  const { postid } = useParams();
  const [post, setPost] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  function getDate(date) {
    const dateFormat = "Do MMMM YYYY, h:mm:ss a";
    return moment(date).format(dateFormat);
  }

  useEffect(() => {
    const getPost = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/posts/${postid}`,
          {
            method: "GET",
          }
        );
        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }
        const data = await response.json();
        setPost(data);
        //console.log(data);
      } catch (err) {
        setError(err.message);
        setPost(null);
      } finally {
        setLoading(false);
      }
    };
    getPost();
  }, []);

  if (error) {
    return (
      <div className="container">
        <div className="main-body">
          <Link to="/" className="arrow">
            &larr;
          </Link>
          <p>Error loading post</p>
        </div>
      </div>
    );
  } else if (loading) {
    return (
      <div className="container">
        <div className="post-body">
          <p>Loading post...</p>
        </div>
      </div>
    );
  } else {
    return (
      <div className="container">
        <div className="main-body">
          <Link to="/" className="arrow">
            &larr;
          </Link>
          <div className="post-body">
            <h1>{post.title}</h1>

            <hr></hr>
            <p>{post.text}</p>
            <hr></hr>
            <div className="post-footer">
              <p className="postpage-info">Posted: {getDate(post.createdAt)}</p>
              <p className="postpage-info">
                Updated: {getDate(post.updatedAt)}
              </p>
            </div>
          </div>
          <div className="comment-container">
            <button>Add comment</button>
            <div>Comments:</div>
          </div>
        </div>
      </div>
    );
  }
}

export default PostPage;
