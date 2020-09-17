import React, { Component } from 'react';
import { Link } from 'react-router-dom';
//import PropTypes from 'prop-types';

const Header = () => {

  return (
    <nav className="navbar navbar-expand-sm navbar-light bg-light">
      <div className="container">
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarTogglerDemo01"
          aria-controls="navbarTogglerDemo01"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
          <a className="navbar-brand" href="#">
            Bookstore
          </a>
        </div>
        <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
          <li className="nav-item">
            <Link to="/books" className="nav-link">
              Books
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/categories" className="nav-link">
              Categories
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/publishers" className="nav-link">
              Publishers
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/authors" className="nav-link">
              Authors
            </Link>
          </li>
        </ul>

      </div>
    </nav>
  );
}

// Header.propTypes = {
//   auth: PropTypes.object.isRequired,
//   logout: PropTypes.func.isRequired,
// };


export default Header;
