import Axios from "axios";

const token = localStorage.getItem("token");

const axios = Axios.create({
  baseURL: "https://capstone-blogs.onrender.com/",
  headers: {
    "x-access-token": token,
  },
});

export default axios;
