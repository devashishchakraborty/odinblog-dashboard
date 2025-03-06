import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/PostList.css";
import { clipText } from "../utils";

const PostList = () => {
  const [posts, setPosts] = useState(null);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchPosts = async () => {
      const TOKEN = import.meta.env.VITE_BEARER_TOKEN;
      try {
        const response = await fetch("http://localhost:3000/posts", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${TOKEN}`,
          },
        });
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setPosts(data);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err.message);
      }
    };

    fetchPosts();
  }, []);

  if (error) return <section>{error}</section>;
  return (
    <>
      <section className="container">
        <h2>Latest Posts</h2>

        {
          // If posts array exists and has length > 0 then display the posts
          posts ? (
            posts.length > 0 && (
              <div className="posts">
                {posts.map((post) => (
                  <Link to={`/posts/${post.id}`}>
                    <article key={post.id}>
                      <header>
                        <b>{post.title}</b>
                      </header>
                      <p>{clipText(post.content)}</p>
                    </article>
                  </Link>
                ))}
              </div>
            )
          ) : (
            // Else Show loading animation
            <div aria-busy="true"></div>
          )
        }
      </section>
    </>
  );
};

export default PostList;
