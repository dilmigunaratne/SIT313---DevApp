import React from "react";
import "../styles/Footer.css";
import { FaInstagram, FaFacebook, FaTwitter } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-column">
          <h4>Explore</h4>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/questions">Questions</a></li>
            <li><a href="/articles">Articles</a></li>
            <li><a href="/tutorials">Tutorials</a></li>
          </ul>
        </div>

        <div className="footer-column">
          <h4>Support</h4>
          <ul>
            <li>FAQs</li>
            <li>Help</li>
            <li>Contact Us</li>
          </ul>
        </div>

        <div className="footer-column">
          <h4>Stay Connected</h4>
          <div className="social-icons">
            <span><FaInstagram /></span>
            <span><FaFacebook /></span>
            <span><FaTwitter /></span>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p className="footer-copy">DEV@Deakin 2022</p>
        <ul className="footer-links">
          <li>Privacy Policy</li>
          <li>Terms</li>
          <li>Code of Conduct</li>
        </ul>
      </div>
    </footer>
  );
}
