import React, { useEffect, useState } from "react";
import { Accordion, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useAuthenticationContext } from "../Contexts/useAuthContext";
import Header from "./Header";
export default function Home() {
  const [todos, setTodos] = useState([]);
  const removeTodo = id => {
    const requestOptions = {
      method: "POST",
      body: JSON.stringify({
        id,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    };

    fetch("http://localhost:8080/deleteTodo", requestOptions)
      .then(response => {
        return response.json();
      })
      .then(data => {
        fetchTodos();
      });
  };
  const history = useHistory();
  const { currentUserEmail } = useAuthenticationContext();
  if (!currentUserEmail) {
    history.push("./login");
  }
  const fetchTodos = () => {
    const requestOptions = {
      method: "POST",
      body: JSON.stringify({
        userEmail: currentUserEmail,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    };

    fetch("http://localhost:8080/getTodosForAUser", requestOptions)
      .then(response => {
        return response.json();
      })
      .then(data => {
        setTodos(data.result);
      });
  };
  useEffect(() => {
    fetchTodos();
  }, []);

  const getSingleItem = (todo, index) => {
    return (
      <Accordion.Item eventKey={index} key={todo.id}>
        <Accordion.Header>{todo.title}</Accordion.Header>
        <Accordion.Body>
          <p style={{ fontWeight: "bold" }}>Priority: {todo.priority}</p>
          <p>{todo.description}</p>
          <Button
            style={{ display: "block", marginTop: "10px" }}
            onClick={() => removeTodo(todo.id)}
          >
            Remove
          </Button>
        </Accordion.Body>
      </Accordion.Item>
    );
  };
  return (
    <div>
      <Header isLoggedIn={true} />
      <Accordion>
        {todos
          .sort((todo1, todo2) => {
            return todo1.priority < todo2.priority ? -1 : 1;
          })
          .map((todo, index) => {
            return getSingleItem(todo, index);
          })}
      </Accordion>
    </div>
  );
}
