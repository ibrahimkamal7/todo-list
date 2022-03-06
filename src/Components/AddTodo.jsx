import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert, Container } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useAuthenticationContext } from "../Contexts/useAuthContext";
import Header from "./Header";
export default function AddTodo() {
  const titleRef = useRef();
  const priorityRef = useRef();
  const descriptionRef = useRef();
  const [errorMessage, setErrorMessage] = useState("");
  const history = useHistory();
  const { currentUserEmail } = useAuthenticationContext();

  if (!currentUserEmail) {
    history.push("./login");
  }
  const handleSubmit = e => {
    e.preventDefault();
    if (!titleRef.current.value) {
      return setErrorMessage("Missing title");
    }

    if (!priorityRef.current.value) {
      return setErrorMessage("Missing password");
    }
    const requestOptions = {
      method: "POST",
      body: JSON.stringify({
        userEmail: currentUserEmail,
        title: titleRef.current.value,
        description: descriptionRef.current.value,
        priority: priorityRef.current.value,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    };

    fetch("http://localhost:8080/addTodo", requestOptions)
      .then(response => {
        return response.json();
      })
      .then(data => {
        history.push("/home");
      });
  };
  const addTodo = (
    <>
      <Card>
        <Card.Body>
          <p id='welcome-back' className='text-center mb-4'>
            Add Todo
          </p>
          {errorMessage && <Alert variant='danger'>{errorMessage}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id='title' style={{ marginBottom: "15px" }}>
              <Form.Label>Title</Form.Label>
              <Form.Control ref={titleRef} />
            </Form.Group>
            <Form.Group id='priority'>
              <Form.Label>Priority</Form.Label>
              <Form.Control type='number' ref={priorityRef} />
            </Form.Group>
            <Form.Group id='description'>
              <Form.Label>Description</Form.Label>
              <Form.Control ref={descriptionRef} />
            </Form.Group>
            <Button className='w-100' type='submit' id='submit'>
              Add
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </>
  );
  return (
    <>
      <Header isLoggedIn={true} />
      <Container
        className='d-flex align-items-center justify-content-center'
        style={{ minHeight: "90vh" }}
        id='signup'
      >
        <div className='w-100' style={{ maxWidth: "450px" }}>
          {addTodo}
        </div>
      </Container>
    </>
  );
}
