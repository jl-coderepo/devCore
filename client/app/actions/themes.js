import { TOGGLE_THEME } from "./types";

export const toggleTheme = () => dispatch => {
  dispatch({
    type: TOGGLE_THEME
  });
};
