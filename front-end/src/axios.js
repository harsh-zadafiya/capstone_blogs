import Axios from "axios";

const token = localStorage.getItem("token");

const axios = Axios.create({
  baseURL: "http://localhost:8000/",
  headers: {
    "x-access-token": token,
  },
});

export default axios;
