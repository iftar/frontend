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

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const location = useLocation();

  useEffect(() => {
    getUserDetails()
        .then(() => setIsLoggedIn(true))
        .catch(() => setIsLoggedIn(false));
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
      <div className="App">
        <Navigation/>
        {renderElements()}
      </div>
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
          <Navbar.Brand><HeadingText>Iftar App</HeadingText></Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
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

export default App;