import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const AppWrapper = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch("https://shineaestheticfinds-backend.onrender.com/me", {
          credentials: "include",  // send cookies
        });

        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
        } else {
          setUser(null);
        }
      } catch (error) {
        setUser(null);
      }
    }

    checkAuth();
  }, []);

  useEffect(() => {
    // Redirect if trying to access admin routes without auth
    if (!user && location.pathname.startsWith("/admin-dashboard")) {
      navigate("/login");
    }
  }, [user, location, navigate]);

  // Routes where Navbar and Footer should be hidden
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
  
      <AppWrapper />
  
  )
}

export default App     