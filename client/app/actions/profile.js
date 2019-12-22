import axios from "axios";
import { setAlert } from "./alert";
import { GET_PROF, ERR_PROF, UPDATE_PROF } from "./types";

// Get user profile, refer ... routes/api/profile.js line 19
export const getCurrentProfile = () => async dispatch => {
  try {
    const res = await axios.get("/api/profile/me");
    dispatch({
      type: GET_PROF,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: ERR_PROF,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

//Probably rename this to better reflect characteristic
export const createProfile = (
  formData,
  history,
  edit = false
) => async dispatch => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    const res = await axios.post("/api/profile", formData, config);
    dispatch({
      type: GET_PROF,
      payload: res.data
    });
    dispatch(setAlert(edit ? "Profile Updated" : "Profile Created", "success"));
    if (!edit) {
      history.push("/dashboard");
    }
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, "warning")));
    }
    dispa;
    dispatch({
      type: ERR_PROF,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

//Add experience, refer .../server/routes/api/profile.js line 188
//PUT api/profile/experience
export const addExperience = (formData, history) => async dispatch => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    const res = await axios.put("/api/profile/experience", formData, config);
    dispatch({
      type: UPDATE_PROF,
      payload: res.data
    });
    dispatch(setAlert("Experience has been added", "success"));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, "warning")));
    }
    dispa;
    dispatch({
      type: ERR_PROF,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

//Add education
export const addEducation = (formData, history) => async dispatch => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    const res = await axios.put("/api/profile/education", formData, config);
    dispatch({
      type: UPDATE_PROF,
      payload: res.data
    });
    dispatch(setAlert("Education has been added", "success"));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, "warning")));
    }
    dispa;
    dispatch({
      type: ERR_PROF,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Delete experience
export const deleteExperience = id => async dispatch => {
  try {
    const res = await axios.delete(`/api/profile/experience/${id}`);

    dispatch({
      type: UPDATE_PROF,
      payload: res.data
    });

    dispatch(setAlert("Experience Removed", "success"));
  } catch (err) {
    dispatch({
      type: ERR_PROF,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Delete experience
export const deleteEducation = id => async dispatch => {
  try {
    const res = await axios.delete(`/api/profile/education/${id}`);

    dispatch({
      type: UPDATE_PROF,
      payload: res.data
    });

    dispatch(setAlert("Education Removed", "success"));
  } catch (err) {
    dispatch({
      type: ERR_PROF,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
