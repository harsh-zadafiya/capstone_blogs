import { useState } from "react";
import axios from "../../../utils/axios";
import { useDispatch } from "react-redux";
import { updateUser } from "../../../redux/user/user.reducer";
import { useNavigate } from "react-router-dom";
import path from "../../../constants/path";
import { Button, InputField } from "../../";

import { ButtonWrapper, FormWrapper } from "../../../style/Form";

const SignUpForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const initialState = {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
    };
    const [formData, setFormData] = useState(initialState);

    const [errorMessage, setErrorMessage] = useState(initialState);

    const { firstName, lastName, email, password } = formData;

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleInvalid = (e) => {
        const { name, validationMessage } = e.target;

        setErrorMessage((prevState) => ({
            ...prevState,
            [name]: validationMessage,
        }));
    };

    const handleBlur = (e) => {
        const { name, validationMessage } = e.target;

        const isValid = e.target.checkValidity();

        if (!validationMessage || !isValid) {
            setErrorMessage((prevState) => ({
                ...prevState,
                [name]: validationMessage,
            }));
        } else {
            setErrorMessage((prevState) => ({
                ...prevState,
                [name]: "",
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const isValid = e.target.checkValidity();

        if (isValid) {
            const { data: response } = await axios.post("/user", formData);

            dispatch(updateUser(response.user));
            navigate(path.APP);
        }
    };

    return (
        <FormWrapper noValidate onSubmit={handleSubmit}>
            <InputField
                label="First Name"
                type="text"
                name="firstName"
                id="firstName"
                onChange={handleChange}
                onBlur={handleBlur}
                onInvalid={handleInvalid}
                value={firstName}
                error={errorMessage.firstName}
                placeholder="John"
                required
            />
            <InputField
                label="Last Name"
                type="text"
                name="lastName"
                id="lastName"
                onChange={handleChange}
                onBlur={handleBlur}
                onInvalid={handleInvalid}
                required
                value={lastName}
                placeholder="Doe"
                error={errorMessage.lastName}
            />
            <InputField
                label="Email"
                type="email"
                name="email"
                id="email"
                onChange={handleChange}
                onBlur={handleBlur}
                onInvalid={handleInvalid}
                required
                value={email}
                placeholder="yourname@domain.com"
                error={errorMessage.email}
            />
            <InputField
                label="Password"
                type="password"
                name="password"
                id="password"
                onChange={handleChange}
                onBlur={handleBlur}
                onInvalid={handleInvalid}
                value={password}
                error={errorMessage.password}
                required
                placeholder="Min 8 characters"
                minLength="8"
            />
            <ButtonWrapper>
                <Button full type="submit">
                    Sign Up
                </Button>
            </ButtonWrapper>
        </FormWrapper>
    );
};

export default SignUpForm;
