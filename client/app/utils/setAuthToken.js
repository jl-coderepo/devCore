import axios from "axios";

//Basically setup for global header for token if it exists
const setAuthToken = token => {
  if (typeof token !== "undefined" && token != null) {
    axios.defaults.headers.common["x-auth-token"] = token;
  } else {
    delete axios.defaults.headers.common["x-auth-token"];
  }
};

export default setAuthToken;
