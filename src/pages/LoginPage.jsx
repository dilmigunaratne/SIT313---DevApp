import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/AuthPages.css";
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);

  // 🔎 Watch auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/"); // Redirect after login
    } catch (err) {
      console.error(err);
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login"); // Redirect after logout
    } catch (err) {
      console.error("Error signing out: ", err);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>{user ? "Welcome" : "Login"}</h2>

        {!user ? (
          // 🔐 Login Form
          <form onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-field"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-field"
              required
            />
            <button type="submit" className="auth-btn" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
            {error && <p className="error-msg">{error}</p>}
          </form>
        ) : (
          // ✅ Show Sign Out button if logged in
          <button onClick={handleLogout} className="auth-btn">
            Sign Out
          </button>
        )}

        {!user && (
          <p>
            Don't have an account?{" "}
            <span className="link" onClick={() => navigate("/signup")}>
              Sign up
            </span>
          </p>
        )}
      </div>
    </div>
  );
}
