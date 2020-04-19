import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom"

import Login from './components/login'
import SignUp from './components/sign-up'
import SelectLocation from './components/select-location'
import SpecificLocation from './components/specific-location'

import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import OrdersView from './views/orders/OrdersView';

export default function App() {
  return (
    <Router>
      <div>
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
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
      </div>
    </Router>
  );
}
