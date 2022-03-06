import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert, Container } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { useAuthenticationContext } from "../Contexts/useAuthContext";
import "../styles/login.css";
import Header from "./Header";

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();

  const [errorMessage, setErrorMessage] = useState("");
  const { setCurrentUserEmail } = useAuthenticationContext();
  const history = useHistory();
  const handleSubmit = e => {
    e.preventDefault();

    if (!emailRef.current.value) {
      return setErrorMessage("Missing email");
    }

    if (!passwordRef.current.value) {
      return setErrorMessage("Missing password");
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

    fetch("http://localhost:8080/login", requestOptions)
      .then(response => {
        return response.json();
      })
      .then(data => {
        if (data.message == "Wrong email or password") {
          setCurrentUserEmail(undefined);
          setErrorMessage(data.message);
        } else {
          setCurrentUserEmail(emailRef.current.value);
          history.push("/home");
        }
      });
  };

  const logIn = (
    <>
      <Header isLoggedIn={false} />
      <Container
        className='d-flex align-items-center justify-content-center'
        style={{ minHeight: "90vh" }}
      >
        <div className='w-100' style={{ maxWidth: "450px" }}>
          <Card>
            <Card.Body>
              <p id='welcome-back' className='text-center mb-4'>
                Welcome back
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
                <Button className='w-100' type='submit' id='login'>
                  Log In
                </Button>
              </Form>
              <div className='w-100 text-center mt-2'>
                Need an account? <Link to='/signup'>Sign Up</Link>
              </div>
            </Card.Body>
          </Card>
        </div>
      </Container>
    </>
  );

  return <>{logIn}</>;
}
