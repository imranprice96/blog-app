import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import moment from "moment";
import "../styles/PostPage.css";
import Comments from "./Comments";
import parse from "html-react-parser";

function PostPage() {
  const { postid } = useParams();
  const [post, setPost] = useState();
  const [loadingPost, setLoadingPost] = useState(true);
  const [loadingComments, setLoadingComments] = useState(true);
  const [error, setError] = useState();

  const [comments, setComments] = useState();
  const [commentCount, setCommentCount] = useState(0);
  const url = import.meta.env.VITE_API_URL;

  function getDate(date) {
    const dateFormat = "Do MMMM YYYY";
    return moment(date).format(dateFormat);
  }

  /*
  useEffect(() => {
    const getPost = async () => {
      if (localStorage.getItem("post")) {
        const storedPost = JSON.parse(localStorage.getItem("post"));
        setPost(storedPost);
      }
      try {
        const response = await fetch(`${url}/api/posts/${postid}`, {
          method: "GET",
        });
        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }
        const data = await response.json();
        localStorage.setItem("post", JSON.stringify(data));
        setPost(data);
        //console.log(data);
      } catch (err) {
        setError(err.message);
        setPost(null);
      } finally {
        setLoadingPost(false);
      }
    };
    getPost();
  }, []);
*/

  useEffect(() => {
    const getComments = async () => {
      // Check local storage for stored
      if (localStorage.getItem(`${postid}_comments`)) {
        const storedComments = JSON.parse(localStorage.getItem("comments"));
        setComments(storedComments);
      }
      if (localStorage.getItem(`${postid}_count`)) {
        const storedCommentCount = JSON.parse(localStorage.getItem("comments"));
        setCommentCount(storedCommentCount);
      }
      if (localStorage.getItem(`${postid}`)) {
        const storedPost = JSON.parse(localStorage.getItem("post"));
        setPost(storedPost);
      }
      try {
        const response = await fetch(`${url}/api/posts/${postid}/comments`, {
          method: "GET",
        });
        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }
        const data = await response.json();
        setComments(data.comments);
        setPost(data.post);
        setCommentCount(data.comments.length);
        localStorage.setItem(
          `${postid}_comments`,
          JSON.stringify(data.comments)
        );
        localStorage.setItem(
          `"${postid}_count"`,
          JSON.stringify(data.comments.length)
        );
        localStorage.setItem(`${postid}`, JSON.stringify(data.post));
        setError(null);
      } catch (err) {
        setError(err.message);
        setComments(null);
        setPost(null);
      } finally {
        setLoadingComments(false);
        setLoadingPost(false);
      }
    };
    getComments();
  }, []);

  const handleNewComment = (newComment) => {
    setComments([...comments, newComment]);
    setCommentCount((count) => count + 1);
  };

  if (error) {
    return (
      <div className="container">
        <div className="main-body">
          <Link to="/" className="arrow">
            &larr;
          </Link>
          <p>Error loading post {error}</p>
        </div>
      </div>
    );
  } else if (loadingComments || loadingPost) {
    return (
      <div className="container">
        <div className="post-body" style={{ boxShadow: "none" }}>
          <span className="loading">
            <p>Loading...</p>
          </span>
        </div>
      </div>
    );
  } else {
    return (
      <div className="container">
        <div className="postpage-body">
          <Link to="/" className="arrow">
            &larr;
          </Link>
          <div className="post-body">
            <h1 className="post-heading">{parse(post.title)}</h1>

            <hr></hr>
            <p id="post-text">{parse(post.text)}</p>
            <hr></hr>
            <div className="post-footer">
              <p className="postpage-info">Posted: {getDate(post.createdAt)}</p>
              <p className="postpage-info">
                Updated: {getDate(post.updatedAt)}
              </p>
            </div>
          </div>
          <Comments
            comments={comments}
            count={commentCount}
            postid={postid}
            change={handleNewComment}
          />
        </div>
      </div>
    );
  }
}

export default PostPage;
