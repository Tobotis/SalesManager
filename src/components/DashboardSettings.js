import React, { useRef, useState, useEffect } from "react";
import { Accordion, Form, Button, FormCheck } from "react-bootstrap";


const DashboardSettings = ({ setFilters }) => {
  const [loading, setLoading] = useState(false);

  const [showPast, setShowPast] = useState(true)
  const [showFuture, setShowFuture] = useState(true)
  const [orderOfSort, setOrderOfSort] = useState(true)

  useEffect(() => { handleSubmit() }, [showPast, showFuture, orderOfSort])




  const sortByRef = useRef();


  const handleSubmit = () => {
    let filters = [];

    console.log("Past:" + showPast)
    console.log("Fut:" + showFuture)
    console.log("INv:" + orderOfSort)
    if (!showPast) filters.push("filter_past");
    if (!showFuture) filters.push("filter_future");
    if (!orderOfSort) filters.push("invert");
    filters.push(sortByRef.current.value);


    console.log(filters)

    setFilters(filters)

  }

  return (
    <>
      <Accordion>
        <Accordion.Header>
          filter</Accordion.Header>
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
            <Form.Group controlId="sorting">
              <Form.Text>sortieren nach</Form.Text>
              <Form.Select aria-label="Sortierung" ref={sortByRef} onChange={(e) => { handleSubmit(); }}>
                <option value={"sort_by_entry_date"}>Eintragsdatum</option>
                <option value={"sort_by_date"}>Datum</option>
                <option value={"sort_by_required_people"}>
                  Benötigte Personen
                </option>
                <option value={"sort_by_revenue"}>Umsatz</option>
              </Form.Select>
              <FormCheck
                defaultChecked={true}
                type="switch"
                id="order_of_sort"
                label="aufsteigend sortieren"
                onChange={(e) => { setOrderOfSort(e.target.checked); }}
              />
            </Form.Group>
            {/*<Button
              disabled={loading}
              className="w-100"
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
