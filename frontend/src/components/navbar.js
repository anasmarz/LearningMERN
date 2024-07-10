// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.css'; // Optional: Include a CSS file for styling

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/profile">Profile</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
