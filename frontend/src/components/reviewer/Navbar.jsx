import React from "react";

const Navbar = ({ userName, role, onLogout }) => {
  return (
    <div className="flex justify-between items-center bg-white shadow p-4">
      <h1 className="text-xl font-semibold">
        Welcome, {userName} ({role}) 👋
      </h1>
      <button
        onClick={onLogout}
        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;
