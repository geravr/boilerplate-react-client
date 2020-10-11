import React from "react";
import { Link } from "react-router-dom";
import logo from "../logo.svg";

const Logo = () => {
  return (
    <div className="logo">
      <Link to="/">
        <img src={logo} alt="logo" height="20" />
        <span>React</span>
      </Link>
    </div>
  );
};

export default Logo;
