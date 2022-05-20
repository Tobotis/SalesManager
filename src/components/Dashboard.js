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
import { inThePast, inTheFuture } from "../utils/dateFunctions";

const Dashboard = () => {
  const [sales, setSales] = useState([]);
  const [processedSales, setProcessedSales] = useState([]);
  const [appliedFilters, setAppliedFilters] = useState(["sort_by_date"]);
  const [showAddSale, setShowAddSale] = useState(false);
  const { isAdmin } = useAuth();
  useEffect(
    () => {
      onSnapshot(collection(firestore, "sales"), (snapshot) => {
        setSales(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));

      });
    },
    []
  );

  useEffect(
    () => {
      filterAndSort();
    },
    [sales, appliedFilters]
  )






  const filterAndSort = () => {

    let copy = sales;

    if (appliedFilters.includes("sort_by_date")) {
      copy.sort((a, b) => a.date < b.date)
    }

    if (appliedFilters.includes("sort_by_required_people")) {
      copy.sort((a, b) => a.capacity - a.people.length < b.capacity - b.people.length)
    }

    if (appliedFilters.includes("sort_by_entry_date")) {
      copy = sales;
    }

    if (appliedFilters.includes("sort_by_revenue")) {
      copy.sort((a, b) => a.revenue < b.revenue)
    }

    if (!appliedFilters.includes("invert")) {
      console.log("INVERT")
      copy.reverse();
    }

    if (appliedFilters.includes("filter_past")) {
      copy = copy.filter((a) => !inThePast(a))
    }

    if (appliedFilters.includes("filter_future")) {
      copy = copy.filter((a) => !inTheFuture(a))
    }

    if (appliedFilters.includes("filter_free")) {
      copy = copy.filter((a) => a.capacity = !a.people.length)
    }

    setProcessedSales(copy);

  }



  return (
    <Layout>
      <DashboardSettings setFilters={setAppliedFilters} />
      <div className="text-center">
        {isAdmin() ? (
          <Button onClick={() => setShowAddSale(true)} className="m-5">
            verkaufstermin hinzufügen
          </Button>
        ) : null}
        <div className="scrollbar scrollbar-primary">
          {processedSales.map((sale) =>
            isValidSale({ sale }) ? <Sale sale={sale} key={sale.id} /> : null
          )}
        </div>
      </div>
      <AddSale show={showAddSale} onHide={() => setShowAddSale(false)} />
    </Layout>
  );
};

export default Dashboard;
