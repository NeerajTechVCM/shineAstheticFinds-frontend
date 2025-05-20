import React, { useState } from "react"
import { Menu, X, LayoutDashboard, UploadCloud, Eye, LogOut } from "lucide-react"
import Cookies from "js-cookie"
import { useNavigate } from "react-router-dom"

export default function Sidebar({ active, setActive }) {
  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate()

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: <LayoutDashboard className="w-5 h-5" /> },
    { id: "upload", label: "Upload Product", icon: <UploadCloud className="w-5 h-5" /> },
    { id: "view", label: "View Products", icon: <Eye className="w-5 h-5" /> },
  ]

  const handleNavClick = (id) => {
    setActive(id)
    setIsOpen(false)
  }

  const handleLogout = async () => {
    try {
      const res = await fetch("http://localhost:8080/logout", {
        method: "POST",
        credentials: "include",  // Send cookies if session-based
      });
      const data = await res.json();
      if (data.success) {
        // Clear client-side token or auth data if any
        Cookies.remove("token");
        navigate("/login");
      } else {
        alert("Failed to logout");
      }
    } catch (err) {
      console.error("Logout error:", err);
      alert("An error occurred during logout");
    }
  };
  

  return (
    <>
      {/* Mobile Top Bar */}
      <div
        className={`md:hidden fixed top-0 left-0 z-50 bg-white shadow p-4 flex items-center justify-between
          ${isOpen ? "w-64" : "w-full"}`}
      >
        <h2 className="text-lg font-semibold text-blue-600">Admin Panel</h2>
        <button onClick={() => setIsOpen(!isOpen)} className="text-gray-700">
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Desktop Sidebar */}
      <aside className="bg-white shadow-lg w-64 hidden md:flex flex-col fixed top-0 bottom-0 left-0 z-40 p-6 justify-between">
        <div>
          <h2 className="text-2xl font-bold text-blue-600 mb-8">Admin Panel</h2>
          <nav className="space-y-4">
            {navItems.map((item) => (
              <div
                key={item.id}
                onClick={() => setActive(item.id)}
                className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer hover:bg-blue-50 transition ${
                  active === item.id ? "bg-blue-100 text-blue-700 font-semibold" : "text-gray-700"
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </div>
            ))}
          </nav>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-red-600 hover:text-red-700 font-semibold p-2 rounded cursor-pointer"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </aside>

      {/* Mobile Drawer Sidebar */}
      {isOpen && (
        <div className="fixed inset-0 z-40 bg-blue-100 bg-opacity-20 md:hidden" onClick={() => setIsOpen(false)}>
          <div
            className="w-64 h-full bg-white shadow-md p-6 relative flex flex-col justify-between"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Inside Close Button */}
            <button
              className="absolute top-4 right-4 text-gray-600 hover:text-blue-600"
              onClick={() => setIsOpen(false)}
            >
              <X className="w-6 h-6" />
            </button>

            <div>
              <h2 className="text-xl font-bold text-blue-600 mb-6">Admin Panel</h2>
              <nav className="space-y-4 mt-8">
                {navItems.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer hover:bg-blue-50 transition ${
                      active === item.id ? "bg-blue-100 text-blue-700 font-semibold" : "text-gray-700"
                    }`}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </div>
                ))}
              </nav>
            </div>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-red-600 hover:text-red-700 font-semibold p-2 rounded cursor-pointer mt-6"
            >
              <LogOut className="w-5 h-5" />
              Logout
            </button>
          </div>
        </div>
      )}
    </>
  )
}
