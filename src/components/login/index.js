import React, { Component } from 'react';
import './login.css';
import axios from 'axios';
import { Link } from "react-router-dom"


// Images
import food_del from './../../images/fooddel.png';

class Login extends Component {

  constructor(props) {
    super(props)

    this.state = {
      email: '',
      password: '',
    }
  }

  changeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  submitHandler = e => {
    e.preventDefault();
    console.log('before post', this.state);

    axios.post('https://share-your-iftar-backend.herokuapp.com/api/login', this.state)
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

  // eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiOGRkZWVkMzAwMmY5Yzk2NDU0ZmIyMGUzNmJiNjg4N2FiODM5ZjYzNWQwZTIzMmU5NmEwMWNlOTFjZmQ4YmY1ZWIyNWY5YjI1YTNhZDU5YzkiLCJpYXQiOjE1ODcyMjc4NDYsIm5iZiI6MTU4NzIyNzg0NiwiZXhwIjoxNjE4NzYzODQ2LCJzdWIiOiIyNjQiLCJzY29wZXMiOltdfQ.GrZi567UU-E6-zLGtEOC1ORvtpV5bUBKUjha2kQMFmCJIS5XJULK6ZAgKa2aB_F1x_2pQ8ZxZflWw4oZsGxEF_R5K41nnhSyp7ooJlIeAv4XRPl700tdgSpGzvqNXMiTJsdvo5lH-mwXDaFEBdqP1JKmNG8D82-CxKupQfcSOd0i_VMvymJ1UYe9THYkPnPZRfTRlOQCfxsQkilJoDlyq9_GM7MVbm7IVTPXu7lXNc5d6FNrEdb3nTxb-oRWA2oRNLISCvejhhkqVvecD3vkGpLJbeHOhT91wkRrHyZGx4AOgq--j0GliOEZtgxKZpgev_B2leBkp8hqBE58WzHPRUu6tefsPPxjdxS5t2IjwpD6w4IRQkRem4uBoVxsIEmyiZDvAM2j64cch-3bPU04hd4C2odwsN_sAe5XouN1PinPFZBmOhLbd3X4CagBrn4T1AaIQz_0h2fciJTN4IpPOydpauWziiH4c6Jug9aXTtpBCEt5S_omNUcd00oNcyapKrQR1MxEnl_NZhjwECVy7dbCD7WQeiZz5xBZZ-ADmqt4u57TIanb1p-BNR8MZfkwQRqqNonxUBfL8VIWPtduNXUTMIa87PiTpQ3N3DtkVU8Iyl3JE36kV1dDb5avuJPBtqKp8o277RWeM8VotIEfM4olwxj8iv2c6hdTMg3wUHQ"


  render() {
    const { email, password } = this.state;
    return (
      <React.Fragment>

        {/* <h1> Login </h1> */}
        {/* <form onSubmit={this.submitHandler}>
          <div className="form-group">
            <label htmlFor="emailaddress">Email address</label>
            <input type="text" name="email" placeholder="Enter your email address" value={email} onChange={this.changeHandler} />
          </div>
          <div>
            <label htmlFor="password"> Password </label>
            <input type="password" name="password" placeholder="Enter your password" value={password} onChange={this.changeHandler} />
          </div>
          <p className="forgot_password"> Forgot Password? </p>
          <input type="submit" value="Log In" />
        </form>

        <p> Forgot Password? </p>
        <div className="account">
          <p>Not a member yet? <span className="signup_button"><Link to={"/sign-up"}> Sign up  </Link> </span></p>
        </div> */}
        <div className="container">
          <img className="login_image" src={food_del} alt="Alt" />
        </div>
        <div className="container">
          <div className="row">
            <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
              <div className="card card-signin my-5">
                <div className="card-body">
                  <h5 className="card-title text-center">Sign In</h5>
                  <form className="form-signin" onSubmit={this.submitHandler}>
                    <div className="form-label-group">
                      <label htmlFor="email">Email address</label>
                      <input type="email" name="email" className="form-control" placeholder="Enter your Email address" value={email} onChange={this.changeHandler} required autoFocus />
                    </div>
                    <div className="form-label-group">
                      <label htmlFor="password">Password</label>
                      <input type="password" name="password" className="form-control" placeholder="Enter your Password" value={password} onChange={this.changeHandler} required />
                    </div>
                    <p className="forgot_password"> Forgot Password? </p>
                    <hr className="my-4" />
                    <button className="btn btn-lg btn-primary btn-block text-uppercase" type="submit">Sign in</button>
                    <div className="account">
                      <p>Not a member yet? <span className="signup_button"><Link to={"/sign-up"}> Sign up  </Link> </span></p>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }
}



export default Login