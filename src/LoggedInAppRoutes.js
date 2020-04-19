import React, { Fragment, useEffect, useState } from 'react';
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
import SelectionLocation from './views/select-location';
import CreateOrder from './views/create-order';
import OrdersView from './views/orders/OrdersView';

function LoggedInAppRoutes() {

  return (
    <View style={{ height: "100%", overflowY: "scroll" }}>
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
        <Route path="/create-order">
          <CreateOrder />
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


export default LoggedInAppRoutes;