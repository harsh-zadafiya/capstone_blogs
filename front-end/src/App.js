import "./App.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import path from "./constants/path";
import { Navigation } from "./components/index";
import {
  SignUpPage,
  LoginPage,
  MyAccountsPage,
  HomePage,
  AddNewBlog,
} from "./pages";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "./utils/axios";
import { updateUser } from "./redux/user/user.reducer";
import UserFeedbackForm from "./pages/UserFeedbackForm/UserFeedbackForm";

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.userInfo);

  useEffect(() => {
    (async function () {
      try {
        const { data: response } = await axios.get("/user/session");
        console.log(response.user);
        dispatch(updateUser(response.user));
      } catch (err) {
        navigate(path.SIGN_UP);
      }
    })();
  }, []);

  return (
    <div className="App">
      <Navigation />
      <div className="main-section">
        <Routes>
          <Route path={path.LOGIN} exact element={<LoginPage user={user} />} />
          <Route
            path={path.SIGN_UP}
            exact
            element={<SignUpPage user={user} />}
          />
          <Route path={path.APP} exact element={<MyAccountsPage />} />
          <Route path={path.HOME} exact element={<HomePage />} />
          <Route path={path.ADD_NEW_BLOG} exact element={<AddNewBlog />} />
          <Route path={path.USER_FEEDBACK} exact element={<UserFeedbackForm />}
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
