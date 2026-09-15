import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Eye, EyeOff } from 'lucide-react';
import { API_URL, getImageUrl } from '../api/config';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Auth = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(location.pathname === '/signup');
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ fullName: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setIsSignUp(location.pathname === '/signup');
  }, [location.pathname]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${API_URL}/products?limit=3`);
        setProducts(response.data.products);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const endpoint = isSignUp ? '/auth/signup' : '/auth/login';
      const payload = isSignUp
        ? { name: formData.fullName, email: formData.email, password: formData.password }
        : { email: formData.email, password: formData.password };

      const response = await axios.post(`${API_URL}${endpoint}`, payload);

      if (response.data.success) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));

        if (response.data.user.role === 'admin') {
          navigate('/admin');
        } else {
          navigate('/');
        }
        window.location.reload();
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const toggleTab = (tab) => {
    setIsSignUp(tab === 'signup');
    setError('');
    setFormData({ fullName: '', email: '', password: '' });
    navigate(tab === 'signup' ? '/signup' : '/login');
  };

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <span key={i} className={i < fullStars ? 'text-yellow-400' : 'text-gray-300'}>
          ★
        </span>
      );
    }
    return stars;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="container mx-auto px-4 py-4 text-sm text-gray-500">
        <Link to="/" className="hover:text-black">Home</Link>
        <span className="mx-2">›</span>
        <span className="text-black font-medium">{isSignUp ? 'Sign Up' : 'Sign In'}</span>
      </div>

      <div className="flex-1 container mx-auto px-4 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          <div className="max-w-md mx-auto w-full">
            <div className="bg-white rounded-2xl shadow-sm p-6 sm:p-8">
              <div className="flex border-b border-gray-200 mb-6">
                <button
                  onClick={() => toggleTab('signin')}
                  className={`flex-1 pb-3 text-center font-medium text-sm transition ${
                    !isSignUp ? 'border-b-2 border-black text-black' : 'text-gray-500 hover:text-black'
                  }`}
                >
                  Sign In
                </button>
                <button
                  onClick={() => toggleTab('signup')}
                  className={`flex-1 pb-3 text-center font-medium text-sm transition ${
                    isSignUp ? 'border-b-2 border-black text-black' : 'text-gray-500 hover:text-black'
                  }`}
                >
                  Sign Up
                </button>
              </div>

              <h2 className="text-2xl font-bold">
                {isSignUp ? 'Create your account' : 'Welcome back'}
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                {isSignUp
                  ? 'Sign up and get 20% off your first order.'
                  : 'Sign in to track orders and keep your cart.'}
              </p>

              {error && (
                <div className="mt-4 bg-red-50 text-red-600 text-sm p-3 rounded-lg">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                {isSignUp && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full name
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-black transition"
                      placeholder="Enter your full name"
                      required={isSignUp}
                    />
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {isSignUp ? 'Email address' : 'Email or Username'}
                  </label>
                  <input
                    type="text"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-black transition"
                    placeholder={isSignUp ? 'Enter your email' : 'Enter email or admin'}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {isSignUp ? 'Password (min. 6 characters)' : 'Password'}
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 pr-12 focus:outline-none focus:border-black transition"
                      placeholder="Enter your password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-black text-white py-3 rounded-full font-medium hover:bg-gray-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Processing...' : (isSignUp ? 'Create Account' : 'Sign In')}
                </button>
              </form>

              <p className="text-sm text-center text-gray-500 mt-6">
                {isSignUp ? 'Already have an account?' : "Don't have an account?"}
                <button
                  onClick={() => toggleTab(isSignUp ? 'signin' : 'signup')}
                  className="ml-1 text-black font-medium hover:underline"
                >
                  {isSignUp ? 'Sign in' : 'Sign Up'}
                </button>
              </p>
            </div>
          </div>

          <div className="hidden lg:block">
            <div className="bg-gray-50 rounded-2xl p-6">
              <h3 className="text-sm font-medium text-gray-500 mb-4">Featured Products</h3>
              <div className="space-y-4">
                {products.length === 0 ? (
                  <p className="text-gray-400 text-sm">Loading products...</p>
                ) : (
                  products.map((product) => (
                    <Link
                      to={`/product/${product.id}`}
                      key={product.id}
                      className="flex items-center gap-4 p-3 bg-white rounded-xl hover:shadow-md transition"
                    >
                      <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                        <img
                          src={getImageUrl(product.image)}
                          alt={product.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/60x60?text=N/A';
                          }}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium truncate">{product.name}</h4>
                        <div className="flex items-center gap-1 text-sm">
                          <span className="flex">{renderStars(product.rating)}</span>
                          <span className="text-gray-500 text-xs">{product.rating}/5</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm">${product.price}</span>
                          {product.originalPrice > 0 && (
                            <span className="text-gray-400 line-through text-xs">
                              ${product.originalPrice}
                            </span>
                          )}
                        </div>
                      </div>
                    </Link>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Auth;