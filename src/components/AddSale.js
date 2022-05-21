import { Modal, Button, Form, Alert } from "react-bootstrap";
import { useState, useRef } from "react";
import { addSale } from "../firestore";

const AddSale = ({ show, onHide }) => {
  // loading and error hooks (used when submitting)
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // different refs for different inputs
  const dateRef = useRef();
  const slotRef = useRef();
  const productRef = useRef();
  const notesRef = useRef();
  const capacityRef = useRef();

  // submit handler
  const handleAddSale = async (e) => {
    e.preventDefault();
    try {
      setError("");
      setLoading(true);
      await addSale({
        date: new Date(dateRef.current.value),
        slot: slotRef.current.value,
        product: productRef.current.value,
        people: [],
        notes: notesRef.current.value,
        capacity: capacityRef.current.value,
      });
      onHide();
    } catch {
      setError("irgendetwas ist schief gelaufen");
    }
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
        <Modal.Title>verkauf hinzufügen</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleAddSale}>
          <Form.Group className="mb-3" id="date">
            <Form.Label>datum</Form.Label>
            <Form.Control type="date" ref={dateRef} required defaultValue={new Date().toISOString().substring(0, 10)} />
          </Form.Group>
          <Form.Group className="mb-3" id="slot">
            <Form.Label>pause</Form.Label>
            <Form.Select ref={slotRef} required>
              <option value={1}>1. pause</option>
              <option value={2}>2. pause</option>
              <option value={3}>3. pause</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3" id="capacity">
            <Form.Label>benötitge personen</Form.Label>
            <Form.Select ref={capacityRef} required>
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3" id="product">
            <Form.Label>produkt</Form.Label>
            <Form.Control ref={productRef} />
            <Form.Text className="text-muted">optional</Form.Text>
          </Form.Group>
          <Form.Group className="mb-3" id="notes">
            <Form.Label>notizen</Form.Label>
            <Form.Control ref={notesRef} />
            <Form.Text className="text-muted">optional</Form.Text>
          </Form.Group>
          <Button
            disabled={loading}
            className="w-100"
            variant="primary"
            type="submit"
          >
            hinzufügen
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddSale;
