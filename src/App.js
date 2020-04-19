import React, {Fragment, useEffect, useState} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useLocation
} from "react-router-dom"

import Login from './views/login'
import SignUp from './views/sign-up'
import SelectLocation from './components/select-location'
import SpecificLocation from './components/specific-location'

import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import OrdersView from './views/orders/OrdersView';
import {getUserToken} from './util/api';
import View from './components/element-wrappers/View';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const location = useLocation();

  useEffect(() => {
    setIsLoggedIn(getUserToken() != null)
  }, location.pathname);


  function renderElements() {
    if (!isLoggedIn) {
      return (
          <View style={{height: "100%", overflowY: "scroll"}}>
            <Switch>
              <Route path="/login">
                <Login />
              </Route>
              <Route path="/sign-up">
                <SignUp />
              </Route>
              <Route path="/">
                <Login />
              </Route>
            </Switch>
          </View>
      )
    } else {
      return (
          <View style={{height: "100%", overflowY: "scroll"}}>
            <Switch>
              <Route path="/login">
                <Login />
              </Route>
              <Route path="/sign-up">
                <SignUp />
              </Route>
              <Route path="/select-location">
                <SelectLocation />
              </Route>
              <Route path="/specific-location">
                <SpecificLocation />
              </Route>
              <Route path="/orders">
                <OrdersView />
              </Route>
              <Route path="/">
                <OrdersView />
              </Route>
            </Switch>
          </View>
      )
    }
  }

  return (
      <div className="App">
        {renderElements()}
      </div>
  );
}


export default App;