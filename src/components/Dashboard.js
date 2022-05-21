import { Button } from "react-bootstrap";
import { firestore } from "../firebase";
import { useEffect, useState } from "react";
import { onSnapshot, collection } from "firebase/firestore";
import { useAuth } from "../contexts/AuthContext";
import Layout from "./Layout";
import Sale from "./Sale";
import AddSale from "./AddSale";
import { isValidSale } from "../firestore";
import DashboardSettings from "./DashboardSettings";
import { inPast, inFuture } from "../utils/dateFunctions";
import { isValid } from "../utils/numberFunctions";

const Dashboard = () => {
  // list of all sales in the database
  const [sales, setSales] = useState([]);
  // list of sales after applied filters/sorting
  const [processedSales, setProcessedSales] = useState([]);
  // list of applied filter keywords
  const [appliedFilters, setAppliedFilters] = useState([
    "sort_by_date",
    "show_future",
  ]);
  // state for showing the add sale section
  const [showAddSale, setShowAddSale] = useState(false);
  // function for checking admin status
  const { isAdmin } = useAuth();

  useEffect(() => {
    // snapshot listener for sales
    onSnapshot(collection(firestore, "sales"), (snapshot) => {
      setSales(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
  }, []);

  // when sales or applied filters change, update processed sales
  useEffect(() => {
    filterAndSort();
  }, [sales, appliedFilters]);

  // function for filtering and sorting sales accoring to applied filters/sorting
  const filterAndSort = () => {
    // initialize copy of displays
    let copy = sales;

    // ==== APPLY FILTERS ====

    // filter if past sales should be shown
    if (!appliedFilters.includes("show_past")) {
      copy = copy.filter((a) => !inPast(a));
    }

    // filter if future sales should be shown
    if (!appliedFilters.includes("show_future")) {
      copy = copy.filter((a) => !inFuture(a));
    }

    if (appliedFilters.includes("show_full")) {
      copy = copy.filter((a) => (a.capacity = !a.people.length));
    }

    // ==== APPLY SORTING ====

    // check if date sorting is active
    if (appliedFilters.includes("sort_by_date")) {
      copy.sort((a, b) => {
        return new Date(a.date.toDate()) - new Date(b.date.toDate());
      });
    }
    // check if required people sorting is active
    if (appliedFilters.includes("sort_by_required_people")) {
      copy.sort((a, b) => {
        if (!isValid(a.capacity - a.people.length)) return -1;
        if (!isValid(b.capacity - b.people.length)) return 1;
        return a.capacity - a.people.length - (b.capacity - b.people.length);
      });
    }
    // check if revenue sorting is active
    if (appliedFilters.includes("sort_by_revenue")) {
      copy.sort((a, b) => {
        if (!isValid(a.revenue)) return -1;
        if (!isValid(b.revenue)) return 1;
        return a.revenue - b.revenue;
      });
    }
    // apply ascending sorting
    if (!appliedFilters.includes("ascending")) {
      copy = copy.map((item) => item).reverse();
    }
    setProcessedSales(copy);
  };

  return (
    <Layout>
      <DashboardSettings setFilters={setAppliedFilters} />
      <div className="text-center">
        {
          <div className="m-5">
            <Button
              onClick={() => setShowAddSale(true)}
              className=""
              disabled={!isAdmin()}
            >
              verkaufstermin hinzufügen
            </Button>
            {!isAdmin() ? (
              <div className="text-muted">adminrechte benötigt</div>
            ) : null}
          </div>
        }
        <div>
          {processedSales.map((sale) => {
            return isValidSale({ sale }) ? (
              <Sale sale={sale} key={sale.id} />
            ) : null;
          })}
        </div>
      </div>
      <AddSale show={showAddSale} onHide={() => setShowAddSale(false)} />
    </Layout>
  );
};

export default Dashboard;
