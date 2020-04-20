import React, {Fragment, useEffect, useState} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useLocation, Redirect,
} from 'react-router-dom';

import LoginView from './views/login/LoginView'
import SignUpView from './views/sign-up/SignUpView'

import './App.css';
import View from './components/element-wrappers/View';
import {URL_LOGIN, URL_SELECT_LOCATION, URL_SIGN_UP} from './constants/urls';

function NotLoggedInAppRoutes() {

  return (
      <View style={{height: "100%", overflowY: "scroll"}}>
        <Switch>
          <Route path={URL_LOGIN}>
            <LoginView />
          </Route>
          <Route path={URL_SIGN_UP}>
            <SignUpView />
          </Route>
          <Route path="/">
            <Redirect to={URL_LOGIN}/>
          </Route>
        </Switch>
      </View>
  )
}


export default NotLoggedInAppRoutes;