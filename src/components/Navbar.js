import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../css/Navbar.css';
import logo from '../Assets/images/logo.png';
// import logo from '../images/motionLogo.png';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Get the current location

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLinkClick = (id) => {
    if (location.pathname !== '/') {
      // Navigate to the home page first if not already there
      navigate('/');
      // Wait for navigation to complete, then scroll to the section
      setTimeout(() => scrollToSection(id), 50); // Small delay to ensure the home page is rendered
    } else {
      // If already on the home page, scroll directly
      scrollToSection(id);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <a href="/" id='nav-home-link'>
          <img src={logo} alt="MotionCSS Logo" id="navLogo" />
		  <h2>Rubik's Mosaic Generator</h2>
        </a>
      </div>

      <div className="navbar-links">
        <a
          href="#mosaic-display"
          onClick={(e) => {
            e.preventDefault();
            handleLinkClick('mosaic-display');
          }}
        >
          Generator
        </a>



        <a
          href="#support"
          onClick={(e) => {
            e.preventDefault();
            handleLinkClick('support');
          }}
        >
          Support
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
