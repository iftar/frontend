import { combineReducers } from "redux";
import currentOrderReducer from "./currentorder/currentOrderReducer";
import authReducer from "./auth/authReducer";
import collectionPointsReducer from "./collectionpoints/collectionPointsReducer";
import ordersReducer from "./orders/ordersReducer";
import passwordReducer from "./password/reducer";
import locationReducer from './location/locationReducer';

export default combineReducers({
  auth: authReducer,
  password: passwordReducer,
  currentorder: currentOrderReducer,
  collectionpoints: collectionPointsReducer,
  orders: ordersReducer,
  location: locationReducer,
});
