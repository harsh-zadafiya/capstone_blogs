import { useState } from "react";
import axios from "../../../utils/axios";
import { useDispatch } from "react-redux";
import { updateUser } from "../../../redux/user/user.reducer";
import { Link, useNavigate } from "react-router-dom";
import path from "../../../constants/path";
import { ButtonWrapper, ErrorMessage, FormWrapper } from "../../../style/Form";
import { Button, InputField } from "../../";

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialState = {
    email: "",
    password: "",
  };
  const [formData, setFormData] = useState(initialState);
  const [errorMessage, setErrorMessage] = useState(initialState);
  const [globalError, setGlobalError] = useState("");

  const { email, password } = formData;

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
      try {
        const { data: response } = await axios.post("/user/login", formData);

        dispatch(updateUser(response.user));
        navigate(path.HOME);
      } catch (err) {
        setGlobalError(err.response.data.message);
      }
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
        value={email}
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
        minLength="8"
      />
      <ButtonWrapper>
        <Button full type="submit">
          Login
        </Button>
      </ButtonWrapper>
      <h4 style={{ textAlign: "right" }}>
        <Link
          style={{
            color: "#1091e1",
            fontSize: "12px",
            fontWeight: "bold",
          }}
          to={path.FORGOT}
        >
          forgot password?
        </Link>
      </h4>
    </FormWrapper>
  );
};

export default LoginForm;
