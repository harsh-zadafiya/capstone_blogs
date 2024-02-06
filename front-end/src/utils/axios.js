import Axios from "axios";

const axios = Axios.create({
  baseURL: `http://localhost:8003/api/v1`,
  withCredentials: true,
});

export default axios;
