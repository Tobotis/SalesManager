import { Card, Button } from "react-bootstrap";
import EnterSale from "./EnterSale";
import { useState } from "react";

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
          <Button onClick={() => setShowEnterSale(true)}>beitreten</Button>
        </Card.Body>
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
