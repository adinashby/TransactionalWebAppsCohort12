import React from "react";

import { Link, useLocation } from "react-router-dom";

const Header = ({ lang }) => {
  const location = useLocation();

  const switchLanguage = (newLang) => {
    const pathSegments = location.pathname.split("/");
    pathSegments[1] = newLang;

    return pathSegments.join("/");
  };

  return (
    <div className="header">
      <div className="nav-links">
        <Link to={`/${lang}`}>Home</Link>
        <Link to={`/${lang}/about`}>About</Link>
      </div>
      <div className="locale-options">
        <Link to={switchLanguage("en")}>EN</Link>
        <Link to={switchLanguage("fr")}>FR</Link>
      </div>
    </div>
  );
};

export default Header;
