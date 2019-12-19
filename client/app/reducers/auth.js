import {
  SIGNUP_SUCC,
  SIGNUP_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  SIGNIN_SUCC,
  SIGNIN_FAIL,
  SIGNOUT
} from "../actions/types";

const initialState = {
  token: localStorage.getItem("token"),
  isAuth: null,
  loading: true,
  user: null
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SIGNUP_SUCC:
    case SIGNIN_SUCC:
      localStorage.setItem("token", payload.token);
      return {
        ...state,
        ...payload,
        isAuth: true,
        loading: false
      };
    case SIGNUP_FAIL:
    case SIGNIN_FAIL:
    case AUTH_ERROR:
    case SIGNOUT:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuth: false,
        loading: false
      };
    case USER_LOADED:
      return {
        ...state,
        isAuth: true,
        loading: false,
        user: payload
      };
    default:
      return state;
  }
}
