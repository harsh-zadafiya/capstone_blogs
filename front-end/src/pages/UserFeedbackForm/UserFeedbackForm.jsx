import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button, InputField } from '../../components';
// import { ButtonWrapper } from "../../../style/Form";
import { FormPageWrapper, FormWrapperContainer, ButtonWrapper } from "../../style/Form";
import styled from "styled-components";

const UserFeedbackForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const initialState = {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
    };
    const [formData, setFormData] = useState(initialState);

    const [errorMessage, setErrorMessage] = useState("");

    const { firstName, lastName, email, password } = formData;

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Add your form submission logic here
    };

    const FormTitle = styled.h2`
    font-size: 2.4rem;
`;

    return (
        <FormPageWrapper>
            <FormWrapperContainer onSubmit={handleSubmit}>
                <FormTitle>User Feedback</FormTitle>
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
                    label="Issue Description"
                    type="textarea"
                    name="password"
                    id="password"
                    value={password}
                    onChange={onChange}
                    required
                />
                <ButtonWrapper>
                    <Button full type="submit">
                        Modify Profile
                    </Button>
                </ButtonWrapper>
            </FormWrapperContainer>
        </FormPageWrapper>
    );
};

export default UserFeedbackForm;