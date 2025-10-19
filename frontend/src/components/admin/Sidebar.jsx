import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-64 h-screen bg-gray-800 text-white p-4">
      <h2 className="text-2xl font-bold mb-6">Admin Dashboard</h2>
      <nav className="flex flex-col gap-4">
        <NavLink to="/admin" className={({isActive}) => isActive ? "bg-cyan-600 p-2 rounded" : "p-2 rounded hover:bg-cyan-500"}>Dashboard</NavLink>
        <NavLink to="/admin/users" className={({isActive}) => isActive ? "bg-cyan-600 p-2 rounded" : "p-2 rounded hover:bg-cyan-500"}>Users</NavLink>
        <NavLink to="/admin/documents" className={({isActive}) => isActive ? "bg-cyan-600 p-2 rounded" : "p-2 rounded hover:bg-cyan-500"}>Documents</NavLink>
     
      </nav>
    </div>
  );
};

export default Sidebar;
