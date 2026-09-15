import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import axios from 'axios';
import { Users, Package, Star, Layers, Crown, TrendingUp } from 'lucide-react';
import { API_URL } from '../../api/config';
import AdminTopbar from '../../components/admin/AdminTopbar';
import { useAdminAuth } from '../../context/AdminAuthContext';

const AdminDashboard = () => {
  const { onMenuClick } = useOutletContext();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { token } = useAdminAuth();

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_URL}/admin/stats`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setData(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  if (loading) return <div className="p-4 sm:p-8">Loading dashboard...</div>;
  if (!data) return <div className="p-4 sm:p-8">No data</div>;

  const { stats, categoryCounts, recentUsers, topSellingProducts } = data;
  const maxCategory = Math.max(...categoryCounts.map(c => c.count), 1);

  const StatCard = ({ title, value, icon: Icon, subtitle }) => (
    <div className="bg-black text-white rounded-2xl p-4 sm:p-6 relative overflow-hidden">
      <div className="absolute top-4 right-4 bg-white/10 backdrop-blur px-2 sm:px-3 py-1 rounded-full flex items-center gap-1">
        <TrendingUp size={12} />
        <span className="text-[10px] sm:text-xs">Active</span>
      </div>
      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/10 rounded-xl flex items-center justify-center mb-4 sm:mb-6">
        <Icon size={20} className="sm:w-6 sm:h-6" />
      </div>
      <p className="text-2xl sm:text-3xl font-bold mb-1">{value}</p>
      <p className="text-xs sm:text-sm text-gray-300">{title}</p>
      <p className="text-[10px] text-gray-500 mt-1 hidden sm:block">{subtitle}</p>
    </div>
  );

  return (
    <div>
      <AdminTopbar onReload={fetchData} onMenuClick={onMenuClick} />
      <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center flex-shrink-0">
              <Crown size={20} className="text-white" />
            </div>
            <div className="min-w-0">
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold">Dashboard Overview</h1>
            </div>
          </div>
          <p className="text-gray-500 text-xs sm:text-sm mt-2">Welcome back, commander. Here is what is happening in your store today.</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <StatCard title="Total Users" value={stats.totalUsers} icon={Users} subtitle="Registered users" />
          <StatCard title="Total Products" value={stats.totalProducts} icon={Package} subtitle="Active items" />
          <StatCard title="Top Selling" value={stats.totalTopSelling} icon={Star} subtitle="Featured items" />
          <StatCard title="Categories" value={stats.totalCategories} icon={Layers} subtitle="Classifications" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          <div className="lg:col-span-2 space-y-4 sm:space-y-6">
            <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm">
              <p className="text-xs font-semibold text-gray-400 uppercase mb-1">Analytics Metric</p>
              <h2 className="text-lg sm:text-2xl font-bold">Store Metrics & Growth</h2>
              <p className="text-xs sm:text-sm text-gray-500 mb-4 sm:mb-6">Ratio between active users and stock.</p>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2 text-sm">
                    <span className="font-medium">Total Registered Users</span>
                    <span className="font-bold">{stats.totalUsers}</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-black" style={{ width: `${Math.min(stats.totalUsers * 10, 100)}%` }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2 text-sm">
                    <span className="font-medium">Total Store Products</span>
                    <span className="font-bold">{stats.totalProducts}</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-gray-700" style={{ width: `${Math.min(stats.totalProducts * 2, 100)}%` }} />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <p className="text-xs font-semibold text-gray-400 uppercase">Category Volume</p>
                <p className="text-xs font-semibold text-gray-400 uppercase hidden sm:block">Distribution</p>
              </div>
              <div className="flex items-end justify-around h-32 sm:h-48 gap-2 sm:gap-4">
                {categoryCounts.map((cat, i) => (
                  <div key={i} className="flex flex-col items-center gap-1 sm:gap-2 flex-1">
                    <div
                      className="w-full bg-black rounded-t-lg transition-all"
                      style={{ height: `${(cat.count / maxCategory) * 100}%`, minHeight: '20px' }}
                    />
                    <span className="text-[10px] sm:text-xs text-gray-600 truncate w-full text-center">{cat._id}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm">
              <h2 className="text-lg sm:text-xl font-bold">Products by Category</h2>
              <p className="text-xs sm:text-sm text-gray-500 mb-4">Breakdown across categories</p>
              <div className="space-y-3 sm:space-y-4">
                {categoryCounts.map((cat, i) => (
                  <div key={i}>
                    <div className="flex justify-between mb-1 text-sm">
                      <span>{cat._id}</span>
                      <span className="text-xs bg-gray-100 px-2 py-0.5 rounded-full">{cat.count} products</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-black" style={{ width: `${(cat.count / maxCategory) * 100}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-4 sm:space-y-6">
            <div className="bg-black text-white rounded-2xl p-4 sm:p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-base sm:text-lg font-bold">Top Selling</h2>
                  <p className="text-xs text-gray-400">Best performers</p>
                </div>
                <Star size={18} />
              </div>
              <div className="space-y-2 sm:space-y-3">
                {topSellingProducts.map((p, i) => (
                  <div key={p._id} className="bg-white text-black rounded-xl p-2 sm:p-3 flex items-center gap-2 sm:gap-3">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-black text-white rounded-full flex items-center justify-center font-bold text-xs sm:text-sm flex-shrink-0">
                      {i + 1}
                    </div>
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                      <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-xs sm:text-sm truncate">{p.name}</p>
                      <div className="flex items-center gap-1 text-[10px] sm:text-xs text-gray-500">
                        <Star size={10} className="fill-yellow-400 text-yellow-400" />
                        {p.rating}
                      </div>
                    </div>
                    <p className="font-bold text-xs sm:text-sm">${p.price}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-base sm:text-lg font-bold">Recent Users</h2>
                  <p className="text-xs text-gray-500">Latest accounts</p>
                </div>
                <Users size={18} className="text-gray-400" />
              </div>
              <div className="space-y-2">
                {recentUsers.map((u) => (
                  <div key={u._id} className="flex items-center gap-2 sm:gap-3 p-2 hover:bg-gray-50 rounded-lg">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-black text-white rounded-full flex items-center justify-center font-bold text-xs sm:text-sm flex-shrink-0">
                      {u.name?.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-xs sm:text-sm truncate">{u.name}</p>
                      <p className="text-[10px] sm:text-xs text-gray-500 truncate">{u.email}</p>
                    </div>
                    <span className="text-[10px] sm:text-xs bg-black text-white px-2 py-1 rounded-full flex items-center gap-1 flex-shrink-0">
                      <span className="w-1.5 h-1.5 bg-green-400 rounded-full" />
                      Active
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;