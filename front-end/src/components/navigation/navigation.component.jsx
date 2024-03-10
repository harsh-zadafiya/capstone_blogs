import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Button from "../button/button.component";
import { ReactComponent as MenuIcon } from "../../assets/menu.svg";
import path from "../../constants/paths";
import Logo from "../logo/logo.component";
import "./navigation.styles.scss";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Modal from "../Modal/Modal.jsx";
import { notSubmitted, setNullUser } from "../../redux/isLogin.reducers";
import { RedButton } from "../BlogCard/BlogCard.styels";

const Navigation = () => {
  const [isNavigationOpen, setIsNavigationOpen] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isShow, setIsShow] = useState(false);

  const closeNavigation = () => {
    setIsNavigationOpen(false);
  };

  const changeStateShow = () => {
    setIsShow((prevState) => !prevState);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(notSubmitted());
    dispatch(setNullUser());
    navigate(path.LOGIN);
  };

  return (
    <>
      <div className="menu">
        <MenuIcon />
      </div>
      <input
        readOnly
        className="menu-icon"
        type="checkbox"
        checked={isNavigationOpen}
        onClick={() => {
          setIsNavigationOpen((prevState) => !prevState);
        }}
      />
      <div className="navigation">
        <div className="navigation__top">
          <Logo />
          <div className="navigation__links">
            <div className="navigation__links--primary">
              <Link
                to={path.HOME}
                onClick={closeNavigation}
                className={`navigation__link ${
                  location.pathname === path.HOME
                    ? "navigation__link--active"
                    : ""
                }`}
              >
                Home
              </Link>
              <Link
                to={path.NEW_BLOGS}
                onClick={closeNavigation}
                className={`navigation__link ${
                  location.pathname === path.NEW_BLOGS
                    ? "navigation__link--active"
                    : ""
                }`}
              >
                New Blogs
              </Link>
            </div>

            <div className="navigation__links--auction">
              <h4 className="auction__title">Settings</h4>
              <div className="auction__links">
                <Link
                  to={path.PROFILE}
                  onClick={closeNavigation}
                  className={`navigation__link ${
                    location.pathname === path.PROFILE
                      ? "navigation__link--active"
                      : ""
                  }`}
                >
                  Profile
                </Link>

                <Link
                  to={path.LOGIN}
                  onClick={() => {
                    closeNavigation();
                    changeStateShow();
                  }}
                  className={`navigation__link ${
                    location.pathname === path.MY_BLOGS
                      ? "navigation__link--active"
                      : ""
                  }`}
                >
                  LogOut
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="navigation__bottom">
          <Link to="/add-new-blog">
            <Button
              onClick={() => {
                setIsNavigationOpen(false);
              }}
            >
              Add New Blog
            </Button>
          </Link>
        </div>
      </div>
      <div>
        <Modal
          isOpen={isShow}
          title="LOGOUT"
          toggleModal={() => {
            setIsShow((prevState) => !prevState);
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
              <RedButton onClick={handleLogout}>LogOut</RedButton>
            </div>
          </form>
        </Modal>
      </div>
    </>
  );
};

export default Navigation;
