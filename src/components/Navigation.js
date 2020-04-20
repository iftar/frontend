import View from './element-wrappers/View';
import {Button, Image, Nav, Navbar, NavDropdown} from 'react-bootstrap';
import logo from '../assets/images/shareiftar-logo.png';
import React, {Fragment} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {logout} from '../store/auth/actions';

type Props = {
  user: User,

  logout: () => void,
}

function Navigation(props : Props) {

  function logout() {
    props.logout();
  }

  return (
      <View style={{
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <Navbar expand={false} style={{width: "100%"}}>
          <Navbar.Brand>
            <Image src={logo} height={"60px"} />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="">
            <Nav className="mr-auto">
              <Nav.Link href="/select-location">Select Location</Nav.Link>
              <Nav.Link href="/create-order">Create Order</Nav.Link>
              <Nav.Link href="/orders">My orders</Nav.Link>
              <NavDropdown.Divider />
              {props.user != null ?
                  <Button variant={"info"} block onClick={logout}>Logout</Button>
                  :
                  <Fragment>
                    <Nav.Link  href="/login">Login</Nav.Link>
                    <Nav.Link href="/sign-up">Sign up</Nav.Link>
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