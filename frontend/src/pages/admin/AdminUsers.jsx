import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import axios from 'axios';
import { Users, Search, Trash2, Plus } from 'lucide-react';
import toast from 'react-hot-toast';
import { API_URL } from '../../api/config';
import AdminTopbar from '../../components/admin/AdminTopbar';
import { useAdminAuth } from '../../context/AdminAuthContext';

const AdminUsers = () => {
  const { onMenuClick } = useOutletContext();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const { token } = useAdminAuth();

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_URL}/users`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUsers(res.data.users);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchUsers(); }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this user?')) return;
    try {
      await axios.delete(`${API_URL}/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('User deleted');
      fetchUsers();
    } catch (error) {
      toast.error('Failed to delete');
    }
  };

  const filtered = users.filter(u =>
    u.name?.toLowerCase().includes(search.toLowerCase()) ||
    u.email?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <AdminTopbar onReload={fetchUsers} onMenuClick={onMenuClick} />
      <div className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-black rounded-xl flex items-center justify-center flex-shrink-0">
              <Users size={20} className="text-white sm:w-6 sm:h-6" />
            </div>
            <div className="min-w-0">
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold">All Users</h1>
              <p className="text-xs sm:text-sm text-gray-500">Manage registered users.</p>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="flex items-center bg-white border border-gray-200 rounded-lg px-3 py-2 flex-1 sm:w-72 sm:flex-none">
              <Search size={16} className="text-gray-400 flex-shrink-0" />
              <input
                type="text"
                placeholder="Search users..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-transparent outline-none ml-2 w-full text-sm"
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          {loading ? (
            <p className="p-8 text-center text-gray-500">Loading...</p>
          ) : (
            <>
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full min-w-[700px]">
                  <thead className="bg-gray-50 border-b border-gray-100">
                    <tr>
                      <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Customer</th>
                      <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Email</th>
                      <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Status</th>
                      <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((u) => {
                      const isAdmin = u.role === 'admin';
                      return (
                        <tr key={u._id} className={`border-b border-gray-100 ${isAdmin ? 'bg-gray-900 text-white' : 'hover:bg-gray-50'}`}>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${isAdmin ? 'bg-pink-500 text-white' : 'bg-gray-100 text-black'}`}>
                                {u.name?.charAt(0).toUpperCase()}
                              </div>
                              <p className="font-semibold text-sm">{u.name}</p>
                            </div>
                          </td>
                          <td className={`px-6 py-4 text-sm ${isAdmin ? 'text-gray-300' : 'text-gray-600'}`}>{u.email}</td>
                          <td className="px-6 py-4">
                            <span className={`text-xs px-3 py-1 rounded-full flex items-center gap-1 w-fit ${isAdmin ? 'bg-pink-100 text-pink-700' : 'bg-gray-100 text-black'}`}>
                              <span className={`w-1.5 h-1.5 rounded-full ${isAdmin ? 'bg-pink-500' : 'bg-green-400'}`} />
                              {isAdmin ? 'Administrator' : 'Active'}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <button
                              onClick={() => handleDelete(u._id)}
                              className={`p-2 rounded-lg transition ${isAdmin ? 'hover:bg-gray-800 text-gray-300' : 'hover:bg-red-50 text-gray-400 hover:text-red-500'}`}
                            >
                              <Trash2 size={16} />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              <div className="md:hidden divide-y divide-gray-100">
                {filtered.map((u) => {
                  const isAdmin = u.role === 'admin';
                  return (
                    <div key={u._id} className={`p-4 ${isAdmin ? 'bg-gray-900 text-white' : ''}`}>
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold flex-shrink-0 ${isAdmin ? 'bg-pink-500 text-white' : 'bg-gray-100 text-black'}`}>
                          {u.name?.charAt(0).toUpperCase()}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-sm truncate">{u.name}</p>
                          <p className={`text-xs truncate ${isAdmin ? 'text-gray-400' : 'text-gray-500'}`}>{u.email}</p>
                          <span className={`text-[10px] px-2 py-0.5 rounded-full inline-flex items-center gap-1 mt-1 ${isAdmin ? 'bg-pink-100 text-pink-700' : 'bg-gray-100 text-black'}`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${isAdmin ? 'bg-pink-500' : 'bg-green-400'}`} />
                            {isAdmin ? 'Administrator' : 'Active'}
                          </span>
                        </div>
                        <button
                          onClick={() => handleDelete(u._id)}
                          className={`p-2 rounded-lg transition flex-shrink-0 ${isAdmin ? 'hover:bg-gray-800 text-gray-300' : 'text-gray-400 hover:text-red-500'}`}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>

        <p className="mt-4 text-sm text-gray-500">Showing {filtered.length} users</p>
      </div>
    </div>
  );
};

export default AdminUsers;