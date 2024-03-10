import { Route, Routes } from "react-router-dom";
import path from "./constants/paths.js";
import Navigation from "./components/navigation/navigation.component.jsx";
import "./App.scss";
import ProfilePage from "./pages/profile/profilePage.jsx";
import { ModalProvider } from "styled-react-modal";
import { useSelector, useDispatch } from "react-redux";

import {
  HomePage,
  AddNewBlog,
  LoginPage,
  RegistrationPage,
  ForgotPage,
  NewBlogsListPage,
  BlogDetailsPage,
  UpdateProfilePage,
  NotFoundPage,
} from "./pages/index.js";
import EditBlogDetailsPage from "./pages/EditBlogDetails/EditBlogDetails.jsx";
import React, { useEffect } from "react";
import {
  notSubmitted,
  submitted,
  setLoginUser,
  setNullUser,
} from "./redux/isLogin.reducers.js";
import axios from "axios";

function App() {
  const dispatch = useDispatch();

  const loginStatus = useSelector((state) => state.loginStatus.status);

  useEffect(() => {
    axios({
      method: "get",
      url: "http://localhost:8000/user/checkUser",
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    })
      .then((res) => {
        if (res.data.status) {
          dispatch(submitted());
          dispatch(setLoginUser(res.data.user));
        } else {
          dispatch(notSubmitted());
          dispatch(setNullUser());
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [dispatch]);

  return (
    <>
      {loginStatus ? (
        <ModalProvider>
          <div className="app">
            <div className="navigation__wrapper">
              <Navigation />
            </div>
            <div className="main-section">
              <Routes>
                <Route path={path.HOME} exact element={<HomePage />} />
                <Route path={path.ADD_NEW_BLOG} element={<AddNewBlog />} />

                <Route path={path.MY_BLOGS} element={<NewBlogsListPage />}>
                  <Route
                    path={`${path.MY_BLOGS}/`}
                    element={<NewBlogsListPage />}
                  />
                  <Route
                    path={`${path.NEW_LISTINGS}/:vin`}
                    element={<BlogDetailsPage />}
                  />
                </Route>

                <Route path={path.PROFILE} exact element={<ProfilePage />} />
                <Route
                  path={path.UPDATE_PROFILE}
                  exact
                  element={<UpdateProfilePage />}
                />

                <Route
                  path={path.MY_BLOGS}
                  exact
                  element={<div>MY LISTINGS....</div>}
                />
                <Route
                  path={`${path.ADD_NEW_BLOG}/:vin`}
                  exact
                  element={<EditBlogDetailsPage />}
                />
              </Routes>
            </div>
          </div>
        </ModalProvider>
      ) : (
        <>
          <Routes>
            <Route path={path.LOGIN} exact element={<LoginPage />} />
            <Route path={path.REGISTRATION} element={<RegistrationPage />} />
            <Route path={path.FORGOT} element={<ForgotPage />} />
          </Routes>
        </>
      )}
      <Routes>
        <Route path="*" exact={true} element={<NotFoundPage e />} />
      </Routes>
    </>
  );
}

export default App;
