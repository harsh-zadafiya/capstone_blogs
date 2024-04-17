import Axios from "axios";

const token = localStorage.getItem("token");

const axios = Axios.create({
  baseURL: "https://stirring-puffpuff-37664f.netlify.app//",
  headers: {
    "x-access-token": token,
  },
});

export default axios;
