import React from "react";
import "./login-page.styles.scss";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from "../../components/button/button.component";
import { Link } from "react-router-dom";
import InputField from "../../components/input-field/input-field.component";
import { submitted, setLoginUser } from "../../redux/isLogin.reducers";
import path from "../../constants/paths";
import axios from "axios";
import bannerVideo from "../../assets/bannerVideo.mp4";

function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const submitEvent = async (event) => {
    event.preventDefault();
    var { uname, pass } = document.forms[0];
    var emailNotFound = true;

    try {
      const response = await axios.post(
        "https://stirring-puffpuff-37664f.netlify.app//user/login",
        {
          email: uname.value,
          password: pass.value,
        }
      );

      if (response.data.status) {
        const { user, token } = response.data;
        if (user.isBlocked) {
          alert("Your account is blocked. Please contact support.");
          return; // Exit the function early
        } else {
          emailNotFound = false;
          localStorage.setItem("token", token);
          dispatch(submitted());
          dispatch(setLoginUser(user));
          navigate(path.HOME);
        }
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          alert("Invalid credentials. Please try again.");
        }
      } else if (error.request) {
        alert("Network error. Please check your internet connection.");
      } else {
        console.error("Error logging in:", error.message);
        alert("An unexpected error occurred. Please try again later.");
      }
    }

    if (emailNotFound) {
      alert("Please enter valid credentials.");
    }
  };

  return (
    <div className="app_login">
      <div className="video-wrapper">
        <video autoPlay loop muted>
          <source src={bannerVideo} type="video/mp4" />
        </video>
      </div>
      <div className="login_div">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div className="title_login_bid" style={{ fontSize: "20px" }}>
            CANADA<span style={{ color: "#1091e1" }}>4</span>YOU
          </div>
          <div className="title_login">
            <b>Login</b>
          </div>
        </div>

        <div className="form">
          <form onSubmit={submitEvent}>
            <div className="input-con-login">
              <InputField
                type="email"
                name="uname"
                required
                id="uname"
                label="Email ID :"
                pattern="^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,63})$"
              />
            </div>

            <div className="input-con-login">
              <InputField
                type="password"
                name="pass"
                required
                id="pass"
                label="Password :"
              />
            </div>

            <div className="button_con_login">
              <Button type="submit">Submit</Button>
            </div>

            <br />
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
            <br />
            <div className="sign-up-option">
              <h4
                style={{
                  fontSize: "12px",
                }}
              >
                Don't have an account?{" "}
                <Link
                  style={{
                    color: "#1091e1",
                    fontWeight: "bold",
                    fontSize: "12px",
                  }}
                  to={path.REGISTRATION}
                >
                  Create One
                </Link>
              </h4>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
