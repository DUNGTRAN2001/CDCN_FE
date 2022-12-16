import axios from "axios";
import _ from "lodash";
// import config from './config';
import Cookies from "js-cookie";

const instance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
  headers: {
    "Content-Type": "application/json",
    XApiKey: "S4R13E7?J5bjp7{!CZMADnGwhC8FGZZ2p5MBH0qk",
    Authorization: `Bearer ${Cookies.get("token")?.replace('"', "")}`?.replace(
      '"',
      ""
    ),
  },
  // withCredentials: true
});

// gọi api thành công chỉ trả về response.data
instance.interceptors.response.use((response) => {
  const { data } = response;
  return response.data;
});
export default instance;
