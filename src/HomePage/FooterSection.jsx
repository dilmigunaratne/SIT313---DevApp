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
            <li><a href="#">Home</a></li>
            <li><a href="#">Questions</a></li>
            <li><a href="#">Articles</a></li>
            <li><a href="#">Tutorials</a></li>
          </ul>
        </div>

        <div className="footer-column">
          <h4>Support</h4>
          <ul>
            <li><a href="#">FAQs</a></li>
            <li><a href="#">Help</a></li>
            <li><a href="#">Contact Us</a></li>
          </ul>
        </div>

        <div className="footer-column">
          <h4>Stay Connected</h4>
          <div className="social-icons">
            <a href="#"><FaInstagram /></a>
            <a href="#"><FaFacebook /></a>
            <a href="#"><FaTwitter /></a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p className="footer-copy">DEV@Deakin 2022</p>
        <ul className="footer-links">
          <li><a href="#">Privacy Policy</a></li>
          <li><a href="#">Terms</a></li>
          <li><a href="#">Code of Conduct</a></li>
        </ul>
      </div>
    </footer>
  );
}
