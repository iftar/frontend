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

import './App.css';
import View from './components/element-wrappers/View';

function NotLoggedInAppRoutes() {

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
}


export default NotLoggedInAppRoutes;