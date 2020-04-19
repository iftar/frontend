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

import logo from './logo.svg';
import './App.css';
import OrdersView from './views/orders/OrdersView';
import {getUserToken} from './util/api';
import View from './components/element-wrappers/View';
import SpecificLocation from './views/specific-location';
import SelectionLocation from './views/select-location';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const location = useLocation();

  useEffect(() => {
    // setIsLoggedIn(getUserToken() != null)
  }, [location.pathname]);


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
                <SelectionLocation />
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
        <Navigation/>
        {renderElements()}
      </div>
  );
}

function Navigation() {
  return (
      <View style={{display: "flex", flex: 1, flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
        <Link to={"/login"}>Login</Link>
        <Link to={"/sign-up"}>Sign Up</Link>
        <Link to={"/select-location"}>Select Location</Link>
        <Link to={"/specific-location"}>Specific Location</Link>
        <Link to={"/orders"}>Order</Link>
      </View>
  )
}


export default App;