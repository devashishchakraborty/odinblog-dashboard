import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Markdown from "react-markdown";
import { formatTimestamp } from "../utils";
import "../styles/Post.css";
import Comments from "./Comments";
import NotFound from "./NotFound";

const Post = ({ token, user }) => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`http://localhost:3000/posts/${postId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setPost(data);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err.message);
      }
    };

    fetchPost();
  }, [token, postId]);

  if (!parseInt(postId)) return <NotFound />;
  if (error) return <div className="pico">{error}</div>;

  return (
    <div className="pico container">
      {post ? (
        <>
          <section className="postContainer">
            <h2>{post.title}</h2>
            <div className="postMeta">
              <span>{user.name}</span> &#8226;{" "}
              <span>{formatTimestamp(post.created_at)}</span>
            </div>
            <hr />
            <Markdown>{post.content}</Markdown>
          </section>
          <hr />
          <section className="commentSection">
            <Comments post={post} postId={postId} token={token}/>
          </section>
        </>
      ) : (
        <div aria-busy="true"></div>
      )}
    </div>
  );
};

export default Post;
