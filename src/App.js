import React, {Fragment, useEffect, useState} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useLocation,
} from 'react-router-dom';

import './App.css';
import {getUserDetails, getUserToken} from './util/api';
import View from './components/element-wrappers/View';
import LoggedInAppRoutes from './LoggedInAppRoutes';
import NotLoggedInAppRoutes from './NotLoggedInAppRoutes';
import {Navbar, Nav, NavDropdown} from 'react-bootstrap'
import HeadingText from './components/element-wrappers/HeadingText';
import {
  URL_CREATE_ORDER, URL_LOGIN,
  URL_ORDERS,
  URL_SELECT_LOCATION, URL_SIGN_UP,
} from './constants/urls';
import LightText from './components/element-wrappers/LightText';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const location = useLocation();

  useEffect(() => {
    getUserDetails()
        .then(() => setIsLoggedIn(true))
        .catch(() => setIsLoggedIn(false));
    window.scrollTo(0, 0);
  }, [location.pathname]);

  function renderElements() {
    if (!isLoggedIn) {
      return (
          <NotLoggedInAppRoutes/>
      );
    } else {
      return (
          <LoggedInAppRoutes/>
      );
    }
  }

  return (
      <Fragment>
      <View style={{textAlign: "center", height: "100%", overflowY: "scroll", marginBottom: "100px"}}>
        <Navigation/>
        {renderElements()}
        {/*<FooterNav/>*/}
      </View>
      </Fragment>
  );
}

function Navigation() {
  return (
      <View style={{
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <Navbar expand={false} style={{width: "100%"}}>
          <Navbar.Brand><HeadingText>Share Iftar</HeadingText></Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="">
            <Nav className="mr-auto">
              <Nav.Link href="/select-location">Select Location</Nav.Link>
              <Nav.Link href="/create-order">Create Order</Nav.Link>
              <Nav.Link href="/orders">My orders</Nav.Link>
              <NavDropdown.Divider />
              <Nav.Link href="/login">Login</Nav.Link>
              <Nav.Link href="/sign-up">Sign up</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        {/*<Link to={'/login'}>Login</Link>*/}
        {/*<Link to={'/sign-up'}>Sign Up</Link>*/}
        {/*<Link to={'/select-location'}>Select Location</Link>*/}
        {/*<Link to={'/specific-location'}>Specific Location</Link>*/}
        {/*<Link to={'/orders'}>Order</Link>*/}
      </View>
  );
}

function FooterNav() {
  return (
      <View style={{widhth: "100%", display: "flex", flexDirection:"column", justifyContent: "space-around", alignItems: "center", backgroundColor: "#556569", paddingBottom: "20px"}}>
        <LightText color={"white"}><Link to={URL_SELECT_LOCATION}>Select Collection Point</Link></LightText>
        <Link to={URL_CREATE_ORDER}>Create Order</Link>
        <Link to={URL_ORDERS}>My orders</Link>
        <NavDropdown.Divider />
        <Link to={URL_LOGIN}>Login</Link>
        <Link to={URL_SIGN_UP}>Sign up</Link>
      </View>
  )
}

export default App;