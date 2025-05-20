import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ViewProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);
  const navigate = useNavigate(); 
  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const res = await fetch("http://localhost:8080/getAllProducts", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        const data = await res.json();

        if (data.success) {
          setProducts(data.products);
        } else {
          setError(data.message || "Failed to fetch products");
        }
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Something went wrong while fetching products.");
      } finally {
        setLoading(false);
      }
    };

    fetchAllProducts();
  }, []);

  // Placeholder edit handler — could redirect to an edit form
  const handleEdit = (productId) => {
    // For example, navigate to `/edit-product/${productId}`
    navigate(`/admin-dashboard/editProduct/${productId}`);
  };

  // Delete handler - calls backend and updates state
  const handleDelete = async (productId) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      const res = await fetch(`http://localhost:8080/deleteProduct/${productId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const data = await res.json();

      if (data.success) {
        setProducts(products.filter((product) => product._id !== productId));
      } else {
        alert(data.message || "Failed to delete product");
      }
    } catch (err) {
      console.error("Error deleting product:", err);
      alert("Something went wrong deleting the product.");
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 mt-8">
      <h2 className="text-3xl font-bold text-blue-600 mb-8 text-center">
        View Products
      </h2>

      {loading ? (
        <p className="text-center text-gray-500">Loading products...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : products.length === 0 ? (
        <p className="text-center text-gray-600">No products available.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-white shadow-lg rounded-xl overflow-hidden hover:shadow-xl transition-shadow flex flex-col"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4 space-y-2 flex-grow">
                <h3 className="text-lg font-semibold text-gray-800">
                  {product.name}
                </h3>
                <p className="text-sm text-gray-600">{product.description}</p>
                <a
                  href={product.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-2 text-sm font-medium text-blue-600 hover:underline"
                >
                  View Product
                </a>
              </div>

              <div className="p-4 flex justify-between border-t border-gray-200">
                <button
                  onClick={() => handleEdit(product._id)}
                  className="px-3 py-1 bg-yellow-400 hover:bg-yellow-500 text-white rounded-md font-semibold"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(product._id)}
                  className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded-md font-semibold"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewProducts;
