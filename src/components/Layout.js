import { Container } from "react-bootstrap";
import NavigationBar from "./NavigationBar";

const Layout = ({ children }) => {
  return (
    <div>
      <NavigationBar />
      <Container style={{ marginTop: 60 + "px" }}>{children}</Container>

    </div>
  );
};

export default Layout;
