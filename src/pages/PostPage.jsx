import React, { useState } from "react";
import "../styles/PostPage.css"; // New CSS file for styling

export default function PostPage() {
  const [postType, setPostType] = useState("question");

  const [qTitle, setQTitle] = useState("");
  const [qDescription, setQDescription] = useState("");
  const [qTags, setQTags] = useState("");

  const [aTitle, setATitle] = useState("");
  const [aAbstract, setAAbstract] = useState("");
  const [aText, setAText] = useState("");
  const [aTags, setATags] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (postType === "question") {
      console.log({
        type: "question",
        title: qTitle,
        description: qDescription,
        tags: qTags,
      });
      alert("Question submitted (console only)");
    } else {
      console.log({
        type: "article",
        title: aTitle,
        abstract: aAbstract,
        articleText: aText,
        tags: aTags,
      });
      alert("Article submitted (console only)");
    }
  };

  return (
    <div className="post-container">
      <div className="post-card">
        <h2 className="post-title">Create New Post</h2>

        <div className="post-type-toggle">
          <button
            className={postType === "question" ? "active" : ""}
            onClick={() => setPostType("question")}
            type="button"
          >
            Question
          </button>
          <button
            className={postType === "article" ? "active" : ""}
            onClick={() => setPostType("article")}
            type="button"
          >
            Article
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {postType === "question" ? (
            <>
              <label>Title</label>
              <input
                type="text"
                placeholder="Start your question with how, what, why, etc."
                value={qTitle}
                onChange={(e) => setQTitle(e.target.value)}
                required
              />

              <label>Description</label>
              <textarea
                rows="6"
                placeholder="Describe your problem in detail..."
                value={qDescription}
                onChange={(e) => setQDescription(e.target.value)}
                required
              />

              <label>Tags</label>
              <input
                type="text"
                placeholder="Up to 3 tags (e.g., Java, React)"
                value={qTags}
                onChange={(e) => setQTags(e.target.value)}
              />
            </>
          ) : (
            <>
              <label>Title</label>
              <input
                type="text"
                placeholder="Enter a descriptive title"
                value={aTitle}
                onChange={(e) => setATitle(e.target.value)}
                required
              />

              <label>Abstract</label>
              <textarea
                rows="3"
                placeholder="Enter a short summary"
                value={aAbstract}
                onChange={(e) => setAAbstract(e.target.value)}
                required
              />

              <label>Article Text</label>
              <textarea
                rows="6"
                placeholder="Write your full article here..."
                value={aText}
                onChange={(e) => setAText(e.target.value)}
                required
              />

              <label>Tags</label>
              <input
                type="text"
                placeholder="Up to 3 tags (e.g., JavaScript, AI)"
                value={aTags}
                onChange={(e) => setATags(e.target.value)}
              />
            </>
          )}

          <div className="form-actions">
            <button type="submit" className="submit-btn">
              Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
