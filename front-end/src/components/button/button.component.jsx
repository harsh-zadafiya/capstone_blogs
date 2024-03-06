import React from "react";
import "./button.styles.scss";

const Button = ({ text, children, ...otherProps }) => (
  <button className="btn btn--primary" {...otherProps}>
    {children}
  </button>
);

export default Button;
