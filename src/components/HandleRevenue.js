import { Modal, Button, Form, Alert, InputGroup } from "react-bootstrap";
import { useState, useRef } from "react";
import { editSale } from "../firestore";

const HandleRevenue = ({ show, onHide, sale }) => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  // Create state for revenue
  // If a revenue is given use that, otherwise default to 0
  const [revenue, setRevenue] = useState(sale?.revenue ? sale.revenue : 0);
  // Create ref for revenue field
  const revenueRef = useRef();

  // Checks if the argument revenue is a valid number (i.e.: 50) and not ("ab" or -6)
  const revenueIsValid = (revenue) => {
    // If the revenue is 0 return valid (to prevent false return of false in the next statement)
    if (revenue == 0) {
      return true;
    }

    // If the revenue is NaN or undefined return invalid
    if (!parseFloat(revenue)) {
      return false;
    }

    // If the revenue is negative return invalid
    if (revenue < 0) {
      return false;
    }

    // Otherwise return valid
    return true;
  };

  // Formats revenue to be the shape of XX,XX
  const formatRevenue = (revenue) => {
    return Intl.NumberFormat("de-DE", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(revenue);
  };

  // Remove/Strip undesired parts of the revenue input
  const stripRevenue = (revenue) => {
    return revenue.replace(",", ".").replace(" ", "");
  };

  // Handles saving of revenue in the database
  const handleEnterRevenue = async (e) => {
    e.preventDefault();
    try {
      // Reset loading and errors
      setError("");
      setLoading(true);

      // If entered revenue is invalid, show error to user
      if (!revenueIsValid(revenue)) throw Error("betrag ist nicht valide");

      // Round revenue to the nearest cent
      let new_revenue = Math.round(revenue * 100) / 100;

      // Update sale in the database
      await editSale({
        sale: {
          ...sale,
          revenue: new_revenue,
        },
        id: sale.id,
      });

      // Hide modal
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
        <Modal.Title>
          {sale?.revenue ? "umsatz verändern" : "umsatz eintragen"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleEnterRevenue}>
          <Form.Group className="mb-3" id="revenue">
            <Form.Label>umsatz</Form.Label>
            <InputGroup className="mb-3">
              <Form.Control
                ref={revenueRef}
                defaultValue={formatRevenue(revenue)}
                onChange={() => {
                  setRevenue(stripRevenue(revenueRef.current.value));
                }}
                required
              />
              <InputGroup.Text>{formatRevenue(revenue)}</InputGroup.Text>
              <InputGroup.Text>€</InputGroup.Text>
            </InputGroup>
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

export default HandleRevenue;
