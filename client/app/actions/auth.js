import axios from "axios";
import { setAlert } from "./alert";
import {
  SIGNUP_SUCC,
  SIGNUP_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  SIGNIN_SUCC,
  SIGNIN_FAIL,
  SIGNOUT,
  CLEAR_PROF
} from "./types";
import setAuthToken from "../utils/setAuthToken";

//Loading in a user
export const loadUser = () => async dispatch => {
  //Setting up header with token
  if (localStorage.length > 0 && typeof localStorage.token !== "undefined") {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get("/api/auth");
    dispatch({
      type: USER_LOADED,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR
    });
  }
};

//Signing up a user
export const signup = ({ name, email, password }) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  const body = JSON.stringify({ name, email, password });
  try {
    const res = await axios.post("/api/users", body, config);
    dispatch({
      type: SIGNUP_SUCC,
      payload: res.data
    });
    dispatch(loadUser());
  } catch (err) {
    console.log("sanity check");
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, "warning")));
    }
    dispatch({
      type: SIGNUP_FAIL
    });
  }
};

//Sign in
export const signin = (email, password) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  const body = JSON.stringify({ email, password });
  try {
    const res = await axios.post("/api/auth", body, config);
    dispatch({
      type: SIGNIN_SUCC,
      payload: res.data
    });
    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, "warning")));
    }
    dispatch({
      type: SIGNIN_FAIL
    });
  }
};

//Signout just clears
export const signout = () => dispatch => {
  dispatch({ type: CLEAR_PROF });
  dispatch({ type: SIGNOUT });
};
