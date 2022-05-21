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

const Dashboard = () => {
  // list of all sales in the database
  const [sales, setSales] = useState([]);
  // list of sales after applied filters/sorting
  const [processedSales, setProcessedSales] = useState([]);
  // list of applied filter keywords
  const [appliedFilters, setAppliedFilters] = useState(["sort_by_date"]);
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

    if (appliedFilters.includes("show_free")) {
      copy = copy.filter((a) => (a.capacity = !a.people.length));
    }

    // ==== APPLY SORTING ====

    // check if date sorting is active
    if (appliedFilters.includes("sort_by_date")) {
      copy.sort((a, b) => {
        return new Date(a.date.toDate()) - new Date(b.date.toDate());
      });
    }
    if (appliedFilters.includes("sort_by_required_people")) {
      copy.sort(
        (a, b) => a.capacity - a.people.length - (b.capacity - b.people.length)
      );
    }

    if (appliedFilters.includes("sort_by_revenue")) {
      copy.sort((a, b) => {
        if (typeof a.revenue != "number") return -1;
        if (typeof b.revenue != "number") return 1;
        return a.revenue - b.revenue;
      });
    }

    if (!appliedFilters.includes("ascending")) {
      copy = copy.map((item) => item).reverse();
    }

    setProcessedSales(copy);
  };
  console.log("---");

  return (
    <Layout>
      <DashboardSettings setFilters={setAppliedFilters} />
      <div className="text-center">
        {isAdmin() ? (
          <Button onClick={() => setShowAddSale(true)} className="m-5">
            verkaufstermin hinzufügen
          </Button>
        ) : null}
        <div>
          {processedSales.map((sale) => {
            console.log(sale);
            console.log(isValidSale(sale));
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
