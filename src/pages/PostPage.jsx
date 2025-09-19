import React, { useState } from "react";
import "../styles/PostPage.css";
import { db, storage } from "../firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default function PostPage() {
  const [postType, setPostType] = useState("question");

  // Question fields
  const [qTitle, setQTitle] = useState("");
  const [qDescription, setQDescription] = useState("");
  const [qTags, setQTags] = useState("");

  // Article fields
  const [aTitle, setATitle] = useState("");
  const [aAbstract, setAAbstract] = useState("");
  const [aText, setAText] = useState("");
  const [aTags, setATags] = useState("");
  const [aImage, setAImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const uploadImage = async (file) => {
    if (!file) return "";
    
    try {
      const imageRef = ref(storage, `articles/${Date.now()}_${file.name}`);
    
      const snapshot = await uploadBytes(imageRef, file);
      console.log("Upload completed", snapshot);
      
      const downloadURL = await getDownloadURL(snapshot.ref);
      console.log("File available at", downloadURL);
      
      return downloadURL;
    } catch (error) {
      console.error("Error uploading image:", error);
      throw new Error("Image upload failed: " + error.message);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.match('image.*')) {
        alert("Please select an image file (jpg, png, gif)");
        return;
      }
    
      if (file.size > 5 * 1024 * 1024) {
        alert("Please select an image smaller than 5MB");
        return;
      }
      
      setAImage(file);
      
      // Create a preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setUploadProgress(0);
    
    try {
      if (postType === "article") {
        let imageUrl = "";
        if (aImage) {
          console.log("Uploading image:", aImage.name);
          // Simulate progress (Firebase doesn't have built-in progress tracking)
          const progressInterval = setInterval(() => {
            setUploadProgress(prev => Math.min(prev + 10, 90));
          }, 300);
          
          imageUrl = await uploadImage(aImage);
          clearInterval(progressInterval);
          setUploadProgress(100);
          console.log("Image URL:", imageUrl);
        }

        await addDoc(collection(db, "articles"), {
          title: aTitle,
          abstract: aAbstract,
          articleText: aText,
          tags: aTags.split(",").map((tag) => tag.trim()),
          imageUrl,
          createdAt: serverTimestamp(),
        });

        alert("Article saved successfully!");
        // Reset form
        setATitle("");
        setAAbstract("");
        setAText("");
        setATags("");
        setAImage(null);
        setImagePreview("");
      } else {
        await addDoc(collection(db, "questions"), {
          title: qTitle,
          description: qDescription,
          tags: qTags.split(",").map((tag) => tag.trim()),
          createdAt: serverTimestamp(),
        });
        alert("Question saved successfully!");
        // Reset form
        setQTitle("");
        setQDescription("");
        setQTags("");
      }
    } catch (err) {
      console.error("Error saving post:", err);
      alert("Error: " + err.message);
    } finally {
      setLoading(false);
      setUploadProgress(0);
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
                placeholder="Start your question with how, what, why..."
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

              <label>Add an Image (Optional)</label>
              <div className="image-upload-container">
                <input
                  type="file"
                  id="image-upload"
                  accept="image/*"
                  onChange={handleImageChange}
                  style={{ display: 'none' }}
                />
                <label htmlFor="image-upload" className="image-upload-btn">
                  Choose Image
                </label>
                {aImage && <span className="file-name">{aImage.name}</span>}
              </div>
              
              {imagePreview && (
                <div className="image-preview">
                  <img src={imagePreview} alt="Preview" />
                </div>
              )}
              
              {uploadProgress > 0 && (
                <div className="progress-bar">
                  <div 
                    className="progress-fill" 
                    style={{ width: `${uploadProgress}%` }}
                  >
                    {uploadProgress}%
                  </div>
                </div>
              )}

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
            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? "Saving..." : "Post"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}