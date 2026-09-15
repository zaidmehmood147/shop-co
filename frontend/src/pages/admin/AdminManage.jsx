import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { User, Package, Upload, Lock, Mail, Star, Palette, UserPlus, Eye, EyeOff, Shield } from 'lucide-react';
import { API_URL } from '../../api/config';
import AdminTopbar from '../../components/admin/AdminTopbar';
import { useAdminAuth } from '../../context/AdminAuthContext';

const AdminManage = () => {
  const { onMenuClick } = useOutletContext();
  const { token } = useAdminAuth();

  const [userForm, setUserForm] = useState({
    name: '', email: '', password: '', role: 'user'
  });
  const [showPassword, setShowPassword] = useState(false);
  const [userLoading, setUserLoading] = useState(false);

  const [productForm, setProductForm] = useState({
    name: '', subCategory: 'Shirts', category: 'Casual', gender: 'Men', style: '',
    dressCode: 'Shirts', description: '', price: '', originalPrice: '', discount: '',
    rating: '4.5', color: '#000000', isTopSelling: false
  });
  const [mainImage, setMainImage] = useState(null);
  const [additionalImages, setAdditionalImages] = useState([]);
  const [productLoading, setProductLoading] = useState(false);

  const handleCreateUser = async (e) => {
    e.preventDefault();
    setUserLoading(true);
    try {
      await axios.post(`${API_URL}/users`, userForm, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('User created successfully');
      setUserForm({ name: '', email: '', password: '', role: 'user' });
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create user');
    } finally {
      setUserLoading(false);
    }
  };

 const handleCreateProduct = async (e) => {
  e.preventDefault();
  setProductLoading(true);

  try {
    const fd = new FormData();
    fd.append('name', productForm.name);
    fd.append('subCategory', productForm.subCategory);
    fd.append('category', productForm.category);
    fd.append('gender', productForm.gender);
    fd.append('style', productForm.style || '');
    fd.append('dressCode', productForm.dressCode);
    fd.append('description', productForm.description || '');
    fd.append('price', productForm.price);
    if (productForm.originalPrice) fd.append('originalPrice', productForm.originalPrice);
    if (productForm.discount) fd.append('discount', productForm.discount);
    fd.append('rating', productForm.rating || '4.5');
    fd.append('colors', productForm.color);
    fd.append('isTopSelling', productForm.isTopSelling ? 'true' : 'false');
    fd.append('isNewArrival', 'false');

    if (mainImage) fd.append('image', mainImage);
    if (additionalImages.length > 0) {
      additionalImages.forEach(img => fd.append('additionalImages', img));
    }

    console.log('Submitting product with:', Object.fromEntries(fd));

    const res = await axios.post(`${API_URL}/products`, fd, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
      }
    });

    console.log('Success:', res.data);
    toast.success('Product added successfully');

    setProductForm({
      name: '', subCategory: 'Shirts', category: 'Casual', gender: 'Men', style: '',
      dressCode: 'Shirts', description: '', price: '', originalPrice: '', discount: '',
      rating: '4.5', color: '#000000', isTopSelling: false
    });
    setMainImage(null);
    setAdditionalImages([]);
  } catch (error) {
    console.error('Add product error:', error.response?.data || error.message);
    toast.error(error.response?.data?.message || 'Failed to add product');
  } finally {
    setProductLoading(false);
  }
};

  return (
    <div>
      <AdminTopbar onReload={() => window.location.reload()} onMenuClick={onMenuClick} />
      <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
        <div className="bg-black text-white rounded-2xl p-5 sm:p-8 relative overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                <Shield size={24} className="sm:w-7 sm:h-7" />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] sm:text-xs font-semibold text-gray-400 uppercase mb-1">Administration</p>
                <h1 className="text-xl sm:text-3xl font-bold">Admin Management</h1>
                <p className="text-xs sm:text-sm text-gray-400 mt-1">Manage users and create products from one simple control panel.</p>
              </div>
            </div>
            <span className="text-[10px] sm:text-xs bg-white/10 px-3 py-1.5 rounded-full flex items-center gap-2 w-fit">
              <span className="w-2 h-2 bg-green-400 rounded-full" />
              System Ready
            </span>
          </div>
          <div className="flex flex-wrap gap-2 sm:gap-3 mt-4 sm:mt-6">
            <span className="text-[10px] sm:text-xs border border-white/20 px-3 py-1.5 rounded-full">User Management</span>
            <span className="text-[10px] sm:text-xs border border-white/20 px-3 py-1.5 rounded-full">Product Management</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
          <div className="bg-black text-white px-4 sm:px-6 py-4 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-9 h-9 sm:w-10 sm:h-10 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <UserPlus size={18} className="sm:w-5 sm:h-5" />
              </div>
              <div className="min-w-0">
                <h2 className="font-bold text-sm sm:text-base">Create New User</h2>
                <p className="text-[10px] sm:text-xs text-gray-400 truncate">Add a new account to your system.</p>
              </div>
            </div>
            <span className="text-[10px] sm:text-xs border border-white/20 px-2 sm:px-3 py-1 rounded-full flex-shrink-0">USER</span>
          </div>

          <form onSubmit={handleCreateUser} className="p-4 sm:p-6">
            <div className="bg-gray-50 rounded-xl p-3 sm:p-4 mb-4 sm:mb-6 flex items-center gap-3">
              <div className="w-9 h-9 sm:w-10 sm:h-10 bg-black rounded-lg flex items-center justify-center flex-shrink-0">
                <User size={16} className="text-white sm:w-[18px] sm:h-[18px]" />
              </div>
              <div className="min-w-0">
                <p className="font-semibold text-sm">Account Details</p>
                <p className="text-[10px] sm:text-xs text-gray-500 truncate">Enter the basic information for the new account.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] sm:text-xs font-semibold text-gray-500 uppercase mb-2">Username *</label>
                <div className="relative">
                  <User size={16} className="absolute left-3 top-3.5 text-gray-400" />
                  <input
                    type="text"
                    value={userForm.name}
                    onChange={(e) => setUserForm({ ...userForm, name: e.target.value })}
                    placeholder="Enter username"
                    className="w-full border border-gray-200 rounded-lg pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-black"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] sm:text-xs font-semibold text-gray-500 uppercase mb-2">Email Address *</label>
                <div className="relative">
                  <Mail size={16} className="absolute left-3 top-3.5 text-gray-400" />
                  <input
                    type="email"
                    value={userForm.email}
                    onChange={(e) => setUserForm({ ...userForm, email: e.target.value })}
                    placeholder="Enter email address"
                    className="w-full border border-gray-200 rounded-lg pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-black"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] sm:text-xs font-semibold text-gray-500 uppercase mb-2">Password *</label>
                <div className="relative">
                  <Lock size={16} className="absolute left-3 top-3.5 text-gray-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={userForm.password}
                    onChange={(e) => setUserForm({ ...userForm, password: e.target.value })}
                    placeholder="Enter password"
                    className="w-full border border-gray-200 rounded-lg pl-10 pr-10 py-3 text-sm focus:outline-none focus:border-black"
                    required
                    minLength={6}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3.5 text-gray-400"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                <p className="text-[10px] sm:text-xs text-gray-400 mt-1">Use at least 6 characters.</p>
              </div>

              <div>
                <label className="block text-[10px] sm:text-xs font-semibold text-gray-500 uppercase mb-2">User Role</label>
                <select
                  value={userForm.role}
                  onChange={(e) => setUserForm({ ...userForm, role: e.target.value })}
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-black"
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mt-6 pt-6 border-t border-gray-100">
              <div>
                <p className="font-semibold text-sm">Ready to create?</p>
                <p className="text-[10px] sm:text-xs text-gray-500">Check the details before creating the account.</p>
              </div>
              <button
                type="submit"
                disabled={userLoading}
                className="flex items-center justify-center gap-2 bg-black text-white px-6 py-3 rounded-lg text-sm font-medium hover:bg-gray-800 transition disabled:opacity-50 w-full sm:w-auto"
              >
                <UserPlus size={16} />
                {userLoading ? 'Creating...' : 'Create User'}
              </button>
            </div>
          </form>
        </div>

        <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
          <div className="bg-black text-white px-4 sm:px-6 py-4 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-9 h-9 sm:w-10 sm:h-10 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <Package size={18} className="sm:w-5 sm:h-5" />
              </div>
              <div className="min-w-0">
                <h2 className="font-bold text-sm sm:text-base">Add New Product</h2>
                <p className="text-[10px] sm:text-xs text-gray-400 truncate">Create a complete product listing.</p>
              </div>
            </div>
            <span className="text-[10px] sm:text-xs border border-white/20 px-2 sm:px-3 py-1 rounded-full flex-shrink-0">PRODUCT</span>
          </div>

          <form onSubmit={handleCreateProduct} className="p-4 sm:p-6 space-y-6 sm:space-y-8">
            <div className="flex items-start gap-3 sm:gap-4">
              <div className="w-9 h-9 sm:w-10 sm:h-10 bg-black rounded-lg flex items-center justify-center text-white font-bold flex-shrink-0 text-sm sm:text-base">01</div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm sm:text-base">Basic Information</p>
                <p className="text-[10px] sm:text-xs text-gray-500 mb-3 sm:mb-4">Enter the main information about your product.</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] sm:text-xs font-semibold text-gray-500 uppercase mb-2">Product Title *</label>
                    <input
                      type="text"
                      value={productForm.name}
                      onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                      placeholder="e.g. Graphic T-Shirt"
                      className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-black"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] sm:text-xs font-semibold text-gray-500 uppercase mb-2">Category *</label>
                    <select
                      value={productForm.category}
                      onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                      className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-black"
                    >
                      <option>Casual</option>
                      <option>Formal</option>
                      <option>Gym</option>
                      <option>Party</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] sm:text-xs font-semibold text-gray-500 uppercase mb-2">Dress Code *</label>
                    <select
                      value={productForm.dressCode}
                      onChange={(e) => setProductForm({ ...productForm, dressCode: e.target.value, subCategory: e.target.value })}
                      className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-black"
                    >
                      <option>Shirts</option>
                      <option>T-Shirts</option>
                      <option>Hoodie</option>
                      <option>Jeans</option>
                      <option>Shorts</option>
                      <option>Dress</option>
                      <option>Shoes</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] sm:text-xs font-semibold text-gray-500 uppercase mb-2">Gender *</label>
                    <select
                      value={productForm.gender}
                      onChange={(e) => setProductForm({ ...productForm, gender: e.target.value })}
                      className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-black"
                    >
                      <option>Men</option>
                      <option>Women</option>
                    </select>
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-[10px] sm:text-xs font-semibold text-gray-500 uppercase mb-2">Style</label>
                    <input
                      type="text"
                      value={productForm.style}
                      onChange={(e) => setProductForm({ ...productForm, style: e.target.value })}
                      placeholder="e.g. Modern Minimalist"
                      className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-black"
                    />
                    <p className="text-[10px] sm:text-xs text-gray-400 mt-1">Example: Modern, Minimalist, Oversized, Vintage.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3 sm:gap-4 pt-6 border-t border-gray-100">
              <div className="w-9 h-9 sm:w-10 sm:h-10 bg-black rounded-lg flex items-center justify-center text-white font-bold flex-shrink-0 text-sm sm:text-base">02</div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm sm:text-base">Product Images</p>
                <p className="text-[10px] sm:text-xs text-gray-500 mb-3 sm:mb-4">Upload the main image and optional additional images.</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] sm:text-xs font-semibold text-gray-500 uppercase mb-2">Main Image *</label>
                    <label className="border-2 border-dashed border-gray-200 rounded-xl p-5 sm:p-8 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-black rounded-lg flex items-center justify-center mb-3">
                        <Upload size={18} className="text-white sm:w-5 sm:h-5" />
                      </div>
                      <p className="font-semibold text-xs sm:text-sm text-center truncate w-full px-2">{mainImage ? mainImage.name : 'Choose main image'}</p>
                      <p className="text-[10px] sm:text-xs text-gray-400 mt-1">PNG, JPG, WEBP</p>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setMainImage(e.target.files[0])}
                        className="hidden"
                      />
                    </label>
                  </div>
                  <div>
                    <label className="block text-[10px] sm:text-xs font-semibold text-gray-500 uppercase mb-2">Additional Images</label>
                    <label className="border-2 border-dashed border-gray-200 rounded-xl p-5 sm:p-8 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-black rounded-lg flex items-center justify-center mb-3">
                        <Upload size={18} className="text-white sm:w-5 sm:h-5" />
                      </div>
                      <p className="font-semibold text-xs sm:text-sm text-center truncate w-full px-2">
                        {additionalImages.length > 0 ? `${additionalImages.length} images selected` : 'Choose additional images'}
                      </p>
                      <p className="text-[10px] sm:text-xs text-gray-400 mt-1">PNG, JPG, WEBP</p>
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={(e) => setAdditionalImages(Array.from(e.target.files))}
                        className="hidden"
                      />
                    </label>
                    <p className="text-[10px] sm:text-xs text-gray-400 mt-1">You can select multiple images at once.</p>
                  </div>
                </div>

                <div className="mt-4">
                  <label className="block text-[10px] sm:text-xs font-semibold text-gray-500 uppercase mb-2">Description</label>
                  <textarea
                    value={productForm.description}
                    onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                    placeholder="Write a detailed product description..."
                    rows={4}
                    className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-black"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3 sm:gap-4 pt-6 border-t border-gray-100">
              <div className="w-9 h-9 sm:w-10 sm:h-10 bg-black rounded-lg flex items-center justify-center text-white font-bold flex-shrink-0 text-sm sm:text-base">03</div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm sm:text-base">Pricing & Rating</p>
                <p className="text-[10px] sm:text-xs text-gray-500 mb-3 sm:mb-4">Set the price, discount and customer rating.</p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
                  <div>
                    <label className="block text-[10px] sm:text-xs font-semibold text-gray-500 uppercase mb-2">Price ($) *</label>
                    <input
                      type="number"
                      value={productForm.price}
                      onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
                      placeholder="0.00"
                      className="w-full border border-gray-200 rounded-lg px-3 sm:px-4 py-3 text-sm focus:outline-none focus:border-black"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] sm:text-xs font-semibold text-gray-500 uppercase mb-2">Original Price</label>
                    <input
                      type="number"
                      value={productForm.originalPrice}
                      onChange={(e) => setProductForm({ ...productForm, originalPrice: e.target.value })}
                      placeholder="0.00"
                      className="w-full border border-gray-200 rounded-lg px-3 sm:px-4 py-3 text-sm focus:outline-none focus:border-black"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] sm:text-xs font-semibold text-gray-500 uppercase mb-2">Discount (%)</label>
                    <input
                      type="number"
                      value={productForm.discount}
                      onChange={(e) => setProductForm({ ...productForm, discount: e.target.value })}
                      placeholder="0"
                      className="w-full border border-gray-200 rounded-lg px-3 sm:px-4 py-3 text-sm focus:outline-none focus:border-black"
                    />
                    <p className="text-[10px] sm:text-xs text-gray-400 mt-1">0 - 100</p>
                  </div>
                  <div>
                    <label className="block text-[10px] sm:text-xs font-semibold text-gray-500 uppercase mb-2">Rating</label>
                    <div className="relative">
                      <Star size={16} className="absolute left-3 top-3.5 text-gray-400" />
                      <input
                        type="number"
                        step="0.1"
                        value={productForm.rating}
                        onChange={(e) => setProductForm({ ...productForm, rating: e.target.value })}
                        className="w-full border border-gray-200 rounded-lg pl-10 pr-3 sm:pr-4 py-3 text-sm focus:outline-none focus:border-black"
                      />
                    </div>
                    <p className="text-[10px] sm:text-xs text-gray-400 mt-1">0 - 5</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3 sm:gap-4 pt-6 border-t border-gray-100">
              <div className="w-9 h-9 sm:w-10 sm:h-10 bg-black rounded-lg flex items-center justify-center text-white font-bold flex-shrink-0 text-sm sm:text-base">04</div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm sm:text-base">Product Options</p>
                <p className="text-[10px] sm:text-xs text-gray-500 mb-3 sm:mb-4">Configure the product color and visibility.</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="border border-gray-200 rounded-xl p-4 flex items-center gap-3 sm:gap-4">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-lg border border-gray-200 flex-shrink-0" style={{ backgroundColor: productForm.color }} />
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm flex items-center gap-2">
                        <Palette size={14} />
                        Product Color
                      </p>
                      <p className="text-[10px] sm:text-xs text-gray-500">{productForm.color}</p>
                      <input
                        type="color"
                        value={productForm.color}
                        onChange={(e) => setProductForm({ ...productForm, color: e.target.value })}
                        className="mt-2 w-full h-6 cursor-pointer"
                      />
                    </div>
                  </div>

                  <div className="border border-gray-200 rounded-xl p-4 flex items-center gap-3 sm:gap-4">
                    <div className="w-11 h-11 sm:w-12 sm:h-12 bg-black rounded-lg flex items-center justify-center flex-shrink-0">
                      <Star size={18} className="text-white sm:w-5 sm:h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm">Top Selling Product</p>
                      <p className="text-[10px] sm:text-xs text-gray-500">Mark this product as a popular item.</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setProductForm({ ...productForm, isTopSelling: !productForm.isTopSelling })}
                      className={`w-12 h-6 rounded-full transition relative flex-shrink-0 ${
                        productForm.isTopSelling ? 'bg-black' : 'bg-gray-200'
                      }`}
                    >
                      <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition ${
                        productForm.isTopSelling ? 'left-6' : 'left-0.5'
                      }`} />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-6 border-t border-gray-100">
              <div>
                <p className="font-semibold text-sm">Product Listing</p>
                <p className="text-[10px] sm:text-xs text-gray-500">Review all information before adding the product.</p>
              </div>
              <button
                type="submit"
                disabled={productLoading}
                className="flex items-center justify-center gap-2 bg-black text-white px-6 py-3 rounded-lg text-sm font-medium hover:bg-gray-800 transition disabled:opacity-50 w-full sm:w-auto"
              >
                <Package size={16} />
                {productLoading ? 'Adding...' : 'Add Product'}
              </button>
            </div>
          </form>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-[10px] sm:text-xs text-gray-500 px-2 pb-4">
          <p>Admin Control Panel - Manage your store from one place.</p>
          <p className="flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full" />
            System Ready
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminManage;