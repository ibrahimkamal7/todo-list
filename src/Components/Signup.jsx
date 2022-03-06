import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert, Container } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import Header from "./Header";
import "../styles/signup.css";
import { useAuthenticationContext } from "../Contexts/useAuthContext";
export default function Signup() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const [errorMessage, setErrorMessage] = useState("");

  const history = useHistory();

  const { setCurrentUserEmail } = useAuthenticationContext();
  const handleSubmit = e => {
    e.preventDefault();
    if (!emailRef.current.value) {
      return setErrorMessage("Missing email");
    }

    if (!passwordRef.current.value) {
      return setErrorMessage("Missing password");
    }

    if (passwordRef.current.value !== confirmPasswordRef.current.value) {
      return setErrorMessage("Passwords do not match");
    }

    const requestOptions = {
      method: "POST",
      body: JSON.stringify({
        email: emailRef.current.value,
        password: passwordRef.current.value,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    };

    fetch("http://localhost:8080/signUp", requestOptions)
      .then(response => {
        return response.json();
      })
      .then(data => {
        if (data.message == "Successfull signup") {
          setCurrentUserEmail(emailRef.current.value);
          setErrorMessage("");
          history.push("/home");
        } else {
          setCurrentUserEmail(undefined);
          setErrorMessage(data.message);
        }
      });
  };
  const primarySignUp = (
    <>
      <Card>
        <Card.Body>
          <p id='started-text' className='text-center mb-4'>
            Let's get you started
          </p>
          {errorMessage && <Alert variant='danger'>{errorMessage}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id='email'>
              <Form.Label>Email</Form.Label>
              <Form.Control type='email' ref={emailRef} />
            </Form.Group>
            <Form.Group id='password'>
              <Form.Label>Password</Form.Label>
              <Form.Control type='password' ref={passwordRef} />
            </Form.Group>
            <Form.Group id='confirmPassword'>
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control type='password' ref={confirmPasswordRef} />
            </Form.Group>
            <Button className='w-100' type='submit' id='submit'>
              Sign up
            </Button>
          </Form>
          <div className='w-100 text-center mt-2'>
            Already have an account? <Link to='/login'>Log In</Link>
          </div>
        </Card.Body>
      </Card>
    </>
  );
  return (
    <>
      <Header isLoggedIn={false} />
      <Container
        className='d-flex align-items-center justify-content-center'
        style={{ minHeight: "90vh" }}
        id='signup'
      >
        <div className='w-100' style={{ maxWidth: "450px" }}>
          {primarySignUp}
        </div>
      </Container>
    </>
  );
}
