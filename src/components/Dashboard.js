import { Button, Alert, Card } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "./Layout";

const Dashboard = () => {
  const { signout, currentUser } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleClick = async () => {
    try {
      setLoading(true);
      await signout();
      navigate("/signin");
    } catch {
      setError("irgendetwas ist schief gelaufen");
    }
    setLoading(false);
  };
  return (
    <Layout>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Dashboard</h2>
          {error ?? <Alert variant="danger">{error}</Alert>}
        </Card.Body>
      </Card>
      <Button className="w-100" onClick={handleClick} disabled={loading}>
        Abmelden
      </Button>
    </Layout>
  );
};

export default Dashboard;
