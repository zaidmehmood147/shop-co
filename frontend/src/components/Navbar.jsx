import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, ShoppingCart, User, Menu, X } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { getCartCount } = useCart();
  const cartCount = getCartCount();

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Left: Logo + Desktop Menu */}
        <div className="flex items-center gap-6 lg:gap-8">
          <button 
            className="lg:hidden" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <Link to="/" className="text-xl sm:text-2xl lg:text-3xl font-integral font-bold cursor-pointer">
            SHOP.CO
          </Link>
          <ul className="hidden lg:flex items-center gap-6 text-sm font-medium">
            <li><Link to="/products" className="hover:text-gray-600">Shop</Link></li>
            <li><Link to="/products" className="hover:text-gray-600">On Sale</Link></li>
            <li><Link to="/new-arrivals" className="hover:text-gray-600">New Arrivals</Link></li>
            <li><Link to="/products" className="hover:text-gray-600">Brands</Link></li>
          </ul>
        </div>

        {/* Search Bar */}
        <div className="hidden md:flex items-center bg-gray-100 rounded-full px-4 py-2 w-48 sm:w-64 lg:w-96">
          <Search size={18} className="text-gray-500" />
          <input
            type="text"
            placeholder="Search for products..."
            className="bg-transparent outline-none ml-2 w-full text-sm"
          />
        </div>

        {/* Right Icons */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Search Icon (Mobile) */}
          <Search size={20} className="md:hidden cursor-pointer" />
          
          {/* Cart Icon with Badge */}
          <Link to="/cart" className="relative cursor-pointer">
            <ShoppingCart size={20} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-black text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>
          
          {/* User Icon - Links to Login/Signup */}
          <Link to="/login" className="cursor-pointer hover:opacity-70 transition">
            <User size={20} />
          </Link>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200 py-4 px-6 space-y-3 shadow-lg">
          <Link to="/products" className="block text-sm font-medium hover:text-gray-600 py-1" onClick={() => setIsMenuOpen(false)}>
            Shop
          </Link>
          <Link to="/products" className="block text-sm font-medium hover:text-gray-600 py-1" onClick={() => setIsMenuOpen(false)}>
            On Sale
          </Link>
          <Link to="/new-arrivals" className="block text-sm font-medium hover:text-gray-600 py-1" onClick={() => setIsMenuOpen(false)}>
            New Arrivals
          </Link>
          <Link to="/products" className="block text-sm font-medium hover:text-gray-600 py-1" onClick={() => setIsMenuOpen(false)}>
            Brands
          </Link>
          <hr className="border-gray-200" />
          <Link to="/login" className="block text-sm font-medium hover:text-gray-600 py-1" onClick={() => setIsMenuOpen(false)}>
            Sign In
          </Link>
          <Link to="/signup" className="block text-sm font-medium hover:text-gray-600 py-1" onClick={() => setIsMenuOpen(false)}>
            Sign Up
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;