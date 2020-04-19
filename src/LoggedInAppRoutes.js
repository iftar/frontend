import React, {Fragment, useEffect, useState} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory, Redirect,
} from 'react-router-dom';

import Login from './views/login'
import SignUp from './views/sign-up'

import './App.css';
import View from './components/element-wrappers/View';
import SelectCollectionPointView from './views/select-collection-point/SelectCollectionPointView';
import CreateOrder from './views/create-order';
import OrdersView from './views/orders/OrdersView';
import {
  URL_CREATE_ORDER,
  URL_LOGIN, URL_ORDERS,
  URL_SELECT_LOCATION,
  URL_SIGN_UP,
} from './constants/urls';

function LoggedInAppRoutes() {

  const [selectedCollectionPoint, setSelectedCollectionPoint] = useState(null);

  const history = useHistory();

  function onCollectionPointsSelected(location) {
    setSelectedCollectionPoint(location);
    history.push(URL_CREATE_ORDER);
  }

  return (
      <View style={{height: "100%", overflowY: "scroll"}}>
        <Switch>
          <Route path={URL_LOGIN}>
            <Login />
          </Route>
          <Route path={URL_SIGN_UP}>
            <SignUp />
          </Route>
          <Route path={URL_SELECT_LOCATION}>
            <SelectCollectionPointView onCollectionPointsSelected={onCollectionPointsSelected} />
          </Route>
          <Route path={URL_CREATE_ORDER}>
            <CreateOrder collectionPoint={selectedCollectionPoint} />
          </Route>
          <Route path={URL_ORDERS}>
            <OrdersView />
          </Route>
          <Route path="/">
            <Redirect to={URL_SELECT_LOCATION}/>
          </Route>
        </Switch>
      </View>
  )
}


export default LoggedInAppRoutes;