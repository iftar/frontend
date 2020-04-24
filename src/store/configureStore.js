import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import rootReducer from "./reducers";
import { createLogger } from "redux-logger/src";

export default createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk, createLogger()))
);
