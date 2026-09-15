import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Package, Users, Settings, LogOut, Home, ExternalLink, X } from 'lucide-react';
import { useAdminAuth } from '../../context/AdminAuthContext';

const AdminSidebar = ({ isOpen, onClose }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout, admin } = useAdminAuth();

  const menuItems = [
    { path: '/admin', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/admin/products', label: 'All Products', icon: Package },
    { path: '/admin/users', label: 'All Users', icon: Users },
    { path: '/admin/manage', label: 'Manage', icon: Settings },
  ];

  const handleLogout = () => {
    logout();
    navigate('/admin/auth');
  };

  const handleLinkClick = () => {
    if (window.innerWidth < 1024) onClose();
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed lg:sticky top-0 left-0 z-50 h-screen w-64 bg-white border-r border-gray-200 flex flex-col transform transition-transform duration-300 lg:transform-none ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center">
              <Package size={20} className="text-white" />
            </div>
            <div>
              <h1 className="font-bold text-sm">Admin Panel</h1>
              <p className="text-xs text-gray-500">Store Management</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="lg:hidden text-gray-400 hover:text-black"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 p-4 overflow-y-auto">
          <p className="text-xs font-semibold text-gray-400 uppercase mb-3 px-3">Overview</p>
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={handleLinkClick}
                className={`flex items-center gap-3 px-3 py-3 rounded-lg mb-1 transition ${
                  isActive ? 'bg-black text-white' : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Icon size={18} />
                <span className="font-medium text-sm">{item.label}</span>
              </Link>
            );
          })}

          <p className="text-xs font-semibold text-gray-400 uppercase mt-6 mb-3 px-3">Store</p>
          <Link
            to="/"
            onClick={handleLinkClick}
            className="flex items-center gap-3 px-3 py-3 rounded-lg mb-1 text-gray-600 hover:bg-gray-50 transition"
          >
            <Home size={18} />
            <span className="font-medium text-sm">Home</span>
          </Link>
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-3 py-3 rounded-lg mb-1 text-gray-600 hover:bg-gray-50 transition"
          >
            <ExternalLink size={18} />
            <span className="font-medium text-sm">View Site</span>
          </a>
        </nav>

        <div className="p-4 border-t border-gray-100 bg-white">
          <div className="flex items-center gap-3 p-2">
            <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
              {admin?.name?.charAt(0)?.toUpperCase() || 'A'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold truncate">{admin?.name || 'Administrator'}</p>
              <p className="text-xs text-gray-500 truncate">{admin?.email || 'admin'}</p>
            </div>
            <button
              onClick={handleLogout}
              className="text-gray-400 hover:text-red-500 transition flex-shrink-0"
              title="Logout"
            >
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;