import React from 'react';
import { Link } from 'react-router-dom'; 
import './Navbar.css'; 

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">EventBooking</Link> 
      </div>
      <ul className="navbar-links">
        <li>
          <Link to="/">Accueil</Link> 
        </li>
        <li>
          <Link to="/events">Événements</Link> 
        </li>
        <li>
          <Link to="/cart">Panier</Link> 
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;