import React, { useState } from 'react';
import './login.css';
import axios from 'axios';
import { Link } from "react-router-dom";

// Images
import food_del from './../../images/fooddel.png';
import {Col, Container, Row} from 'react-bootstrap';
import Card from '../cards/Card';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const emailInputHandler = (e) => {
    setEmail(e.target.value);
  }
  const passwordInputHandler = (e) => {
    setPassword(e.target.value);
  }

  const submitHandler = e => {
    e.preventDefault();
    console.log("email and password", email, password);

    axios.post('https://share-your-iftar-backend.herokuapp.com/api/login', {
      email,
      password,
    })
      .then(response => {
        console.log(response);
        if (response.status === 200) {
          window.location = "/select-location";
        }
      })
      .catch(error => {
        console.log(error);
      })
  }

  return (
    <React.Fragment>
      <Container>
        <img className="login_image" src={food_del} alt="Alt" />
      </Container>
      <Container>
        <Row>
          <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
            <Card>
              <h5 className="card-title text-center">Sign In</h5>
              <form className="form-signin" onSubmit={submitHandler}>
                <div className="form-label-group">
                  <label htmlFor="email">Email address</label>
                  <input type="email" name="email" className="form-control" placeholder="Enter your Email address" value={email} onChange={emailInputHandler} required autoFocus />
                </div>
                <div className="form-label-group">
                  <label htmlFor="password">Password</label>
                  <input type="password" name="password" className="form-control" placeholder="Enter your Password" value={password} onChange={passwordInputHandler} required />
                </div>
                <p className="forgot_password"> Forgot Password? </p>
                <hr className="my-4" />
                <button className="btn btn-lg btn-primary btn-block text-uppercase" type="submit">Sign in</button>
                <div className="account">
                  <p>Not a member yet? <span className="signup_button"><Link to={"/sign-up"}> Sign up  </Link> </span></p>
                </div>
              </form>
            </Card>
          </div>
        </Row>
      </Container>
    </React.Fragment>
  )
}

export default Login