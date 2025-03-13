import MdiContentSave from "../assets/svg/MdiContentSave";
import MdiPublish from "../assets/svg/MdiPublish";
import "../styles/Editor.css";
import { useRef, useState } from "react";
import EditorContent from "./EditorContent"; // Import the memoized component
import { useNavigate } from "react-router-dom";

function Editor({
  token,
  editPostId = null,
  postTitle = "A Catchy Title",
  postContent = "An amazing post...",
}) {
  const ref = useRef(null);
  const [title, setTitle] = useState(postTitle);
  const [isPublishing, setIsPublishing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState(null);
  const [postId, setPostId] = useState(editPostId);
  const navigate = useNavigate();

  const storePost = async (title, content, published, setIsSubmitting) => {
    if (title.length > 0 || content.length > 0) {
      setIsSubmitting(true);
      try {
        const response = await fetch(
          `https://blog-api-qyys.onrender.com/posts/${postId || ""}`,
          {
            method: postId ? "PUT" : "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ title, content, published }),
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setPostId(data.id);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err.message);
      } finally {
        setIsSubmitting(false);
      }
    }
  };
  if (error) return <section className="container">{error}</section>;
  return (
    <section className="container editorWrapper">
      <section className="pico">
        <section className="meta">
          <b>Write your Post</b>
            <button
              onClick={() => {
                storePost(
                  title,
                  ref.current?.getMarkdown(),
                  true,
                  setIsPublishing
                );
                navigate("/posts");
              }}
              aria-busy={isPublishing}
              disabled={isPublishing}
            >
              <MdiPublish /> Publish
            </button>
            <button
              className="secondary outline"
              onClick={() =>
                storePost(title, ref.current?.getMarkdown(), false, setIsSaving)
              }
              aria-busy={isSaving}
              disabled={isSaving}
            >
              <MdiContentSave /> Save
            </button>
        </section>
        <form action="#">
          <input
            type="text"
            name="title"
            placeholder="Title"
            aria-label="Post Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </form>
      </section>
      <EditorContent ref={ref} postContent={postContent} />
    </section>
  );
}

export default Editor;
