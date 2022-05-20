import React, { useRef, useState } from "react";
import { Accordion, Form, Button } from "react-bootstrap";

export const SORT_BY_ENTRY_DATE = "sort_by_entry_date";
export const SORT_BY_DATE = "sort_by_date";
export const SORT_BY_REMAINING_PEOPLE = "sort_by_remaining_people";
export const SORT_BY_REVENUE = "sort_by_revenue";
export const NO_SELECTION = "no_selection";

const DashboardSettings = () => {
  const [loading, setLoading] = useState(false);

  const showPastRef = useRef();
  const showFutureRef = useRef();
  const sortByRef = useRef();
  const orderOfSortRef = useRef();

  return (
    <>
      <Accordion>
        <Accordion.Header>filter</Accordion.Header>
        <Accordion.Body>
          <Form>
            <Form.Group controlId="filter">
              <Form.Text>filtern</Form.Text>
              <Form.Check
                type="switch"
                id="show_past"
                label="vergangene Einträge anzeigen"
                ref={showPastRef}
              />
              <Form.Check
                type="switch"
                id="show_future"
                label="zukünftige Einträge anzeigen"
                ref={showFutureRef}
              />
            </Form.Group>
            <Form.Group controlId="sorting" className="mt-1">
              <Form.Text>sortieren nach</Form.Text>
              <Form.Select aria-label="Sortierung" ref={sortByRef}>
                <option value={SORT_BY_ENTRY_DATE}>Eintragsdatum</option>
                <option value={SORT_BY_DATE}>Datum</option>
                <option value={SORT_BY_REMAINING_PEOPLE}>
                  Benötigte Personen
                </option>
                <option value={SORT_BY_REVENUE}>Umsatz</option>
              </Form.Select>
              <Form.Check
                type="switch"
                className="my-1"
                id="order_of_sort"
                label="aufsteigend sortieren"
                ref={orderOfSortRef}
              />
            </Form.Group>
            <Button
              disabled={loading}
              className="w-100 mt-2"
              variant="primary"
              type="submit"
            >
              anwenden
            </Button>
          </Form>
        </Accordion.Body>
      </Accordion>
    </>
  );
};

export default DashboardSettings;
