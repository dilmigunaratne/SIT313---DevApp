import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/AuthPages.css";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";

export default function SignupPage() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);
  
    try {
      console.log("Starting signup...");
  
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log("Auth success:", userCredential.user.uid);
  
      await setDoc(doc(db, "users", userCredential.user.uid), {
        name,
        lastName,
        email,
        createdAt: new Date().toISOString(),
      });
      console.log("Firestore write success");
  
      setSuccess("Account created successfully!");
      setTimeout(() => navigate("/"), 1500);
  
    } catch (err) {
      console.error("Signup failed:", err);
      setError(err.message || "Signup failed. Please try again.");
    } finally {
      console.log("Finally block reached, resetting loading");
      setLoading(false);
    }
  };
  
  
  
  

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Create Account</h2>
        <form onSubmit={handleSignup}>
          <input
            type="text"
            placeholder="First Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input-field"
            required
          />
          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="input-field"
            required
          />
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
            {loading ? "Creating..." : "Sign Up"}
          </button>
          {success && <p className="success-msg">{success}</p>}
          {error && <p className="error-msg">{error}</p>}
        </form>
        <p>
          Already have an account?{" "}
          <span className="link" onClick={() => navigate("/login")}>
            Login
          </span>
        </p>
      </div>
    </div>
  );
}
