import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, User, Menu, X, LayoutDashboard, LogOut } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const { getCartCount } = useCart();
  const cartCount = getCartCount();
  const navigate = useNavigate();

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/');
    window.location.reload();
  };

  const isAdmin = user?.role === 'admin';

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-6 lg:gap-8">
          <button className="lg:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <Link to="/" className="text-xl sm:text-2xl lg:text-3xl font-bold">SHOP.CO</Link>
          <ul className="hidden lg:flex items-center gap-6 text-sm font-medium">
            <li><Link to="/products" className="hover:text-gray-600">Shop</Link></li>
            <li><Link to="/products" className="hover:text-gray-600">On Sale</Link></li>
            <li><Link to="/new-arrivals" className="hover:text-gray-600">New Arrivals</Link></li>
            <li><Link to="/products" className="hover:text-gray-600">Brands</Link></li>
          </ul>
        </div>

        <div className="hidden md:flex items-center bg-gray-100 rounded-full px-4 py-2 w-48 sm:w-64 lg:w-96">
          <Search size={18} className="text-gray-500" />
          <input type="text" placeholder="Search for products..." className="bg-transparent outline-none ml-2 w-full text-sm" />
        </div>

        <div className="flex items-center gap-3 sm:gap-4">
          <Search size={20} className="md:hidden cursor-pointer" />
          <Link to="/cart" className="relative cursor-pointer">
            <ShoppingCart size={20} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-black text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>

          {isAdmin ? (
            <>
              <Link
                to="/admin"
                className="hidden sm:flex items-center gap-2 bg-black text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-800 transition"
              >
                <LayoutDashboard size={16} />
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="hidden sm:flex items-center gap-2 border-2 border-red-500 text-red-500 px-4 py-2 rounded-full text-sm font-medium hover:bg-red-50 transition"
              >
                <LogOut size={16} />
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="cursor-pointer"><User size={20} /></Link>
          )}
        </div>
      </div>

      {isMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200 py-4 px-6 space-y-3 shadow-lg">
          <Link to="/products" className="block text-sm font-medium py-1" onClick={() => setIsMenuOpen(false)}>Shop</Link>
          <Link to="/products" className="block text-sm font-medium py-1" onClick={() => setIsMenuOpen(false)}>On Sale</Link>
          <Link to="/new-arrivals" className="block text-sm font-medium py-1" onClick={() => setIsMenuOpen(false)}>New Arrivals</Link>
          <Link to="/products" className="block text-sm font-medium py-1" onClick={() => setIsMenuOpen(false)}>Brands</Link>
          {isAdmin && (
            <>
              <hr className="border-gray-200" />
              <Link to="/admin" className="block text-sm font-medium py-1" onClick={() => setIsMenuOpen(false)}>Dashboard</Link>
              <button onClick={handleLogout} className="block text-sm font-medium text-red-500 py-1">Logout</button>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;