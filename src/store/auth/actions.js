import * as types from './actionTypes'
import authService from '../../services/authService';
import UserOrderCheck from '../../models/UserOrderCheck';


export const login = (email: string, password: string) => {
  return async (dispatch) => {
    dispatch(loginRequest());
    try {
      const response = await authService.login(email, password);
      dispatch(loginSuccess(response.user, response.token))
    } catch (err) {
      dispatch(loginFailure(err.message))
    }
  }
};

export const logout = () => {
  return async (dispatch, getState) => {
    dispatch(logoutRequest());
    const token = getState().auth.token;
    try {
      const response = await authService.logout(token);
      if (response) {
        dispatch(logoutSuccess())
      } else {
        dispatch(logoutFailure("Failed to logout user"))
      }
    } catch (err) {
      dispatch(logoutFailure(err.message))
    }
  }
};

export const fetchUserOrderCheck = () => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    try {
      const userOrderCheck = await authService.fetchUserOrderCheck(token);
      dispatch(updateUserOrderCheck(userOrderCheck))
    } catch (err) {
      dispatch(updateUserOrderCheck(null))
    }
  }
};

export const fetchRefreshLogin = () => {
  return async (dispatch) => {
    const {user, token} = await authService.refreshLogin();
    try {
      const userDetails = await authService.fetchUserDetails(token);
      dispatch(refreshLogin(userDetails, token))
    } catch (e) {
      dispatch(logoutSuccess())
    }
  }
};

export const loginRequest = () => ({
  type: types.LOGIN_REQUEST
});
export const loginSuccess = (user: User, token: string) => ({
  type: types.LOGIN_SUCCESS,
  payload: {
    user: user,
    token: token
  }
});
export const loginFailure = (error: string) => ({
  type: types.LOGIN_FAILURE,
  payload: error
});


export const logoutRequest = () => ({
  type: types.LOGOUT_REQUEST
});
export const logoutSuccess = () => ({
  type: types.LOGOUT_SUCCESS,
});
export const logoutFailure = (error: string) => ({
  type: types.LOGOUT_FAILURE,
  payload: error
});

export const updateUserOrderCheck = (userOrderCheck: UserOrderCheck) => ({
  type: types.UPDATE_USER_ORDER_CHECK,
  payload: userOrderCheck,
});


export const refreshLoginRequest = () => ({
  type: types.REFRESH_LOGIN_REQUEST,
});
export const refreshLogin = (user: User, token: string) => ({
  type: types.REFRESH_LOGIN,
  payload: {
    user: user,
    token: token
  }
});
