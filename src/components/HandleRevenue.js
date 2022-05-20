import { Modal, Button, Form, Alert, InputGroup } from "react-bootstrap";
import { useState, useRef } from "react";
import { editSale } from "../firestore";

const HandleRevenue = ({ show, onHide, sale }) => {
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [revenue, setRevenue] = useState(sale?.revenue ? sale.revenue : 0);
    const revenueRef = useRef();

    const handleEnterRevenue = async (e) => {
        e.preventDefault();
        try {
            setError("");
            setLoading(true);

            let new_revenue = revenue;
            new_revenue = Math.round(new_revenue * 100) / 100

            await editSale({
                sale: {
                    ...sale, revenue: new_revenue
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
                <Modal.Title>{(sale.revenue === undefined || sale.revenue) ? "umsatz eintragen" : "umsatz verändern"}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {error && <Alert variant="danger">{error}</Alert>}
                <Form onSubmit={handleEnterRevenue}>
                    <Form.Group className="mb-3" id="revenue">
                        <Form.Label>umsatz</Form.Label>
                        <InputGroup className="mb-3">

                            <Form.Control
                                ref={revenueRef}
                                defaultValue={Intl.NumberFormat("de-DE", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(revenue)}
                                onChange={() => {
                                    setRevenue(revenueRef.current.value.replace(",", ".").replace(" ", "").replace("\t", "").replace("\n", ""))
                                }}
                                required
                            />
                            <InputGroup.Text>{Intl.NumberFormat("de-DE", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(revenue)}</InputGroup.Text>
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
}

export default HandleRevenue
