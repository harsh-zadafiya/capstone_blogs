import React from "react";
import WithFormHandler from "../WithSellCar";
import TextArea from "../../../components/textarea/textarea.component";
import { ButtonWrapper, Form } from "../step-one/step-one.styles";
import { direction } from "../../../constants/sellCar";
import InputField from "../../../components/input-field/input-field.component";
import Button from "../../../components/button/button.component";

const emptyDataSet = {
  authorName: "",
  location: "",
  blogDetails: "",
  blogNotes: "",
};

const StepTwo = ({
  switchTab,
  formData,
  errorMessage,
  handleOnChange,
  handleSubmit,
  onInvalid,
  onBlur,
}) => {
  const {
    authorName,
    location,
    blogDetails,
    blogNotes,
  } = formData;
  const {
    authorName: authorNameError,
    location: locationError,
    blogDetails: blogDetailsError,
    blogNotes: blogNotesError,
  } = errorMessage;

  return (
    <Form onSubmit={handleSubmit} noValidate>
      <InputField
        label=" Author Name"
        type="text"
        id="authorName"
        name="authorName"
        value={authorName}
        error={authorNameError}
        handleOnChange={handleOnChange}
        required
        onInvalid={onInvalid}
        onBlur={onBlur}
        pattern="^[a-zA-Z\s]*$"
        title="Please enter only letters"
      />
      <InputField
        label="Location"
        type="text"
        id="location"
        name="location"
        value={location}
        error={locationError}
        onChange={handleOnChange}
        required
        onInvalid={onInvalid}
        onBlur={onBlur}
        pattern="^[a-zA-Z\s]*$"
        title="Please enter only letters"
      />
      <TextArea
        label="Details of Blog"
        id="blogDetails"
        name="blogDetails"
        rows="6"
        value={blogDetails}
        error={blogDetailsError}
        onChange={handleOnChange}
        required
        maxLength={1800}
        onInvalid={onInvalid}
        onBlur={onBlur}
      />
      <TextArea
        label="Blog Notes"
        id="blogNotes"
        name="blogNotes"
        rows="6"
        value={blogNotes}
        error={blogNotesError}
        onChange={handleOnChange}
        maxLength={1800}
        onInvalid={onInvalid}
        onBlur={onBlur}
      />
      <ButtonWrapper>
        <Button
          type="button"
          onClick={() => {
            switchTab(direction.PREVIOUS, formData);
          }}
        >
          Previous
        </Button>
        <Button type="=submit">Continue</Button>
      </ButtonWrapper>
    </Form>
  );
};

export default WithFormHandler(StepTwo, emptyDataSet);
