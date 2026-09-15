import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import axios from 'axios';
import { Package, Search, Trash2, Star, Plus } from 'lucide-react';
import toast from 'react-hot-toast';
import { API_URL } from '../../api/config';
import AdminTopbar from '../../components/admin/AdminTopbar';
import { useAdminAuth } from '../../context/AdminAuthContext';

const AdminProducts = () => {
  const { onMenuClick } = useOutletContext();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const { token } = useAdminAuth();

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_URL}/products`);
      setProducts(res.data.products);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchProducts(); }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this product?')) return;
    try {
      await axios.delete(`${API_URL}/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('Product deleted');
      fetchProducts();
    } catch (error) {
      toast.error('Failed to delete');
    }
  };

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <AdminTopbar onReload={fetchProducts} onMenuClick={onMenuClick} />
      <div className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-black rounded-xl flex items-center justify-center flex-shrink-0">
              <Package size={20} className="text-white sm:w-6 sm:h-6" />
            </div>
            <div className="min-w-0">
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold">All Products</h1>
              <p className="text-xs sm:text-sm text-gray-500">Manage your store inventory.</p>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="flex items-center bg-white border border-gray-200 rounded-lg px-3 py-2 flex-1 sm:w-72 sm:flex-none">
              <Search size={16} className="text-gray-400 flex-shrink-0" />
              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-transparent outline-none ml-2 w-full text-sm"
              />
            </div>
            <a
              href="/admin/manage"
              className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition flex-shrink-0"
            >
              <Plus size={16} />
              <span className="hidden sm:inline">Add Product</span>
            </a>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          {loading ? (
            <p className="p-8 text-center text-gray-500">Loading...</p>
          ) : filtered.length === 0 ? (
            <p className="p-8 text-center text-gray-500">No products found</p>
          ) : (
            <>
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full min-w-[800px]">
                  <thead className="bg-gray-50 border-b border-gray-100">
                    <tr>
                      <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Product</th>
                      <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Category</th>
                      <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Gender</th>
                      <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Price</th>
                      <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Rating</th>
                      <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Status</th>
                      <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((p) => (
                      <tr key={p._id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                              <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                            </div>
                            <div>
                              <p className="font-semibold text-sm">{p.name}</p>
                              <p className="text-xs text-gray-500">{p.subCategory}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm">{p.category}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{p.gender}</td>
                        <td className="px-6 py-4">
                          <p className="font-bold text-sm">${p.price}</p>
                          {p.originalPrice > 0 && (
                            <p className="text-xs text-gray-400 line-through">${p.originalPrice}</p>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-1 text-sm">
                            <Star size={14} className="fill-yellow-400 text-yellow-400" />
                            {p.rating}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-xs bg-gray-100 px-3 py-1 rounded-full flex items-center gap-1 w-fit">
                            <span className="w-1.5 h-1.5 bg-green-400 rounded-full" />
                            {p.isTopSelling ? 'Top Selling' : 'Regular'}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => handleDelete(p._id)}
                            className="flex items-center gap-1 text-xs text-gray-600 hover:text-red-500 border border-gray-200 rounded-lg px-3 py-1.5 transition"
                          >
                            <Trash2 size={14} />
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="md:hidden divide-y divide-gray-100">
                {filtered.map((p) => (
                  <div key={p._id} className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                        <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-sm truncate">{p.name}</p>
                        <p className="text-xs text-gray-500">{p.subCategory} • {p.category}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="font-bold text-sm">${p.price}</span>
                          <span className="text-xs bg-gray-100 px-2 py-0.5 rounded-full flex items-center gap-1">
                            <Star size={10} className="fill-yellow-400 text-yellow-400" />
                            {p.rating}
                          </span>
                        </div>
                        <button
                          onClick={() => handleDelete(p._id)}
                          className="flex items-center gap-1 text-xs text-red-500 border border-red-200 rounded-lg px-3 py-1.5 mt-2 transition"
                        >
                          <Trash2 size={12} />
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        <p className="mt-4 text-sm text-gray-500">Showing {filtered.length} products</p>
      </div>
    </div>
  );
};

export default AdminProducts;