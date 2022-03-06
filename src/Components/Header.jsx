import React from "react";
import { Container, Navbar, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useAuthenticationContext } from "../Contexts/useAuthContext";
export default function Header({ isLoggedIn }) {
  const history = useHistory();
  const { setCurrentUserEmail } = useAuthenticationContext();
  const logOut = () => {
    fetch("http://localhost:8080/logout");
    setCurrentUserEmail(undefined);
    history.push("/login");
  };
  return (
    <div>
      <Navbar bg='dark' variant='dark'>
        <Container>
          <Navbar.Brand>Simple Todo List</Navbar.Brand>
          <div>
            {isLoggedIn && (
              <Button
                style={{ marginRight: "20px" }}
                onClick={() => history.push("/add")}
              >
                Add
              </Button>
            )}
            {isLoggedIn && <Button onClick={() => logOut()}>Logout</Button>}
          </div>
        </Container>
      </Navbar>
    </div>
  );
}
