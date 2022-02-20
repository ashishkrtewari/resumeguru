import React from "react";
import { Link } from "react-router-dom";
import BrandLogo from "./BrandLogo";

const Header = ({ user, logout }) => {
  const handleLoginLogout = () => {
    if (!user?.email) {
      const response = window.confirm(
        "If you go back to the Login/Signup page, your current resume date will be lost. Continue?"
      );
      if (!response) {
        return;
      }
    }
    if (user) {
      localStorage.clear();
      logout();
    }
  };

  return (
    <header className="no-print">
      <nav
        className="navbar is-flex p-l-20 p-r-20 p-t-10 p-b-10"
        role="navigation"
        aria-label="main navigation"
      >
        <div className="navbar-brand">
          <div className="navbar-item">
            <h1 className="title">
              <BrandLogo />
            </h1>
          </div>
        </div>
        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              <button className="button is-link" onClick={handleLoginLogout}>
                <Link to="/login" className="has-text-white">
                  {user.email ? "Logout" : "Signup"}
                </Link>
              </button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
