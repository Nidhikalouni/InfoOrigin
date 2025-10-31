import React from 'react';
import { Home, FileClock, CheckCircle, User } from 'lucide-react';

const Sidebar = ({ setActive }) => {
  return (
    <div className="bg-gray-900 text-white h-screen w-64 flex flex-col p-4 space-y-4">
      <h2 className="text-2xl font-bold text-center mb-6">Reviewer Panel</h2>

      <button onClick={() => setActive('dashboard')} className="flex items-center space-x-3 p-2 hover:bg-gray-700 rounded">
        <Home size={20} /> <span>Dashboard</span>
      </button>

      <button onClick={() => setActive('pending')} className="flex items-center space-x-3 p-2 hover:bg-gray-700 rounded">
        <FileClock size={20} /> <span>Pending Docs</span>
      </button>

      <button onClick={() => setActive('reviewed')} className="flex items-center space-x-3 p-2 hover:bg-gray-700 rounded">
        <CheckCircle size={20} /> <span>Reviewed Docs</span>
      </button>

      <button onClick={() => setActive('profile')} className="flex items-center space-x-3 p-2 hover:bg-gray-700 rounded mt-auto">
        <User size={20} /> <span>Profile</span>
      </button>
    </div>
  );
};

export default Sidebar;
