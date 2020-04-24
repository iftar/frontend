import axios from "axios";
import * as types from "./actionTypes";
import { BASE_URL } from "../../constants/api";

export const resetPasswordRequest = () => {
  return {
    type: types.RESET_PASSWORD_REQUEST
  };
};

export const resetPasswordSuccess = () => {
  return {
    type: types.RESET_PASSWORD_SUCCESS
  };
};

export const resetPasswordFailure = () => {
  return {
    type: types.RESET_PASSWORD_FAILURE
  };
};

export const forgotPassword = (email: string) => {
  return async dispatch => {
    dispatch(resetPasswordRequest());
    try {
      const response = await axios.post(`${BASE_URL}/api/forgot-password`, {
        email
      });
      if (response.data.status === "success") {
        dispatch(resetPasswordSuccess());
      }
    } catch (e) {
      console.log(e);
      dispatch(resetPasswordFailure());
    }
  };
};
