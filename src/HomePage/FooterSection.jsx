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
            <li><a href="/faqs">FAQs</a></li>
            <li><a href="/help">Help</a></li>
            <li><a href="/contact">Contact Us</a></li>
          </ul>
        </div>

        <div className="footer-column">
          <h4>Stay Connected</h4>
          <div className="social-icons">
            <a href="/instagram"><FaInstagram /></a>
            <a href="/facebook"><FaFacebook /></a>
            <a href="/twitter"><FaTwitter /></a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p className="footer-copy">DEV@Deakin 2022</p>
        <ul className="footer-links">
          <li><a href="/privacy">Privacy Policy</a></li>
          <li><a href="/terms">Terms</a></li>
          <li><a href="/code-of-conduct">Code of Conduct</a></li>
        </ul>
      </div>
    </footer>
  );
}
