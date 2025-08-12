import React, { useState } from "react";
import "../styles/FeaturedSection.css"; 

export default function FeaturedSection({ title, items }) {
  const [visibleCount, setVisibleCount] = useState(3);

  const showMore = () => {
    setVisibleCount(items.length); // Show all
  };

  return (
    <div className="featured-section">
      <h2>{title}</h2>

      <div className="articles-grid">
        {items.slice(0, visibleCount).map((item, index) => (
          <div key={index} className="article-card">
            <img src={item.image} alt={item.title} />
            <h3>{item.title}</h3>
            <p className="description">{item.description}</p>
            <p className="author">By {item.author}</p>
            <p className="rating">⭐ {item.rating}</p>
          </div>
        ))}
      </div>

      {visibleCount < items.length && (
        <button className="see-all-btn" onClick={showMore}>
          See All
        </button>
      )}
    </div>
  );
}
