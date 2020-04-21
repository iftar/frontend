import * as types from './actionTypes';
import Order from '../../models/Order';
import ordersService from '../../services/ordersService';

export const fetchOrders = () => {
  return async (dispatch, getState) => {
    dispatch(fetchOrdersRequest());
    const token = getState().auth.token;
    try {
      const orders = await ordersService.fetchOrders(token);
      dispatch(fetchOrdersSuccess(orders));
    } catch (e) {
      dispatch(fetchOrdersFailure(e.message));
    }
  };
};

export const fetchOrdersRequest = () => ({
  type: types.FETCH_ORDERS_REQUEST
});

export const fetchOrdersSuccess = (orders : Array<Order>) => ({
  type: types.FETCH_ORDERS_SUCCESS,
  payload: orders
});

export const fetchOrdersFailure = (error) => ({
  type: types.FETCH_ORDERS_FAILURE,
  payload: error
});