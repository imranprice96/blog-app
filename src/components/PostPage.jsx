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
    const dateFormat = "Do MMMM YYYY, h:mm:ss a";
    return moment(date).format(dateFormat);
  }

  useEffect(() => {
    const getPost = async () => {
      try {
        const response = await fetch(`${url}/api/posts/${postid}`, {
          method: "GET",
        });
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
        setLoadingPost(false);
      }
    };
    getPost();
  }, []);

  useEffect(() => {
    const getComments = async () => {
      try {
        const response = await fetch(`${url}/api/posts/${postid}/comments`, {
          method: "GET",
        });
        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }
        const data = await response.json();
        setComments(data.comments);
        setCommentCount(data.comments.length);
        setError(null);
      } catch (err) {
        setError(err.message);
        setComments(null);
      } finally {
        setLoadingComments(false);
      }
    };
    getComments();
  }, []);

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
        <div className="post-body">
          <p></p>
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
            <h1>{parse(post.title)}</h1>

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
          <Comments comments={comments} count={commentCount} postid={postid} />
        </div>
      </div>
    );
  }
}

export default PostPage;
