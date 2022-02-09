import React from "react";
import { Link } from "react-router-dom";

const Header = ({ title, user, logout }) => {
  const handleLoginLogout = () => {
    if (user) {
      localStorage.clear();
      logout();
    }
  };

  return (
    <header className="no-print">
      <nav
        className="navbar p-l-20 p-r-20 p-t-10 p-b-10"
        role="navigation"
        aria-label="main navigation"
      >
        <div className="navbar-brand">
          <div className="navbar-item">
            <h1 className="title">
              <span>Resume</span>
              {title || " Guru"}
            </h1>
          </div>

          <div
            role="button"
            className="navbar-burger burger"
            aria-label="menu"
            aria-expanded="false"
            data-target="navbarBasicExample"
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </div>
        </div>

        <div id="navbarBasicExample" className="navbar-menu">
          <div className="navbar-end">
            {user ? (
              <div className="navbar-item">
                <Link to="/resume">Resume</Link>
              </div>
            ) : (
              ""
            )}

            <div className="navbar-item">
              <div className="buttons">
                {user ? (
                  <button
                    className="button is-link"
                    onClick={handleLoginLogout}
                  >
                    <Link to="/login" className="has-text-white">
                      {user ? "Log out" : "Log in"}
                    </Link>
                  </button>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
