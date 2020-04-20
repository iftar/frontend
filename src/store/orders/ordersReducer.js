import * as types from './actionTypes';

const INITIAL_STATE = {
  orders: [],
  loading: false,
  error: null,
};

function ordersReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case types.FETCH_ORDERS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case types.FETCH_ORDERS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case types.FETCH_ORDERS_SUCCESS:
      return {
        ...state,
        loading: false,
        orders: action.payload,
      };
    default:
      return state;
  }
}

export default ordersReducer;