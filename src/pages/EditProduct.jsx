import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useParams, useNavigate } from "react-router-dom";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    link: "",
    description: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch all products, then find the matching product by id
    const fetchAllProducts = async () => {
      try {
        const res = await fetch("http://localhost:8080/getAllProducts", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        });
        const data = await res.json();
        if (data.success) {
          const matchedProduct = data.products.find((p) => p._id === id);
          if (matchedProduct) {
            setProduct(matchedProduct);
            // Set initial formData placeholders to product data
            setFormData({
              name: matchedProduct.name || "",
              image: matchedProduct.image || "",
              link: matchedProduct.link || "",
              description: matchedProduct.description || "",
            });
          } else {
            alert("Product not found");
            navigate(-1);

          }
        } else {
          setError(data.message || "Failed to fetch products");
        }
      } catch (err) {
        console.error(err);
        setError("Error fetching products");
      } finally {
        setLoading(false);
      }
    };
    fetchAllProducts();
  }, [id, navigate]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Only send changed fields (or all, based on your logic)
    const updatedFields = {};
    for (const key in formData) {
      if (formData[key] !== product[key]) {
        updatedFields[key] = formData[key];
      }
    }

    try {
      const res = await fetch(`http://localhost:8080/editProduct/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(updatedFields),
      });
      const data = await res.json();

      if (data.success) {
        toast.success(data.message);
        setTimeout(() => {
          navigate(-1);
        }, 2000);
        
   

      } else {
        toast.error(data.message);
      }
    } catch (err) {
      console.error("Update error:", err);
    }
  };

  if (loading) {
    return (
      <div className="max-w-xl mx-auto mt-10 p-6 text-center text-gray-600">
        Loading product details...
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-xl mx-auto mt-10 p-6 text-center text-red-600">
        {error}
      </div>
    );
  }

  return (
    <>
    <Toaster/>
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      {/* Custom header */}
      <header className="mb-6 border-b border-blue-300 pb-2">
        <h1 className="text-3xl font-extrabold text-blue-700">
          Edit Product
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Update details for <span className="font-semibold">{product?.name}</span>
        </p>
      </header>
      <button
  type="button"
  onClick={() => navigate(-1)}
  className="mb-4 text-blue-600 hover:text-blue-800 underline text-sm"
>
  ← Go Back
</button>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Product Name"
          className="w-full p-2 border rounded"
          required
        />
        <input
          name="image"
          value={formData.image}
          onChange={handleChange}
          placeholder="Image URL"
          className="w-full p-2 border rounded"
          required
        />
        <input
          name="link"
          value={formData.link}
          onChange={handleChange}
          placeholder="Product Link"
          className="w-full p-2 border rounded"
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-full p-2 border rounded"
          rows={4}
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Update Product
        </button>
      </form>
    </div>
    </>
 
  );
};

export default EditProduct;
