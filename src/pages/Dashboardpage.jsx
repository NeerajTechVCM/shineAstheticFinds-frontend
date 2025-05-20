import React, { useEffect, useState } from "react";
import { Sparkles, Boxes } from "lucide-react";

export default function DashboardHome() {
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("http://localhost:8080/getUsers", {
          credentials: "include",
        });
        const data = await res.json();
        if (data.success) {
          console.log("Users:", data.users);
          setUsers(data.users);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
  
    fetchUsers();
  }, []);
  

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:8080/getAllProducts", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        });
        const data = await res.json();
        if (data.success) {
          setProducts(data.products);
        } else {
          alert("Failed to fetch products");
        }
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const latestThree = products.slice(0, 3);

  return (
    <div className="p-6">
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <div className="flex items-center gap-3 mb-4">
          <Sparkles className="text-blue-500 w-6 h-6" />
          <h2 className="text-2xl font-semibold"> Welcome, {users.length > 0 ? users[0].name : "Admin"} ✨</h2>
        </div>
        <p className="text-gray-600">
          Manage your product listings, review performance, and keep things running smoothly from your personalized dashboard.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-100 text-blue-800 p-4 rounded-lg shadow-sm flex items-center gap-4">
          <Boxes className="w-8 h-8" />
          <div>
            <h4 className="text-lg font-semibold">Total Products</h4>
            <p className="text-xl">{products.length}</p>
          </div>
        </div>
      </div>

      {/* Product Preview */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-4 text-blue-600">Recent Products</h3>
        {loading ? (
          <p className="text-gray-500">Loading products...</p>
        ) : latestThree.length === 0 ? (
          <p className="text-gray-500">No products available.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {latestThree.map((product) => (
              <div key={product._id} className="border rounded-lg p-4 shadow-sm hover:shadow-md transition">
                <img src={product.image} alt={product.name} className="h-40 w-full object-cover rounded mb-2" />
                <h4 className="font-semibold text-lg">{product.name}</h4>
                <p className="text-gray-600 text-sm">{product.description.slice(0, 60)}...</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
