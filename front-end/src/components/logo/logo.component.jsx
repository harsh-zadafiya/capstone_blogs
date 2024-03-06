import React from "react";
import { Link } from "react-router-dom";
import path from "../../constants/paths";
import "./logo.styles.scss";

const Logo = () => (
  <div className="logo">
    <Link to={path.HOME}>
      CANADA <span className="middle">4</span> <span>YOU</span>
    </Link>
  </div>
);

export default Logo;
