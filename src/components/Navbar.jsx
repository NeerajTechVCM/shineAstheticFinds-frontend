import { useState } from "react";
import {
  Menu,
  X,
  Home,
  Info,
  ShoppingCart,
  Phone,
  Shield,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">

        {/* Logo and Brand */}
        <Link to="/" className="flex items-center space-x-3">
          <Shield className="text-blue-600 w-6 h-6" />
          <span className="text-xl font-semibold text-gray-800">Shine’sAestheticFinds🌷</span>
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden md:flex items-center space-x-8 text-gray-600 text-sm font-medium">
          <li>
            <Link to="/" className="hover:text-blue-600 flex items-center gap-1">
              <Home className="w-4 h-4" /> Home
            </Link>
          </li>
          <li>
            <Link to="/about" className="hover:text-blue-600 flex items-center gap-1">
              <Info className="w-4 h-4" /> About
            </Link>
          </li>
          <li>
            <Link to="/products" className="hover:text-blue-600 flex items-center gap-1">
              <ShoppingCart className="w-4 h-4" /> Products
            </Link>
          </li>
          <li>
            <Link to="/contact" className="hover:text-blue-600 flex items-center gap-1">
              <Phone className="w-4 h-4" /> Contact
            </Link>
          </li>
        </ul>

        {/* Admin Button */}
        <div className="hidden md:block">
          <Link to="/login">
            <Button variant="outline" className="flex items-center gap-2 text-blue-600 border-blue-600 hover:bg-blue-50">
              <Shield className="w-4 h-4" /> Admin Login
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Icon */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-gray-700 focus:outline-none">
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4 space-y-3 text-sm text-gray-700">
          <Link to="/" onClick={toggleMenu} className="flex items-center gap-2 hover:text-blue-600">
            <Home className="w-4 h-4" /> Home
          </Link>
          <Link to="/about" onClick={toggleMenu} className="flex items-center gap-2 hover:text-blue-600">
            <Info className="w-4 h-4" /> About
          </Link>
          <Link to="/products" onClick={toggleMenu} className="flex items-center gap-2 hover:text-blue-600">
            <ShoppingCart className="w-4 h-4" /> Products
          </Link>
          <Link to="/contact" onClick={toggleMenu} className="flex items-center gap-2 hover:text-blue-600">
            <Phone className="w-4 h-4" /> Contact
          </Link>
          <Link to="/login" onClick={toggleMenu}>
            <Button variant="outline" className="w-full flex items-center gap-2 text-blue-600 border-blue-600 hover:bg-blue-50">
              <Shield className="w-4 h-4" /> Admin Login
            </Button>
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
