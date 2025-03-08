import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Posts.css";
import { clipText } from "../utils";
import MdiPublish from "../assets/svg/MdiPublish";
import MdiDelete from "../assets/svg/MdiDelete";
import MdiEdit from "../assets/svg/MdiEdit";
import MdiPublishOff from "../assets/svg/MdiPublishOff";

const Posts = () => {
  const [posts, setPosts] = useState(null);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("http://localhost:3000/posts", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("apiToken")}`,
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

  // Toggle published cell of the post
  const togglePublish = async (post) => {
    try {
      const response = await fetch(`http://localhost:3000/posts/${post.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("apiToken")}`,
        },
        body: `{ "published": ${!post.published} }`,
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setPosts((prevPosts) =>
        prevPosts.map((prev) => {
          if (prev.id === post.id) return data;
          return prev;
        })
      );
    } catch (err) {
      console.error("Error fetching data:", err);
      setError(err.message);
    }
  };

  if (error) return <section className="container">{error}</section>;
  return (
    <>
      <section className="container">
        <h2>Your Posts</h2>

        {
          // If posts array exists and has length > 0 then display the posts
          posts ? (
            posts.length > 0 && (
              <div className="posts">
                {posts.map((post) => (
                  <div className="post" key={post.id}>
                    <Link to={`/posts/${post.id}`}>
                      <article>
                        <header>
                          <div>
                            <b>{post.title}</b>
                          </div>
                          <span
                            className="publishedStatus"
                            style={{
                              backgroundColor: post.published
                                ? "green"
                                : "#FF9500",
                            }}
                          >
                            &#9679;{" "}
                            {post.published ? "Published" : "Unpublished"}
                          </span>
                        </header>
                        <p>{clipText(post.content)}</p>
                      </article>
                    </Link>
                    <details className="dropdown postActions">
                      <summary>Update</summary>
                      <ul>
                        <li>
                          <Link to={`/posts/${post.id}/edit`}>
                            <MdiEdit />
                            Edit
                          </Link>
                        </li>
                        <li>
                          <Link to="#" onClick={() => togglePublish(post)}>
                            {post.published ? (
                              <>
                                <MdiPublishOff />
                                Unpublish
                              </>
                            ) : (
                              <>
                                <MdiPublish />
                                Publish
                              </>
                            )}
                          </Link>
                        </li>
                        <li>
                          <Link to="#" style={{ color: "crimson" }}>
                            <MdiDelete />
                            Delete
                          </Link>
                        </li>
                      </ul>
                    </details>
                  </div>
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

export default Posts;
