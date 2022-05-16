import React, { useRef, useState } from "react";
import { Card, Form, Button, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { signin } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError("");
      setLoading(true);
      await signin(emailRef.current.value, passwordRef.current.value);
      navigate("/");
    } catch {
      setError("irgendetwas ist schief gelaufen");
    }
    setLoading(false);
  };
  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">anmelden</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form className="mb-10" onSubmit={handleSubmit}>
            <Form.Group className="mb-3" id="email">
              <Form.Label>email</Form.Label>
              <Form.Control type="Email" ref={emailRef} required />
            </Form.Group>
            <Form.Group className="mb-3" id="password">
              <Form.Label>password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>
            <Button disabled={loading} className="w-100" type="submit">
              anmelden
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        hast du noch keinen account? <Link to="/signup">registrieren</Link>
      </div>
    </>
  );
};

export default Login;
