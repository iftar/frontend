import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import rootReducer from "./reducers";
import { createLogger } from "redux-logger/src";

let store;

if (process.env.NODE_ENV === 'production') {
  store = createStore(
      rootReducer,
      applyMiddleware(thunk)
  )
} else {
  store = createStore(
      rootReducer,
      composeWithDevTools(applyMiddleware(thunk, createLogger()))
  )
}

export default store;
