import Sidebar from "../../components/admin/Sidebar";
import StatsCard from "../../components/admin/StatsCard";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AppContext } from "../../context/AppContext";

const AdminDashboard = () => {
  const { backendURL } = useContext(AppContext);
  const [stats, setStats] = useState({ users: 0, docs: 0, pending: 0, rejected: 0 ,approved:0});

  useEffect(() => {
    axios.get(`${backendURL}/api/admin/stats`, { withCredentials: true })
      .then(res => setStats(res.data||{}))
      .catch(err => console.error(err));      
  }, []);

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6 bg-gray-100 min-h-screen">
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
        <div className="grid grid-cols-4 gap-6">
          <StatsCard title="Total Users" value={stats.users} />
          <StatsCard title="Total Documents" value={stats.docs} />
          <StatsCard title="Pending Reviews" value={stats.pending} />
          <StatsCard title="Rejected Docs" value={stats.rejected} />
          <StatsCard title="Approved Docs" value={stats.approved} />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
