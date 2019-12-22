import { TOGGLE_THEME } from "../actions/types";

const initialState = {
  light: true
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case TOGGLE_THEME:
      return {
        ...state,
        light: !state.light
      };
    default:
      return state;
  }
}
