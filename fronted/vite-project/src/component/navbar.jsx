import { Link } from "react-router-dom";
import "../componentcss/navbar.css"; 
import { useState } from "react";
import logoImage from '../assets/logo.png'; // Ensure to put the correct path to your logo image

export const Navbar = () => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const handleMouseEnter = () => {
    setDropdownVisible(true);
  };

  const handleMouseLeave = () => {
    setDropdownVisible(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <div className="navbar-logo">
          <Link to="/">
            <img src={logoImage} alt="Logo" className="logo-image" />
          </Link>
        </div>

        <ul className="navbar-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/men">Men</Link></li>
          <li><Link to="/women">Women</Link></li>
          <li><Link to="/kids">Kids</Link></li>
        </ul>
      </div>

      <div className="navbar-search">
        <input
          type="text"
          placeholder="Search for products, brands, and more"
          className="search-input"
        />
      </div>

      <div className="navbar-right">
        <Link to="/seller" className="seller-link">
          Become a Seller
        </Link>

        <div
          className="login-dropdown"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <Link to="/login" className="login-icon" aria-haspopup="true" aria-expanded={isDropdownVisible}>
            <i className="fa-regular fa-user"></i> Login
          </Link>
          
          {isDropdownVisible && (
            <div className="dropdown-content" aria-labelledby="login">
              <Link to="/signup">New Customer? Sign Up</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};
