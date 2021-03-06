import React, { Fragment, useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useLocation,
  Redirect
} from "react-router-dom";

import View from "./components/element-wrappers/View";
import Navigation from "./components/Navigation";
import { connect } from "react-redux";
import {
  URL_CREATE_ORDER,
  URL_FORGOT_PASSWORD,
  URL_LOGIN,
  URL_ORDERS,
  URL_SELECT_LOCATION,
  URL_SIGN_UP
} from "./constants/urls";
import SelectCollectionPointViewContainer from "./views/select-collection-point/SelectCollectionPointViewContainer";
import CreateOrderViewContainer from "./views/create-order/CreateOrderViewContainer";
import SignUpViewContainer from "./views/sign-up/SignUpViewContainer";
import LoginViewContainer from "./views/login/LoginViewContainer";
import ForgotPasswordViewContainer from "./views/forgot-password/ForgotPasswordViewContainer";
import OrdersViewContainer from "./views/orders/OrdersViewContainer";
import { bindActionCreators } from "redux";
import { fetchRefreshLogin } from "./store/auth/actions";
import User from './models/User';

type Props = {
  user: User,

  fetchRefreshLogin: () => void
};

function App(props: Props) {
  const location = useLocation();

  useEffect(() => {
    props.fetchRefreshLogin();
  }, [location.pathname]);

  function isLoggedIn() {
    return props.user != null;
  }

  function renderElements() {
    if (isLoggedIn()) {
      return (
        <Switch>
          <Route path={URL_SELECT_LOCATION}>
            <SelectCollectionPointViewContainer />
          </Route>
          <Route path={URL_CREATE_ORDER}>
            <CreateOrderViewContainer />
          </Route>
          <Route path={URL_ORDERS}>
            <OrdersViewContainer />
          </Route>
          <Route path="/">
            <Redirect to={URL_ORDERS} />
          </Route>
        </Switch>
      );
    } else {
      return (
        <Switch>
          <Route path={URL_LOGIN}>
            <LoginViewContainer />
          </Route>
          <Route path={URL_SIGN_UP}>
            <SignUpViewContainer />
          </Route>
          <Route path={URL_FORGOT_PASSWORD}>
            <ForgotPasswordViewContainer />
          </Route>
          <Route path="/">
            <Redirect to={URL_LOGIN} />
          </Route>
        </Switch>
      );
    }
  }

  return (
    <Fragment>
      <View
        style={{
          textAlign: "center",
          height: "100%",
          marginBottom: "100px",
          overflowY: "hidden"
        }}
      >
        <Navigation />
        {renderElements()}
        {/*<FooterNav/>*/}
      </View>
    </Fragment>
  );
}

const mapStateToProps = state => ({
  user: state.auth.user
});

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({ fetchRefreshLogin }, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
