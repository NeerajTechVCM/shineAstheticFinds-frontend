import React, { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { ShoppingBag } from "lucide-react"

  
export default function ProductsPage() {
      const [products, setProducts] = useState([]);
      const [loading, setLoading] = useState(true); 
      const [error, setError] = useState(null);
    
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
    
  return (
    <section className="w-full min-h-screen bg-gradient-to-b from-rose-50 via-pink-50 to-amber-50 px-6 md:px-20 py-16">
      <div className="max-w-6xl mx-auto text-center space-y-10">
        {/* Header */}
        <div className="space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold text-rose-600">Shine Picks ✨</h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Discover hand-picked aesthetic essentials to help you align your energy, elevate your space, and express your glow.
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all border border-rose-100 flex flex-col"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-56 object-cover"
              />
              <div className="p-6 flex flex-col flex-grow justify-between space-y-4">
                <div>
                  <h3 className="text-xl font-semibold text-rose-600">{product.name}</h3>
                  <p className="text-gray-600 mt-2 text-sm">{product.description}</p>
                </div>

                <a href={product.link} target="_blank" rel="noopener noreferrer">
                  <Button className="w-full mt-4 flex items-center justify-center gap-2 bg-rose-500 hover:bg-rose-600 text-white shadow-md">
                    <ShoppingBag className="w-4 h-4" />
                    View Product
                  </Button>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
