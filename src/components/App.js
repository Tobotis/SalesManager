import Signup from "./Signup";
import { Container } from "react-bootstrap";
import { AuthProvider } from "../contexts/AuthContext";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./Dashboard";
import SignIn from "./SignIn";
import PrivateRoute from "./PrivateRoute";
function App() {
  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="w-100" style={{ maxWidth: "400" }}>
        <Router>
          <AuthProvider>
            <Routes>
              <Route exact path="/" element={<PrivateRoute />}>
                <Route exact path="/" element={<Dashboard />} />
              </Route>
              <Route path="/signup" element={<Signup />} />
              <Route path="/signin" element={<SignIn />} />
            </Routes>
          </AuthProvider>
        </Router>
      </div>
    </Container>
  );
}

export default App;
