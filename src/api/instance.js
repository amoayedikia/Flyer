import axios from "axios";

const instance = axios.create({
  baseURL: "https://pb7y08fw6d.execute-api.ap-southeast-2.amazonaws.com",
  timeout: 1000
});
export default instance;
