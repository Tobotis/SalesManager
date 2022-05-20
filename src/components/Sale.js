import { Card, Button, ButtonGroup } from "react-bootstrap";
import EnterSale from "./EnterSale";
import { useState } from "react";
import { deleteSale } from "../firestore";
import EditSale from "./EditSale";
import HandleRevenue from "./HandleRevenue";
import { useAuth } from "../contexts/AuthContext";
import { inThePast } from "../utils/dateFunctions";





const Sale = ({ sale }) => {
  const [showEnterSale, setShowEnterSale] = useState(false);
  const [showEditSale, setShowEditSale] = useState(false);
  const [showRevenueEditSale, setShowRevenueEditSale] = useState(false);
  const { isAdmin } = useAuth();


  return (
    <>
      {/*Change border color regarding ti relationship to present*/}
      <Card className="mb-2" border={inThePast(sale) ? "secondary" : "info"}>
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
                person.replace(" ", "") +
                (index === sale.people.length - 2
                  ? " & "
                  : index != sale.people.length - 1
                    ? ", "
                    : " ")
            )}
          </Card.Text>
        </Card.Body>
        <Card.Footer className="text-muted">
          <ButtonGroup aria-label="Basic example">
            <Button size="sm" onClick={() => setShowEnterSale(true)}>
              beitreten
            </Button>
            <Button size="sm" onClick={() => setShowEditSale(true)}>
              bearbeiten
            </Button>
            <Button
              size="sm"
              variant={sale?.revenue ? "outline-secondary" : "primary"}
              onClick={() => setShowRevenueEditSale(true)}
            >
              {" "}
              <a style={sale?.revenue ? { color: "green" } : {}}>
                {" "}
                {(sale?.revenue ? "+" : "") +
                  (sale?.revenue
                    ? Intl.NumberFormat("de-DE", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    }).format(sale.revenue) + " €"
                    : "umsatz")}{" "}
              </a>
            </Button>
            {isAdmin() ? (
              <Button
                size="sm"
                variant="danger"
                onClick={() => deleteSale(sale.id)}
              >
                löschen
              </Button>
            ) : null}
          </ButtonGroup>
        </Card.Footer>
      </Card>
      <EnterSale
        show={showEnterSale}
        onHide={() => setShowEnterSale(false)}
        sale={sale}
      />
      <EditSale
        show={showEditSale}
        onHide={() => setShowEditSale(false)}
        sale={sale}
      />
      <HandleRevenue
        show={showRevenueEditSale}
        onHide={() => setShowRevenueEditSale(false)}
        sale={sale}
      />
    </>
  );
};

export default Sale;
