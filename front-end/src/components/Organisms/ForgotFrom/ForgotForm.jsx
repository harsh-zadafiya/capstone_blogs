import { useState } from "react";
import axios from "../../../utils/axios";
import { useDispatch } from "react-redux";
import { updateUser } from "../../../redux/user/user.reducer";
import { Link, useNavigate } from "react-router-dom";
import path from "../../../constants/path";
import { ButtonWrapper, ErrorMessage, FormWrapper } from "../../../style/Form";
import { Button, InputField } from "../../";

const ForgotForm = () => {
  const initialState = {
    email: "",
    password: "",
  };
  const [errorMessage, setErrorMessage] = useState(initialState);
  const [globalError, setGlobalError] = useState("");
  const [inputs, setInputs] = useState({});
  const navigate = useNavigate();

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (inputs.password === inputs.conPassword) {
      try {
        axios({
          method: "post",
          url: "http://localhost:8003/api/v1/user/forgot",
          data: {
            email: inputs.email,
            password: inputs.password,
          },
          headers: {
            "Content-type": "application/json",
          },
        })
          .then((res) => {
            if (res.data.status) {
              alert("Password is succesfully updated");
              navigate(path.LOGIN);
            } else {
              alert("Email not found.");
              console.log(res.data.message);
            }
          })
          .catch((error) => {
            alert(error.response.data.message);
            console.log(error);
          });
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("Password dose not match.");
    }
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

  return (
    <FormWrapper noValidate onSubmit={handleSubmit}>
      {globalError && <ErrorMessage>{globalError}</ErrorMessage>}
      <InputField
        label="Email"
        type="email"
        name="email"
        id="email"
        onChange={handleChange}
        onBlur={handleBlur}
        onInvalid={handleInvalid}
        required
        value={inputs.email}
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
        value={inputs.password}
        error={errorMessage.password}
        required
        minLength="8"
      />
      <InputField
        label="Confirm"
        type="password"
        name="conPassword"
        id="conPassword"
        onChange={handleChange}
        onBlur={handleBlur}
        onInvalid={handleInvalid}
        value={inputs.conPassword}
        error={errorMessage.conPassword}
        required
        minLength="8"
      />
      <ButtonWrapper>
        <Button full type="submit">
          Update Password
        </Button>
      </ButtonWrapper>
    </FormWrapper>
  );
};

export default ForgotForm;
