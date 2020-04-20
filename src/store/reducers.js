import {combineReducers} from 'redux';
import currentOrderReducer from './currentorder/currentOrderReducer';
import authReducer from './auth/authReducer';
import collectionPointsReducer
  from './collectionpoints/collectionPointsReducer';
import ordersReducer from './orders/ordersReducer';

export default combineReducers({
  auth: authReducer,
  currentorder: currentOrderReducer,
  collectionpoints: collectionPointsReducer,
  orders: ordersReducer,
})