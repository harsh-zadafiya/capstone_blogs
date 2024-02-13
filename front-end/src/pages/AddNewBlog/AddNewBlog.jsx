import React, { useState } from "react";
import { InputField, Button } from "../../components";
// import { ButtonWrapper } from "../../../style/Form";
import { useNavigate } from "react-router-dom";
import { FormPageWrapper, FormWrapperContainer, ButtonWrapper } from "../../style/Form";
import styled from "styled-components";

const AddNewBlog = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    topic: "Select all",
    image: null,
  });

  const { title, description, topic, image } = formData;

  const onChange = (e) => {
    if (e.target.name === "image") {
      // Handling file input
      setFormData({ ...formData, [e.target.name]: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your form submission logic here
  };

  const FormTitle = styled.h2`
    font-size: 2.4rem;
`;

  return (
    <FormPageWrapper>
      <FormWrapperContainer onSubmit={handleSubmit}>
        <FormTitle>Add New Blog</FormTitle>
        <InputField
          label="Blog Name"
          type="text"
          name="title"
          id="title"
          value={title}
          onChange={onChange}
          required
        />
        {/* <TextareaField
          label="Blog Content"
          name="description"
          id="description"
          value={description}
          onChange={onChange}
          required
        /> */}
        {/* <SelectField
          label="Select Topic"
          name="topic"
          id="topic"
          value={topic}
          onChange={onChange}
          required
        >
          <option value="Select all">Select all</option>
          <option value="food">Food</option>
          <option value="sports">Sports</option>
          <option value="travel">Travel</option>
          <option value="fashion">Fashion</option>
          <option value="health">Health</option>
        </SelectField> */}
        {/* <ImageUpload
          type="file"
          name="image"
          id="image"
          onChange={onChange}
          required
        /> */}
        <ButtonWrapper>
          <Button full type="submit">
            Add Blog
          </Button>
        </ButtonWrapper>
      </FormWrapperContainer>
    </FormPageWrapper>
  );
};


export default AddNewBlog;