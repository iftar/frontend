import * as types from './actionTypes'
import UserOrderCheck from '../../models/UserOrderCheck';

type StateType = {
  user: User,
  token: string,
  loading: boolean,
  error: string,
  userOrderCheck: UserOrderCheck
}

const INITIAL_STATE : StateType = {
  user: null,
  token: null,
  loading: false,
  error: null,
  userOrderCheck: null,
};


function authReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case types.LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case types.LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case types.LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload.user,
        token: action.payload.token,
      };
    case types.LOGOUT_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case types.LOGOUT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        user: null,
        token: null,
      };
    case types.LOGOUT_SUCCESS:
      return {
        ...state,
        loading: false,
        user: null,
        token: null,
      };
    case types.UPDATE_USER_ORDER_CHECK:
      return {
        ...state,
        userOrderCheck: action.payload
      };
    case types.REFRESH_LOGIN_REQUEST:
      return {
        ...state,
        loading: true
      };
    case types.REFRESH_LOGIN:
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        loading: false,
      };
    default:
      return state;
  }
}

export default authReducer;