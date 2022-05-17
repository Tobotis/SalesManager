import { Navbar, Nav, Container } from "react-bootstrap";

const NavigationBar = () => {
  const handleClick = () => {
    console.log("logout");
  }

  return (
    <Navbar collapseOnSelect fixed="top" expand="sm" bg="dark" variant="dark">
      <Container>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav>
            <Nav.Link href="">Cool</Nav.Link>
            <Nav.Link href="">Finance</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
