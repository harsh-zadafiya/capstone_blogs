import React from "react";
import Button from "../../components/button/button.component";
import { Link } from "react-router-dom";
import "./home-page.styles.scss";

import path from "../../constants/paths";

const HomePage = () => {
  return (
    <div className="home-page">
      <h1>Send a Blog Approval request now.</h1>
      <Link to={path.ADD_NEW_BLOG}>
        <Button>Publish Your Blog</Button>
      </Link>
    </div>
  );
};

export default HomePage;
