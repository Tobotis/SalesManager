import React, { useRef } from "react";
import { Card, Form, Button } from "react-bootstrap";

const PasswordSignUp = () => {
  const passwordRef = useRef();

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">zum verkauf registrieren</h2>
          <Form>
            <Form.Group id="password">
              <Form.Label>password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>
          </Form>
          <Button className="w-100" type="submit">
            weiter
          </Button>
        </Card.Body>
      </Card>
    </>
  );
};

export default PasswordSignUp;