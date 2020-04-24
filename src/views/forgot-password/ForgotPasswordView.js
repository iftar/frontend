import React, { useState } from "react";
import { Link } from "react-router-dom";

import { Container, Row } from "react-bootstrap";
import ThemedCard from "../../components/cards/ThemedCard";
import Loading from "../../components/Loading";
import Error from "../../components/Error";
import Success from "../../components/Success";
import PaddedScrollableYView from "../../components/views/PaddedScrollableYView";

import logo from "./../../assets/images/shareiftar-logo.png";

import "./forgot-password.css";

type Props = {
  loading: boolean,
  error: boolean,
  success: boolean,
  forgotPassword: (email: string) => void
};

function LoginView(props: Props) {
  const [email, setEmail] = useState("");

  const emailInputHandler = e => {
    setEmail(e.target.value);
  };

  const submitHandler = e => {
    e.preventDefault();
    props.forgotPassword(email);
    setEmail("");
  };

  function renderElements() {
    if (props.loading) {
      return <Loading />;
    } else {
      return (
        <Container>
          {props.error && <Error>Something went wrong!</Error>}
          {props.success && (
            <Success>
              Your Email has been reset! Please check your inbox
            </Success>
          )}
          <form className="form-signin" onSubmit={submitHandler}>
            <div className="form-label-group">
              <input
                type="email"
                name="email"
                className="form-control"
                placeholder="Enter your Email address"
                value={email}
                onChange={emailInputHandler}
                required
                autoFocus
              />
            </div>
            <hr className="my-4" />
            <button
              className="btn btn-lg btn-primary btn-block text-uppercase"
              type="submit"
            >
              Reset Password
            </button>
            <div className="account">
              <p>
                Already have an account?{" "}
                <span className="signup_button">
                  <Link to={"/login"}> Sign in </Link>{" "}
                </span>
              </p>
            </div>
          </form>
        </Container>
      );
    }
  }

  return (
    <PaddedScrollableYView>
      <Container>
        <img className="login_image" src={logo} alt="Alt" />
      </Container>
      <Container style={{ marginBottom: "50px" }}>
        <Row>
          <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
            <ThemedCard>
              <h5 className="card-title text-center">Reset Password</h5>
              {renderElements()}
            </ThemedCard>
          </div>
        </Row>
      </Container>
    </PaddedScrollableYView>
  );
}

export default LoginView;
