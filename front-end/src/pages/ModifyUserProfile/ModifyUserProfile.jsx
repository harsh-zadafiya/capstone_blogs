import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  FormPageWrapper,
  FormWrapperContainer,
  ButtonWrapper,
} from "../../style/Form";
import styled from "styled-components";
import { InputField, Button } from "../../components";
import axios from "../../utils/axios";
import path from "../../constants/path";

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
  const [mounted, setMounted] = useState(true);
  const [formType, setFormType] = useState("");

  const { firstName, lastName, email, password, conPassword } = formData;

  useEffect(() => {
    axios({
      method: "get",
      url: "http://localhost:8003/api/v1/user/session",
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    })
      .then((res) => {
        console.log("dfdsgds", res.data.user);

        if (mounted) {
          if (res.data.status) {
            setFormData({
              firstName: res.data.user.firstName,
              lastName: res.data.user.lastName,
              email: res.data.user.email,
            });
          } else {
            alert(res.data.message);
            // dispatch(notSubmitted());
            navigate(path.LOGIN);
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });

    return () => {
      setMounted(false);
    };
  }, [dispatch, mounted, navigate]);

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password === conPassword) {
      try {
        axios({
          method: "post",
          url: "http://localhost:8003/api/v1/user/updateprofile",
          headers: {
            "x-access-token": localStorage.getItem("token"),
          },
          data: {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
          },
        })
          .then((res) => {
            if (res.data.status) {
              localStorage.removeItem("token");
              localStorage.setItem("token", res.data.newToken);
              alert(res.data.message);
              navigate(path.HOME);
            } else if (!res.data.userUpdate) {
              alert(res.data.message);
            } else {
              alert(res.data.message);
              navigate(path.LOGIN);
            }
          })
          .catch((error) => {
            console.log(error);
          });
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("Passwords do not match. Please try again.");
    }
  };

  const FormTitle = styled.h2`
    font-size: 2.4rem;
  `;

  return (
    <FormPageWrapper>
      <FormWrapperContainer>
        <FormTitle>Modify Profile</FormTitle>
        <h2>Do you want to modify Profile or upload Profile Picture?</h2>
        <ButtonWrapper>
          <Button onClick={() => setFormType("modify")}>Modify</Button>
        </ButtonWrapper>
        <ButtonWrapper>
          <Button onClick={() => setFormType("upload")}>
            Upload Profile Picture
          </Button>
        </ButtonWrapper>

        {formType === "modify" && (
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
              label="Password"
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={onChange}
              required
            />
            <InputField
              label="Confirm Password"
              type="conPassword"
              name="conPassword"
              id="conPassword"
              value={conPassword}
              onChange={onChange}
              required
            />

            <ButtonWrapper>
              <Button full type="submit">
                Save Changes
              </Button>
            </ButtonWrapper>
          </form>
        )}

        {formType === "upload" && (
          <form onSubmit={handleSubmit}>
            <InputField
              label="Profile Photo"
              type="file"
              name="profilePhoto"
              id="profilePhoto"
              onChange={onChange}
              accept="image/*"
            />
          </form>
        )}
      </FormWrapperContainer>
    </FormPageWrapper>
  );
};

export default ModifyUserProfile;
