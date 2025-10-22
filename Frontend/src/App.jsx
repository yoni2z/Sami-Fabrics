import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home";
import ProductsPage from "./pages/ProductsPage";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import AdminDashboard from "./pages/AdminDashboard";
import Login from "./pages/Login";
import DesingedBy from "./components/DesignedBy";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isStaff, setIsStaff] = useState(false);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route
          path="/login"
          element={
            <Login
              setIsAuthenticated={setIsAuthenticated}
              setIsStaff={setIsStaff}
            />
          }
        />
        <Route
          path="/samifabrics"
          element={
            isAuthenticated && isStaff ? (
              <AdminDashboard />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
      <Footer />
      <DesingedBy />
    </Router>
  );
}

export default App;
