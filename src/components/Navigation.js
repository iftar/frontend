import View from './element-wrappers/View';
import {Button, Image, Nav, Navbar, NavDropdown} from 'react-bootstrap';
import logo from '../assets/images/shareiftar-logo.png';
import React, {Fragment, useState} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {logout} from '../store/auth/actions';
import {Link} from 'react-router-dom';
import {
  URL_CREATE_ORDER, URL_LOGIN,
  URL_ORDERS,
  URL_SELECT_LOCATION, URL_SIGN_UP,
} from '../constants/urls';

type Props = {
  user: User,

  logout: () => void,
}

function Navigation(props : Props) {

  const [expanded, setExpanded] = useState(false);

  function logout() {
    props.logout();
  }

  function onSelect() {
    setExpanded(false);
  }

  function onToggle() {
    setExpanded(!expanded)
  }

  return (
      <View style={{
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <Navbar expand={false} expanded={expanded} style={{width: "100%"}} onToggle={onToggle}>
          <Navbar.Brand href={"/"}>
            <Image src={logo} height={"60px"} />
          </Navbar.Brand>
          <Navbar.Toggle onClick={onToggle}/>
          <Navbar.Collapse id="">
            <Nav className="mr-auto">
              {props.user != null ?
                  <Fragment>
                    <Link to={URL_SELECT_LOCATION} onClick={onSelect}>Create Order</Link>
                    <Link to={URL_ORDERS} onClick={onSelect}>My orders</Link>
                    <NavDropdown.Divider />
                    <Button variant={"info"} block onClick={logout}>Logout</Button>
                  </Fragment>
                  :
                  <Fragment>
                    <Link to={URL_LOGIN} onClick={onSelect}>Login</Link>
                    <Link to={URL_SIGN_UP} onClick={onSelect}>Sign up</Link>
                  </Fragment>
              }
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </View>
  );
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators({logout}, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);