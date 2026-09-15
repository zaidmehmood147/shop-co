import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Lock, User as UserIcon } from 'lucide-react';
import { API_URL } from '../../api/config';
import { useAdminAuth } from '../../context/AdminAuthContext';

const AdminAuth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login, isAuthenticated, loading: authLoading } = useAdminAuth();

  if (!authLoading && isAuthenticated) {
    return <Navigate to="/admin" replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(`${API_URL}/admin/login`, { email, password });
      if (res.data.success) {
        login(res.data.token, res.data.admin);
        toast.success('Welcome back, Admin!');
        navigate('/admin');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-5 sm:p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-11 h-11 sm:w-12 sm:h-12 bg-black rounded-xl flex items-center justify-center flex-shrink-0">
            <Lock size={20} className="text-white sm:w-6 sm:h-6" />
          </div>
          <div className="min-w-0">
            <h1 className="text-lg sm:text-xl font-bold">Admin Panel</h1>
            <p className="text-[10px] sm:text-xs text-gray-500">Ecommerce Management</p>
          </div>
        </div>

        <h2 className="text-2xl sm:text-3xl font-bold mb-1">Welcome back</h2>
        <p className="text-xs sm:text-sm text-gray-500 mb-6">Sign in to access your dashboard.</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Username</label>
            <div className="relative">
              <UserIcon size={18} className="absolute left-3 top-3.5 text-gray-400" />
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your username"
                className="w-full border border-gray-200 rounded-lg pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-black"
                required
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium">Password</label>
              <button type="button" className="text-xs text-gray-500 hover:text-black">Forgot password?</button>
            </div>
            <div className="relative">
              <Lock size={18} className="absolute left-3 top-3.5 text-gray-400" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full border border-gray-200 rounded-lg pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-black"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition disabled:opacity-50 text-sm sm:text-base"
          >
            {loading ? 'Signing in...' : 'Login'}
          </button>
        </form>

        <div className="border-t border-gray-100 mt-6 pt-4 text-center">
          <p className="text-[10px] sm:text-xs text-gray-400">Authorized administrators only</p>
        </div>
        <p className="text-center text-[10px] sm:text-xs text-gray-400 mt-3">© 2026 Admin Dashboard</p>
      </div>
    </div>
  );
};

export default AdminAuth;