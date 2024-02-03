import { useState, useEffect } from "react";
import "../styles/App.css";
import Post from "./Post";

function App() {
  const [posts, setPosts] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const url = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`${url}/api/posts`, {
          method: "GET",
        });
        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }
        const data = await response.json();
        setPosts(data.posts);
        //console.log(data.posts);
      } catch (err) {
        setError(err.message);
        setPosts(null);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  if (error) {
    return (
      <div className="container">
        <div className="main-body">
          <p>Error loading posts: {error}</p>
        </div>
      </div>
    );
  } else if (loading) {
    return (
      <div className="container">
        <div className="main-body">
          <p></p>
        </div>
      </div>
    );
  } else {
    return (
      <div className="container">
        <div className="main-body">
          {posts.map(
            (post) => post.published && <Post key={post._id} post={post} />
          )}
        </div>
      </div>
    );
  }
}

export default App;
