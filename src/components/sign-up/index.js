import React, { Component } from 'react';
import './signup.css';
import axios from 'axios';


// Images
import food_del from './../../images/fooddel.png';

class Signup extends Component {

  constructor(props) {
    super(props)

    this.state = {
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      confirm: '',
    }
  }

  changeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  submitHandler = e => {
    e.preventDefault();
    console.log(this.state);
    axios.post('https://share-your-iftar-backend.herokuapp.com/api/register', this.state)
      .then(response => {
        console.log(response);
        if (response.status === 200) {
          window.location = "/login";
        }
      })
      .catch(error => {
        console.log(error.message);
      })
  }

  render() {
    const { first_name, last_name, email, password, confirm } = this.state;
    return (
      <React.Fragment>
        {/* <img className="login_image" src={food_del} alt="Alt" />
        <h1> Register </h1>
        <form onSubmit={this.submitHandler}>
          <div className="form-group">
            <label htmlFor="first_name"> First Name </label>
            <input type="text" name="first_name" placeholder="First Name" value={first_name} onChange={this.changeHandler} /> <br />
          </div>
          <div className="form-group">
            <label htmlFor="last_name"> Last Name </label>
            <input type="text" name="last_name" placeholder="Last Name" value={last_name} onChange={this.changeHandler} /> <br />
          </div>
          <div className="form-group">
            <label htmlFor="email_address">Email address</label>
            <input type="text" name="email" placeholder="Enter your email address" value={email} onChange={this.changeHandler} />
          </div>
          <div className="form-group">
            <label htmlFor="password"> Password </label>
            <input type="password" name="password" placeholder="Enter your password" value={password} onChange={this.changeHandler} />
          </div>
          <div className="form-group">
            <label htmlFor="confirm"> Password </label>
            <input type="password" name="confirm" placeholder="Confirm Password" value={confirm} onChange={this.changeHandler} /> <br />
          </div>
          <button type="submit" className="btn btn-primary">Sign Up</button>
        </form> */}

        <div className="container">
          <img className="login_image" src={food_del} alt="Alt" />
        </div>
        <div className="container">
          <div className="row">
            <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
              <div className="card card-signin my-5">
                <div className="card-body">
                  <h5 className="card-title text-center">Register</h5>
                  <form className="form-signin" onSubmit={this.submitHandler}>
                  <div className="form-label-group">
                      <label htmlFor="first_name">First Name</label>
                      <input type="text" name="first_name" className="form-control" placeholder="First Name" value={first_name} onChange={this.changeHandler} required autoFocus />
                    </div>
                  <div className="form-label-group">
                      <label htmlFor="last_name">Last Name</label>
                      <input type="text" name="last_name" className="form-control" placeholder="Last Name" value={last_name} onChange={this.changeHandler} required  />
                    </div>

                    <div className="form-label-group">
                      <label htmlFor="email">Email address</label>
                      <input type="email" name="email" className="form-control" placeholder="Enter your Email address" value={email} onChange={this.changeHandler} required />
                    </div>
                    <div className="form-label-group">
                      <label htmlFor="password">Password</label>
                      <input type="password" name="password" className="form-control" placeholder="Enter your Password" value={password} onChange={this.changeHandler} required />
                    </div>
                    <div className="form-label-group">
                      <label htmlFor="confirm">Password</label>
                      <input type="password" name="confirm" className="form-control" placeholder="Re-enter your Password" value={confirm} onChange={this.changeHandler} required />
                    </div>
                    <hr className="my-4" />
                    <button className="btn btn-lg btn-primary btn-block text-uppercase" type="submit">Register</button>
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



export default Signup