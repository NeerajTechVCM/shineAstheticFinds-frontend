import React, { useState } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

const UploadProduct = () => {
  const [formData, setFormData] = useState({
    name: "",
    link: "",
    image: "",
    description: "",
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
        const res = await fetch("http://localhost:8080/uploadProduct", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
            credentials: "include",
          body: JSON.stringify(formData),
        });
  
        const data = await res.json();
  
        if (data.success) {
            console.log("Uploaded Product:", formData)
            alert("Product uploaded successfully!")
        }
       
      } catch (err) {
        console.error("Login error:", err);
   
      }

    // Reset form
    setFormData({ name: "", link: "", image: "", description: "" })
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-xl mt-8">
      <h2 className="text-2xl font-bold mb-6 text-blue-600 text-center">Upload Product</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="text-sm font-medium text-gray-700">Product Name</label>
          <Input
            type="text"
            name="name"
            placeholder="Enter product name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">Product Link</label>
          <Input
            type="url"
            name="link"
            placeholder="Enter product link"
            value={formData.link}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">Product Image Link</label>
          <Input
            type="url"
            name="image"
            placeholder="Enter image URL"
            value={formData.image}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">Description</label>
          <Textarea
            name="description"
            placeholder="Enter product description"
            rows={4}
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>

        <Button type="submit" className="w-full bg-blue-600 text-white hover:bg-blue-700">
          Upload Product
        </Button>
      </form>
    </div>
  )
}

export default UploadProduct
