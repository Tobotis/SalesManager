import { Modal, Button, Form, Alert } from "react-bootstrap";
import { useState, useRef } from "react";
import { editSale } from "../firestore";

const EditSale = ({ show, onHide, sale }) => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const dateRef = useRef();
  const slotRef = useRef();
  const productRef = useRef();
  const notesRef = useRef();
  const capacityRef = useRef();
  const people = sale.people.map((_) => true);

  const handleEditSale = async (e) => {
    e.preventDefault();
    try {
      setError("");
      setLoading(true);
      const newPeople = [...sale.people];
      for (var i = people.length - 1; i > -1; i--) {
        if (!people[i]) {
          newPeople.splice(i, 1);
        }
      }
      await editSale({
        sale: {
          date: new Date(dateRef.current.value),
          slot: slotRef.current.value,
          product: productRef.current.value,
          people: newPeople,
          notes: notesRef.current.value,
          capacity: capacityRef.current.value,
        },
        id: sale.id,
      });

      onHide();
    } catch (error) {
      setError(error.message);
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
        <Modal.Title>verkauf bearbeiten</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleEditSale}>
          <Form.Group className="mb-3" id="date">
            <Form.Label>datum</Form.Label>
            <Form.Control
              type="date"
              ref={dateRef}
              defaultValue={sale.date.toDate().toISOString().substring(0, 10)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" id="slot">
            <Form.Label>pause</Form.Label>
            <Form.Select ref={slotRef} defaultValue={sale.slot} required>
              <option value={1}>1. pause</option>
              <option value={2}>2. pause</option>
              <option value={3}>3. pause</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3" id="capacity">
            <Form.Label>benötitge personen</Form.Label>
            <Form.Select
              ref={capacityRef}
              defaultValue={sale.capacity}
              required
            >
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3" id="people">
            <Form.Label>eingetragene personen</Form.Label>
            {sale.people.length == 0 && <div>keine personen eingetragen</div>}
            {sale.people.map((person, index) => (
              <div key={person}>
                <Form.Check>
                  <Form.Check.Input
                    defaultChecked={true}
                    onChange={(e) => (people[index] = e.target.checked)}
                  />
                  <Form.Check.Label>{person}</Form.Check.Label>
                </Form.Check>
              </div>
            ))}
          </Form.Group>
          <Form.Group className="mb-3" id="product">
            <Form.Label>produkt</Form.Label>
            <Form.Control ref={productRef} defaultValue={sale?.product} />
            <Form.Text className="text-muted">optional</Form.Text>
          </Form.Group>
          <Form.Group className="mb-3" id="notes">
            <Form.Label>notizen</Form.Label>
            <Form.Control ref={notesRef} defaultValue={sale?.notes} />
            <Form.Text className="text-muted">optional</Form.Text>
          </Form.Group>
          <Button
            disabled={loading}
            className="w-100"
            variant="primary"
            type="submit"
          >
            speichern
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditSale;
