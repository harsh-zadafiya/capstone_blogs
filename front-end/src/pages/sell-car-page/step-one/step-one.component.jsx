import React from "react";
import { useState } from "react";
import InputField from "../../../components/input-field/input-field.component";

import { direction } from "../../../constants/sellCar";

const StepOne = ({ switchTab, initialData, action }) => {
  const emptyDataSet = {
    blogTitle: "",
    blogYear: "",
    subTitle: "",
  };
  const INITIAL_STATE =
    Object.keys(initialData).length === 0 ? emptyDataSet : initialData;

  const [formData, setFormData] = useState(INITIAL_STATE);
  const [errorMessage, setErrorMessage] = useState(emptyDataSet);

  const { blogTitle, blogYear, subTitle } = formData;
  const {
    blogTitle: blogTitleError,
    blogYear: blogYearError,
    subTitle: subTitleError,
  } = errorMessage;

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const target = e.target;
    const isValid = target.checkValidity();

    if (isValid) {
      switchTab(direction.NEXT, formData);
    }
  };

  console.log(action === "update");

  return (
    <form onSubmit={handleSubmit} noValidate>
      <InputField
        label="Car Company"
        type="text"
        id="blogTitle"
        name="blogTitle"
        value={blogTitle}
        error={blogTitleError}
        handleOnChange={handleOnChange}
        required
      />
      <InputField
        label="Car Model"
        type="text"
        id="blogYear"
        name="blogYear"
        value={blogYear}
        error={blogYearError}
        handleOnChange={handleOnChange}
        required
      />
      <InputField
        disabled={action !== "update"}
        label="Vehicle Identification Number (VIN)"
        type="text"
        id="subTitle"
        name="subTitle"
        value={subTitle}
        error={subTitleError}
        handleOnChange={handleOnChange}
        required
      />
      <button
        type="button"
        onClick={() => {
          switchTab(direction.PREVIOUS, formData);
        }}
      >
        Previous
      </button>
      <button type="=submit">Continue</button>
    </form>
  );
};

export default StepOne;
