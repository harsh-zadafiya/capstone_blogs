import Axios from "axios";

const token = localStorage.getItem("token");

const axios = Axios.create({
  baseURL: "https://canada4you.netlify.app/",
  headers: {
    "x-access-token": token,
  },
});

export default axios;
