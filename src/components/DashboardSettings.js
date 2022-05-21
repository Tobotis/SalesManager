import React, { useRef, useState, useEffect } from "react";
import { Accordion, Form, FormCheck } from "react-bootstrap";

// component for filter and sorting settings
const DashboardSettings = ({ setFilters }) => {
  // show sales, which are older than today
  const [showPast, setShowPast] = useState(false);
  // show sales, which are in more than a week
  const [showFuture, setShowFuture] = useState(false);
  // ref for sorting option
  const sortByRef = useRef();
  // set the sorting to be ascending or descending
  const [ascending, setAscending] = useState(false);

  // handle the change in a filter setting
  useEffect(() => {
    handleChange();
  }, [showPast, showFuture, ascending]);

  // function for handling the change in a filter setting
  const handleChange = () => {
    // list of all applied filters/sorting
    let filters = [];

    console.log("Past:" + showPast);
    console.log("Fut:" + showFuture);
    console.log("Asc:" + ascending);
    // Add filter/sorting keywords to list
    if (showPast) filters.push("show_past");
    if (showFuture) filters.push("show_future");
    if (ascending) filters.push("ascending");
    filters.push(sortByRef.current.value);

    console.log("handled Change:", filters);
    // use hook to update filters
    setFilters(filters);
  };

  return (
    <>
      <Accordion>
        <Accordion.Header>filter</Accordion.Header>
        <Accordion.Body>
          <Form onSubmit={handleChange}>
            <Form.Group controlId="filter">
              <Form.Text>filtern</Form.Text>
              <FormCheck
                defaultChecked={showPast}
                type="switch"
                id="show_past"
                label="vergangene Einträge anzeigen"
                onChange={(e) => {
                  setShowPast(e.target.checked);
                }}
              />
              <FormCheck
                defaultChecked={showFuture}
                type="switch"
                id="show_future"
                label="zukünftige Einträge anzeigen"
                onChange={(e) => {
                  setShowFuture(e.target.checked);
                }}
              />
            </Form.Group>
            <Form.Group controlId="sorting" className="mt-1">
              <Form.Text>sortieren nach</Form.Text>
              <Form.Select
                aria-label="Sortierung"
                ref={sortByRef}
                onChange={handleChange}
              >
                <option value={"sort_by_date"}>Datum</option>
                <option value={"sort_by_required_people"}>
                  Benötigte Personen
                </option>
                <option value={"sort_by_revenue"}>Umsatz</option>
              </Form.Select>
              <FormCheck
                defaultChecked={ascending}
                type="switch"
                className="my-1"
                id="order_of_sort"
                label="aufsteigend sortieren"
                onChange={(e) => {
                  setAscending(e.target.checked);
                }}
              />
            </Form.Group>
          </Form>
        </Accordion.Body>
      </Accordion>
    </>
  );
};

export default DashboardSettings;
