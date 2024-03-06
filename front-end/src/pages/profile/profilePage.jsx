import styled from "styled-components";
import { FcGoogle } from "react-icons/fc";
import Stripe from "../../assets/stripe.png";
import { useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { notSubmitted, setNullUser } from "../../redux/isLogin.reducers";
import path from "../../constants/paths";
import axios from "axios";
import { RedButton } from "../../components/CarCard/CarCard.styels";
import Modal from "../../components/Modal/Modal.jsx";
import UpdateProfilePage from "../update-profile-page/update-profile.component";

const ProfilePage = () => {
  const [isOpen, SetIsOpen] = useState(false);
  const [isShow, setIsShow] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [isLogout, setIsLogout] = useState(false);
  const stripePromise = loadStripe(
    "pk_test_51MfkHeLTbquCQlBdArT15pgpC9noVYdwChrPzKg4OsGqQD2BR8gjhFvivUUSZGC0j4nRkFhWC05uYGkM9gIUUcPT000W9TFkjy"
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function toggleModal(e) {
    SetIsOpen(!isOpen);
  }

  const handleRemoveAccount = (event) => {
    event.preventDefault();
    try {
      axios({
        method: "post",
        url: "http://localhost:8000/user/delete",
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      })
        .then((res) => {
          if (res.data.status) {
            localStorage.removeItem("token");
            dispatch(notSubmitted());
            dispatch(setNullUser());
            navigate(path.LOGIN);
          } else {
            alert(res.data.message);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      alert("Something went wrong in axios.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(notSubmitted());
    dispatch(setNullUser());
    navigate(path.LOGIN);
  };

  return (
    <>
      <ProfilePageWrapper>
        <ProfileRowContainer>
          <PageTitle>Profile</PageTitle>
          <PaymentMethod
            style={{
              marginLeft: "20px",
            }}
            onClick={() => {
              setIsShow(true);
            }}
          >
            Update Profile
          </PaymentMethod>
        </ProfileRowContainer>

        <Divider />
        <Modal
          isOpen={isShow}
          title="Update Account"
          toggleModal={() => {
            setIsShow((prevState) => !prevState);
          }}
        >
          <UpdateProfilePage />
        </Modal>
        <SemiTitle>Account</SemiTitle>
        {/* <LinkedAccounts>Linked Accounts</LinkedAccounts> */}

        {/* <RowContainer>
          <FcGoogle size={"4rem"} style={{ marginRight: "10px" }} />
          <SmallText>google@gmail.com</SmallText>
        </RowContainer> */}

        <AccountRow>
          <RemoveAccountButton
            onClick={() => {
              setIsDelete(true);
            }}
          >
            {" "}
            Delete Account{" "}
          </RemoveAccountButton>
          <Modal
            isOpen={isDelete}
            title="DELETE ACCOUNT"
            toggleModal={() => {
              setIsDelete((prevState) => !prevState);
            }}
          >
            <form>
              <h4>Are you sure you want to delete your account?</h4>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <RedButton onClick={handleRemoveAccount}>Delete</RedButton>
              </div>
            </form>
          </Modal>
          <LogoutButton
            onClick={(e) => {
              setIsLogout((prevState) => !prevState);
            }}
          >
            Logout
          </LogoutButton>
          <Modal
            isOpen={isLogout}
            title="LOGOUT"
            toggleModal={() => {
              setIsLogout((prevState) => !prevState);
            }}
          >
            <form>
              <h4>Are you sure you want to LogOut?</h4>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
              