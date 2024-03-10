import React from "react";

import InputField from "../../../components/input-field/input-field.component";

import WithFormHandler from "../WithSellCar";
import { ButtonWrapper, Form } from "./step-one.styles";
import Dropdown from "../../../components/dropdown/dropdown.components";
import Button from "../../../components/button/button.component";

const emptyDataSet = {
  blogTitle: "",
  blogYear: "",
  subTitle: "",
  category: "",
};

const StepOne = ({
  switchTab,
  formData,
  errorMessage,
  handleOnChange,
  handleSubmit,
  onInvalid,
  onBlur,
  action,
}) => {
  const { blogTitle, blogYear, subTitle, category } =
    formData;
  const {
    blogTitle: blogTitleError,
    blogYear: blogYearError,
    subTitle: subTitleError,
    category: categoryError,
  } = errorMessage;

  return (
    <Form onSubmit={handleSubmit} noValidate>
      <InputField
        label="Blog Tilte"
        type="text"
        id="carCompany"
        name="carCompany"
        value={blogTitle}
        error={blogTitleError}
        handleOnChange={handleOnChange}
        required
        onInvalid={onInvalid}
        onBlur={onBlur}
        pattern="^[a-zA-Z\s]*$"
        title="Please enter only letters"
      />
      <InputField
        label="Year of Add"
        type="text"
        id="car-model"
        name="carModel"
        value={blogYear}
        error={blogYearError}
        handleOnChange={handleOnChange}
        required
        onInvalid={onInvalid}
        onBlur={onBlur}
      />
      {/* <InputField
        label=""
        type="number"
        id="car-mileage"
        name="carMileage"
        value={carMileage}
        error={carMileageError}
        handleOnChange={handleOnChange}
        required
        onInvalid={onInvalid}
        onBlur={onBlur}
      /> */}
      {/* <InputField
        label="Car Engine"
        type="text"
        id="car-engine"
        name="carEngine"
        value={carEngine}
        error={carEngineError}
        handleOnChange={handleOnChange}
        required
        onInvalid={onInvalid}
        onBlur={onBlur}
      /> */}
      <InputField
        disabled={action === "update"}
        label="Blog Sub Title"
        type="text"
        id="vin"
        name="vin"
        value={subTitle}
        error={subTitleError}
        handleOnChange={handleOnChange}
        required
        onInvalid={onInvalid}
        onBlur={onBlur}
        title="Can only contain alphanumeric characters without whitespace"
      />
      <Dropdown
        label="Category"
        name="transmission"
        id="transmission"
        value={category}
        onChange={handleOnChange}
        error={categoryError}
        required
        onInvalid={onInvalid}
        onBlur={onBlur}
      />
      <ButtonWrapper>
        <Button type="=submit">Continue</Button>
      </ButtonWrapper>
    </Form>
  );
};

export default WithFormHandler(StepOne, emptyDataSet);
