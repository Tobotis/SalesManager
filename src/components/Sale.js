import { Card, Button, ButtonGroup } from "react-bootstrap";
import EnterSale from "./EnterSale";
import { useState } from "react";
import { deleteSale } from "../firestore";

const Sale = ({ sale }) => {
  const [showEnterSale, setShowEnterSale] = useState(false);
  return (
    <>
      <Card>
        <Card.Body>
          <Card.Title>
            {sale.product} (
            {sale.date.toDate().toLocaleDateString("de-DE", {
              weekday: "long",
              year: "numeric",
              month: "short",
              day: "2-digit",
            })}
            )
          </Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            {sale.slot}. Pause
          </Card.Subtitle>
          <Card.Text>
            {sale.people.length}/{sale.capacity} <br />
            {sale.people.map(
              (person, index) =>
                person + (index != sale.people.length - 1 ? ", " : "")
            )}
          </Card.Text>
        </Card.Body>
        <Card.Footer className="text-muted">
          <ButtonGroup aria-label="Basic example">
            <Button onClick={() => setShowEnterSale(true)}>beitreten</Button>
            <Button variant="danger" onClick={() => deleteSale(sale.id)}>
              löschen
            </Button>
          </ButtonGroup>
        </Card.Footer>
      </Card>
      <EnterSale
        show={showEnterSale}
        onHide={() => setShowEnterSale(false)}
        sale={sale}
      />
    </>
  );
};

export default Sale;
