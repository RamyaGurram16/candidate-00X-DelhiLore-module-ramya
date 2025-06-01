import React, { useState } from 'react';
import './Header.css';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <header className="header">
      <div className="logo">DelhiLore</div>

      <nav className={`nav-links ${menuOpen ? 'open' : ''}`}>
        <a href="/">Home</a>
        <a href="#stories">Stories</a>
        <a href="#submit">Submit</a>
      </nav>

      <div className="menu-icon" onClick={toggleMenu}>
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </div>
    </header>
  );
};

export default Header;
