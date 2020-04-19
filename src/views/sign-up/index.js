import React, { useState } from 'react';
import { register } from '../../util/api'
import {useHistory} from 'react-router-dom'

import './signup.css';

// Images
import food_del from './../../images/fooddel.png';
import {Container, Row} from 'react-bootstrap';
import Card from '../../components/cards/Card';

function Signup() {
  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirmPassword] = useState('');

  const history = useHistory();

  const firstnameInputHandler = (e) => {
    setFirstName(e.target.value);
  }
  const lastnameInputHandler = (e) => {
    setLastName(e.target.value);
  }
  const emailInputHandler = (e) => {
    setEmail(e.target.value);
  }
  const passwordInputHandler = (e) => {
    setPassword(e.target.value);
  }
  const confirmInputHandler = (e) => {
    setConfirmPassword(e.target.value);
  }

  const submitHandler = e => {
    e.preventDefault();
    console.log("details", firstname, lastname, email, password, confirm);

    register(firstname, lastname, email, password, confirm)
      .then(result => {
        console.log('result: ', result)

        if (result.status === "success") {
          console.log('successsss')
          history.push("/login")
        }
        else if (result.status === "error") {
          console.log('erroreddddd')
          // use error message from result.message here
        }
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
                <h5 className="card-title text-center">Register</h5>
                <form className="form-signin" onSubmit={submitHandler}>
                  <div className="form-label-group">
                    <label htmlFor="first_name">First Name</label>
                    <input type="text" name="first_name" className="form-control" placeholder="First Name" value={firstname} onChange={firstnameInputHandler} required autoFocus />
                  </div>
                  <div className="form-label-group">
                    <label htmlFor="last_name">Last Name</label>
                    <input type="text" name="last_name" className="form-control" placeholder="Last Name" value={lastname} onChange={lastnameInputHandler} required />
                  </div>

                  <div className="form-label-group">
                    <label htmlFor="email">Email address</label>
                    <input type="email" name="email" className="form-control" placeholder="Enter your Email address" value={email} onChange={emailInputHandler} required />
                  </div>
                  <div className="form-label-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" className="form-control" placeholder="Enter your Password" value={password} onChange={passwordInputHandler} required />
                  </div>
                  <div className="form-label-group">
                    <label htmlFor="confirm">Password</label>
                    <input type="password" name="confirm" className="form-control" placeholder="Re-enter your Password" value={confirm} onChange={confirmInputHandler} required />
                  </div>
                  <hr className="my-4" />
                  <button className="btn btn-lg btn-primary btn-block text-uppercase" type="submit">Register</button>
                </form>
            </Card>
          </div>
        </Row>
      </Container>

    </React.Fragment>
  )


}

export default Signup