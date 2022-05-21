import React, { useRef, useState, useEffect } from "react";
import { Accordion, Form, Button, FormCheck } from "react-bootstrap";


const DashboardSettings = ({ setFilters }) => {
  const [loading, setLoading] = useState(false);

  const [showPast, setShowPast] = useState(true)
  const [showFuture, setShowFuture] = useState(true)
  const [increasing, setIncreasing] = useState(true)

  useEffect(() => { handleSubmit() }, [showPast, showFuture, increasing])




  const sortByRef = useRef();


  const handleSubmit = () => {
    let filters = [];


    if (!showPast) filters.push("filter_past");
    if (!showFuture) filters.push("filter_future");
    if (!increasing) filters.push("invert");
    filters.push(sortByRef.current.value);


    console.log(filters)

    setFilters(filters)

  }

  return (
    <>
      <Accordion>
        <Accordion.Header>filter</Accordion.Header>
        <Accordion.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="filter">
              <Form.Text>filtern</Form.Text>
              <FormCheck
                defaultChecked={true}
                type="switch"
                id="show_past"
                label="vergangene Einträge anzeigen"
                onChange={(e) => { setShowPast(e.target.checked); }}
              />
              <FormCheck
                defaultChecked={true}
                type="switch"
                id="show_future"
                label="zukünftige Einträge anzeigen"
                onChange={(e) => { setShowFuture(e.target.checked); }}
              />
            </Form.Group>
            <Form.Group controlId="sorting" className="mt-1">
              <Form.Text>sortieren nach</Form.Text>
              <Form.Select aria-label="Sortierung" ref={sortByRef} onChange={(e) => { console.log("He"); handleSubmit(); }}>
                {/*<option value={"sort_by_entry_date"}>Eintragsdatum</option>*/}
                <option value={"sort_by_date"}>Datum</option>
                <option value={"sort_by_required_people"}>
                  Benötigte Personen
                </option>
                <option value={"sort_by_revenue"}>Umsatz</option>
              </Form.Select>
              <FormCheck
                defaultChecked={true}
                type="switch"
                className="my-1"
                id="order_of_sort"
                label="aufsteigend sortieren"
                onChange={(e) => { setIncreasing(e.target.checked); }}
              />
            </Form.Group>
            {/*<Button
              disabled={loading}
              className="w-100 mt-2"
              variant="primary"
              type="submit"
            >
              anwenden
  </Button>*/}
          </Form>
        </Accordion.Body>
      </Accordion>
    </>
  );
};

export default DashboardSettings;
