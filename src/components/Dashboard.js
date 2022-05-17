import { Button } from "react-bootstrap";
import { firestore } from "../firebase";
import { useEffect, useState } from "react";
import { onSnapshot, collection } from "firebase/firestore";
import Layout from "./Layout";
import Sale from "./Sale";
import AddSale from "./AddSale";
import { isValidSale } from "../firestore";

const Dashboard = () => {
  const [sales, setSales] = useState([]);
  const [showAddSale, setShowAddSale] = useState(false);

  useEffect(
    () =>
      onSnapshot(collection(firestore, "sales"), (snapshot) => {
        setSales(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      }),
    []
  );
  return (
    <Layout>
      <div className="text-center mt-5">
        <Button onClick={() => setShowAddSale(true)} className="m-5">
          verkaufstermin hinzufügen
        </Button>
        <div className="scrollbar scrollbar-primary">
          {sales.map((sale) =>
            isValidSale({ sale }) ? <Sale sale={sale} key={sale.id} /> : null
          )}
        </div>
      </div>
      <AddSale show={showAddSale} onHide={() => setShowAddSale(false)} />
    </Layout>
  );
};

export default Dashboard;
