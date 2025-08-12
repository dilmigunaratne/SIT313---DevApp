import React from "react";
import "../styles/SubscribeBar.css"; // Assuming you have a CSS file for styling

export default function SubscribeBar() {
  return (
    <div className="subscribe-bar">
      <span className="subscribe-text">Sign Up for our Daily Insider</span>

      <div className="subscribe-actions">
        <input
          type="email"
          placeholder="Enter your email"
          className="subscribe-input"
        />
        <button className="subscribe-btn">Subscribe</button>
      </div>
    </div>
  );
}
