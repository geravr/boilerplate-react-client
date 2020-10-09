import axios from "axios";

/*************** Default Client ***************/
const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_API_HOST,
});
export default axiosClient;