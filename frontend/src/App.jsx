import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { CartProvider } from './context/CartContext';
import { AdminAuthProvider } from './context/AdminAuthContext';

import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Category from './pages/Category';
import Auth from './pages/Auth';

import AdminAuth from './pages/admin/AdminAuth';
import AdminLayout from './components/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminProducts from './pages/admin/AdminProducts';
import AdminUsers from './pages/admin/AdminUsers';
import AdminManage from './pages/admin/AdminManage';

function App() {
  return (
    <CartProvider>
      <AdminAuthProvider>
        <Router>
          <Toaster position="top-center" />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/new-arrivals" element={<Products />} />
            <Route path="/top-selling" element={<Products />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/category/:category" element={<Category />} />
            <Route path="/login" element={<Auth />} />
            <Route path="/signup" element={<Auth />} />

            <Route path="/admin/auth" element={<AdminAuth />} />
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="products" element={<AdminProducts />} />
              <Route path="users" element={<AdminUsers />} />
              <Route path="manage" element={<AdminManage />} />
            </Route>
          </Routes>
        </Router>
      </AdminAuthProvider>
    </CartProvider>
  );
}

export default App;