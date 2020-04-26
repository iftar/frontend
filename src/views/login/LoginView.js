import React, { useState } from "react";
import { login } from "../../util/api";
import "./login.css";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

// Images
import logo from "./../../assets/images/shareiftar-logo.png";
import { Col, Container, Row } from "react-bootstrap";
import ThemedCard from "../../components/cards/ThemedCard";
import { URL_FORGOT_PASSWORD, URL_SELECT_LOCATION } from "../../constants/urls";
import Loading from "../../components/Loading";
import Error from "../../components/Error";
import View from "../../components/element-wrappers/View";
import PaddedScrollableYView from "../../components/views/PaddedScrollableYView";

type Props = {
  loading: boolean,
  error: string,
  login: (email: string, password: string) => void
};

function LoginView(props: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const history = useHistory();

  const emailInputHandler = e => {
    setEmail(e.target.value);
  };
  const passwordInputHandler = e => {
    setPassword(e.target.value);
  };

  const submitHandler = e => {
    e.preventDefault();
    console.log("email and password", email, password);

    props.login(email, password);
  };

  function renderElements() {
    if (props.loading) {
      return <Loading />;
    } else {
      return (
        <Container>
          {props.error && <Error>{props.error}</Error>}
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
            <div className="form-label-group">
              <input
                type="password"
                name="password"
                className="form-control"
                placeholder="Enter your Password"
                value={password}
                onChange={passwordInputHandler}
                required
              />
            </div>
            <Link className="forgot_password" to={URL_FORGOT_PASSWORD}>
              Forgot Password?
            </Link>
            <hr className="my-4" />
            <button
              className="btn btn-lg btn-primary btn-block text-uppercase"
              type="submit"
            >
              Sign in
            </button>
            <div className="account">
              <p>
                Not a member yet?{" "}
                <span className="signup_button">
                  <Link to={"/sign-up"}> Sign up </Link>{" "}
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
              <h5 className="card-title text-center">Sign In</h5>
              {renderElements()}
            </ThemedCard>
          </div>
        </Row>
      </Container>
    </PaddedScrollableYView>
  );
}

export default LoginView;
