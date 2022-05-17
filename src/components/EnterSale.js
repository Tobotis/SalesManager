import { Modal, Button, Form, Alert } from "react-bootstrap";
import { useState, useRef } from "react";
import { enterSale } from "../firestore";

const EnterSale = ({ show, onHide, sale }) => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const nameRef = useRef();

  const handleEnterSale = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    await enterSale({
      name: nameRef.current.value,
      sale: sale,
    });
    onHide();

    setLoading(false);
  };
  return (
    <Modal
      show={show}
      onHide={() => {
        setError("");
        onHide();
      }}
    >
      <Modal.Header closeButton>
        <Modal.Title>verkauf beitreten</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleEnterSale}>
          <Form.Group className="mb-3" id="product">
            <Form.Label>dein name</Form.Label>
            <Form.Control ref={nameRef} required />
          </Form.Group>
          <Button
            disabled={loading}
            className="w-100"
            variant="primary"
            type="submit"
          >
            beitreten
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EnterSale;
