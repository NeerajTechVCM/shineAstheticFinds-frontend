import React, { useEffect } from "react"
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  useNavigate,
} from "react-router-dom"

import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import Home from "./pages/Home"
import About from "./pages/About"
import Products from "./pages/Products"
import Contact from "./pages/Contact"
// import Signup from "./pages/Signup"
import AdminLogin from "./pages/Login"
import AdminDashboard from "./pages/Dashboard"
import Cookies from 'js-cookie';
import EditProduct from "./pages/EditProduct"



const AppWrapper = () => {
  const token = Cookies.get('token');
  const navigate = useNavigate();
  const location = useLocation(); 

  useEffect(() => {
    if (!token && location.pathname === "/admin-dashboard") {
      navigate("/login");
    }
  }, [navigate, location, token]);

  // Updated hide routes logic
  const hideLayoutRoutes = ["/admin-dashboard", "/admin-dashboard/editProduct"];
  const shouldHideLayout = hideLayoutRoutes.some(route =>
    location.pathname.startsWith(route)
  );

  return (
    <>
      {!shouldHideLayout && <Navbar />}

      <Routes>
        <Route
          path="/"
          element={
            <>
              <Home />
              <About />
              <Products />
              <Contact />
            </>
          }
        />
        <Route path="/about" element={<About />} />
        <Route path="/products" element={<Products />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<AdminLogin />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/admin-dashboard/editProduct/:id" element={<EditProduct />} />
      </Routes>

      {!shouldHideLayout && <Footer />}
    </>
  );
};

function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  )
}

export default App
