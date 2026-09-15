import React from 'react';
import { Search, RefreshCw, Menu } from 'lucide-react';

const AdminTopbar = ({ onReload, onMenuClick }) => {
  return (
    <div className="bg-white border-b border-gray-100 px-4 sm:px-6 py-4 flex items-center justify-between gap-3">
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition flex-shrink-0"
        >
          <Menu size={20} />
        </button>

        <div className="hidden sm:flex items-center gap-3 bg-gray-50 rounded-lg px-4 py-2 flex-1 max-w-md">
          <Search size={18} className="text-gray-400 flex-shrink-0" />
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent outline-none w-full text-sm"
          />
        </div>

        <button className="sm:hidden p-2 hover:bg-gray-100 rounded-lg transition flex-shrink-0">
          <Search size={20} />
        </button>
      </div>

      <button
        onClick={onReload}
        className="flex items-center gap-2 text-sm font-medium border border-gray-200 px-3 sm:px-4 py-2 rounded-lg hover:bg-gray-50 transition flex-shrink-0"
      >
        <RefreshCw size={16} />
        <span className="hidden sm:inline">Reload</span>
      </button>
    </div>
  );
};

export default AdminTopbar;