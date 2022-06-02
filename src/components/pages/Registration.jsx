import React, { useContext, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Context } from "../../App";

export default function Registration() {
  const { store } = useContext(Context);
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    store.registration(login, password);
  };

  return (
    <Container>
      <div className="w-50 m-auto mt-5">
        <Form onSubmit={onSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter login"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Create account
          </Button>
        </Form>
        <p className="mt-2">
          Already have an account? <Link to="/">Log in</Link>
        </p>
      </div>
    </Container>
  );
}
