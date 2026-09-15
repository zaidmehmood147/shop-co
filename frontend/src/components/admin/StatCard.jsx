import React from 'react';
import { TrendingUp } from 'lucide-react';

const StatCard = ({ title, value, icon: Icon, subtitle = 'Active' }) => {
  return (
    <div className="bg-black text-white rounded-2xl p-6 relative overflow-hidden">
      <div className="absolute top-4 right-4 bg-white/10 backdrop-blur px-3 py-1 rounded-full flex items-center gap-1">
        <TrendingUp size={12} />
        <span className="text-xs">{subtitle}</span>
      </div>
      <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-6">
        <Icon size={24} />
      </div>
      <p className="text-3xl font-bold mb-1">{value}</p>
      <p className="text-sm text-gray-300">{title}</p>
    </div>
  );
};

export default StatCard;