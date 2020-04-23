import * as types from "./actionTypes";

type State = {
  loading: boolean,
  error: boolean,
  success: boolean
};

const INITIAL_STATE: State = {
  loading: false,
  error: false,
  success: false
};

const reducer = (state: State = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.RESET_PASSWORD_REQUEST:
      return {
        ...state,
        loading: true,
        error: false,
        success: false
      };
    case types.RESET_PASSWORD_SUCCESS:
      return {
        loading: false,
        error: false,
        success: true
      };
    case types.RESET_PASSWORD_FAILURE:
      return {
        loading: false,
        error: true,
        success: false
      };
    default:
      return state;
  }
};

export default reducer;
