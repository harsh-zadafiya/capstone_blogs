import React from "react";

const Dropdown = ({ label, error, ...otherProps }) => (
  <div className="group">
    <label className="form__label" id={otherProps.id}>
      {label}
      <span className="required">{otherProps.required ? " *" : ""}</span>
    </label>
    <select className="form__field" {...otherProps}>
      <option value="">-- Please Select Category --</option>
      <option value="travelling">Traveling</option>
      <option value="food">Food</option>
    </select>
    {error ? <span className="field__error-msg">{error}</span> : null}
  </div>
);

export default Dropdown;
