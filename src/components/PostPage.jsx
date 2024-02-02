import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import moment from "moment";

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
        console.log(data);
      } catch (err) {
        setError(err.message);
        setPost(null);
      } finally {
        setLoading(false);
      }
    };
    getPost();
  }, []);

  return (
    <div className="container">
      <div className="main-body">
        <Link to="/">Home</Link>
        <p>Title: {post.title}</p>
        <p>Text: {post.text}</p>
        <p>Posted: {getDate(post.createdAt)}</p>
        <p>Updated: {getDate(post.updatedAt)}</p>
      </div>
    </div>
  );
}

export default PostPage;
