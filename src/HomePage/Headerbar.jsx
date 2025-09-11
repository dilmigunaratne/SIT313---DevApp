// src/components/Headerbar.jsx
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase"; // ✅ import firebase auth
import { onAuthStateChanged, signOut } from "firebase/auth";
import "../styles/Header.css";

export default function Headerbar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // ✅ Track login state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // ✅ Handle sign out
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate("/login"); // redirect to login after logout
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

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
        <Link to="/" className="Header-link">Home</Link>
        <Link to="/post" className="Header-link">Post</Link>

        {/* ✅ Show Login if logged out, Sign Out if logged in */}
        {user ? (
          <button onClick={handleSignOut} className="Header-link btn-logout">
            Sign Out
          </button>
        ) : (
          <Link to="/login" className="Header-link">Login</Link>
        )}
      </div>
    </header>
  );
}
