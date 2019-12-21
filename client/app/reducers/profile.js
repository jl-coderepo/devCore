import { GET_PROF, ERR_PROF, CLEAR_PROF } from "../actions/types";

const initialState = {
  profile: null,
  profiles: [],
  repos: [],
  loading: true,
  error: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_PROF:
      return {
        ...state,
        profile: payload,
        loading: false
      };
    case ERR_PROF:
      return {
        ...state,
        error: payload,
        loading: false
      };
    case CLEAR_PROF:
      return {
        ...state,
        profile: null,
        repos: [],
        loading: false
      };
    default:
      return state;
  }
}
