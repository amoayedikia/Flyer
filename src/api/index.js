import { message } from "antd";
import instance from "./instance";
import { Auth } from "aws-amplify";
import axios from "axios";

const baseURL = "https://pb7y08fw6d.execute-api.ap-southeast-2.amazonaws.com";
const getHeaders = () => {
  try {
    let token = localStorage.getItem("token");
    if (!token) throw new Error("Authentication failed");
    return { Authorization: `Bearer ${token}` };
  } catch (error) {}
};
const handleError = (err) => {
  console.log(err);
  message.error("Something went wrong");
};
const _alert = (msg, type) => {
  message[type](msg);
};
const getData = async (path, params, isAuthenticated = false) => {
  return await axios
    .get(
      baseURL + path,
      isAuthenticated ? { headers: getHeaders(), params } : params
    )
    .catch(handleError);
};
const postData = async (path, payload, isAuthenticated = false) => {
  return await instance.post(path, payload).catch(handleError);
};
const putData = async (path, payload, isAuthenticated = false) => {
  return await axios.put(baseURL + path, payload).catch(handleError);
};
const signUp = async (payload, attributes) => {
  const { password, username } = payload;
  return await Auth.signUp({ username, password, attributes }).catch((err) => {
    _alert(err.message ?? "SignUp failed", "error");
  });
};
const signIn = async (payload) => {
  const { password, username } = payload;
  return await Auth.signIn(username, password).catch((err) => {
    _alert(err.message ?? "SignIn failed", "error");
  });
};
const confirmSignUp = async (username, code) => {
  try {
    return await Auth.confirmSignUp(username, code);
  } catch (err) {
    _alert(err.message ?? "SIgnup failed", "error");
  }
};
const getUser = () => {
  let user = localStorage.getItem("token");
  if (user) return JSON.parse(user);
  else return null;
};

const signOut = async (e) => {
  e.preventDefault();
  await Auth.signOut()
    .then(() => {
      localStorage.removeItem("token");
      _alert("Signed out successfully", "success");
    })
    .catch((err) => {
      _alert(err.message ?? "Signout failed", "error");
    })
    .finally(() => {
      window.location.reload();
    });
};

export {
  getData,
  postData,
  putData,
  signUp,
  _alert,
  signIn,
  confirmSignUp,
  getUser,
  signOut,
};
