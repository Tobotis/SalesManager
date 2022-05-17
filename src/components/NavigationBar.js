import { Navbar, Nav, Container, Alert, Button } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const NavigationBar = () => {
  const { signout } = useAuth();
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
    <Navbar collapseOnSelect fixed="top" expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/">finanzkomitee</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link onClick={handleClick} disabled={loading}>
              abmelden
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
