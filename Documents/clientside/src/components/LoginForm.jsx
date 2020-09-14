import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBModalFooter,
  MDBIcon,
  MDBCardHeader,
  MDBBtn,
  MDBInput,
} from "mdbreact";
import NonFixedNavbarExample from "./NonFixedNavbarExample";
import Footer from "./Footer";
import axios from "axios";

const LoginForm = () => {
  const [state, setState] = useState({
    username: "",
    password: "",
  });
  //handle onchange
  const inputHandler = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };
  //login request
  const submitHandler = async (e) => {
    e.preventDefault();
    const result = await axios
      .post("http://localhost:9000/users/login", state)
      .then((response) => {
        localStorage.setItem("token", response.data.token);

        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });

    setState({ username: "", username: "", password: "" });
  };
  return (
    <div>
      <NonFixedNavbarExample />
      <div>
        <MDBContainer>
          <MDBRow>
            <MDBCol md="4">
              <div className="loginform">
                <MDBCard>
                  <MDBCardBody>
                    <MDBCardHeader className="form-header deep-blue-gradient rounded">
                      <h3 className="my-3">
                        <MDBIcon icon="lock" /> Login:
                      </h3>
                    </MDBCardHeader>
                    <form onSubmit={submitHandler}>
                      <div className="grey-text">
                        <MDBInput
                          label="Type your user name"
                          icon="user"
                          group
                          type="text"
                          validate="true"
                          error="wrong"
                          success="right"
                          name="username"
                          value={state.username}
                          onChange={inputHandler}
                        />
                        <MDBInput
                          label="Type your password"
                          icon="lock"
                          group
                          type="password"
                          validate="true"
                          name="password"
                          onChange={inputHandler}
                          value={state.password}
                        />
                      </div>

                      <div className="text-center mt-4">
                        <MDBBtn
                          color="light-blue"
                          className="mb-3"
                          type="submit"
                        >
                          Login
                        </MDBBtn>
                      </div>
                    </form>
                    <MDBModalFooter>
                      <div className="font-weight-light">
                        <p>Not a member? Sign Up</p>
                        <p>Forgot Password?</p>
                      </div>
                    </MDBModalFooter>
                  </MDBCardBody>
                </MDBCard>
              </div>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </div>
      <Footer />
    </div>
  );
};

export default LoginForm;
