import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  FormPageWrapper,
  FormWrapperContainer,
  ButtonWrapper,
} from "../../style/Form";
import styled from "styled-components";
import { InputField, Button } from "../../components";

const ModifyUserProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialState = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  };
  const [formData, setFormData] = useState(initialState);

  const [showForm, setShowForm] = useState(false);

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const { firstName, lastName, email, password } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    //  form submission logic to be added in next sprint
  };

  const FormTitle = styled.h2`
    font-size: 2.4rem;
  `;

  return (
    <FormPageWrapper>
      <FormWrapperContainer>
        <FormTitle>Modify Profile</FormTitle>
        <h2>Do you want to modify your profile?</h2>
        <ButtonWrapper>
          <Button onClick={toggleForm}>Modify</Button>
        </ButtonWrapper>
        <ButtonWrapper>
          <Button onClick={toggleForm}>No</Button>
        </ButtonWrapper>

        {showForm && (
          <form onSubmit={handleSubmit}>
            <InputField
              label="First Name"
              type="text"
              name="firstName"
              id="firstName"
              value={firstName}
              onChange={onChange}
              required
            />
            <InputField
              label="Last Name"
              type="text"
              name="lastName"
              id="lastName"
              value={lastName}
              onChange={onChange}
              required
            />
            <InputField
              label="Email"
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={onChange}
              required
            />
            <InputField
              label="Contact Number"
              type="tel"
              name="contactNumber"
              id="contactNumber"
              onChange={onChange}
              required
            />
            <InputField
              label="Profile Photo"
              type="file"
              name="profilePhoto"
              id="profilePhoto"
              onChange={onChange}
              accept="image/*"
            />
            <ButtonWrapper>
              <Button full type="submit">
                Save Changes
              </Button>
            </ButtonWrapper>
          </form>
        )}
      </FormWrapperContainer>
    </FormPageWrapper>
  );
};

export default ModifyUserProfile;
