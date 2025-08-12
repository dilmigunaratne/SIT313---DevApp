import React from "react";
import '../styles/Header.css';
import { Link } from 'react-router-dom';

export default function Headerbar() {
  return (
    <header className="Header-bar">
      <div className="Header-title">DEV@Deakin</div>
      
      <div className="Header-center">
        <input 
          type="text" 
          placeholder="Search..." 
          className="search-bar" 
        />
      </div>
      
      <div className="Header-links">

        <Link to ="/" className="Header-link">Home</Link>
        <Link to="/post" className="Header-link">Post</Link>
        <Link to="/login" className="Header-link">Login</Link>
        
      </div>
    </header>
  );
}
