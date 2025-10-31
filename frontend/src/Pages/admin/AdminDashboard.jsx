// import Sidebar from "../../components/admin/Sidebar";
// import StatsCard from "../../components/admin/StatsCard";
// import { useEffect, useState, useContext } from "react";
// import axios from "axios";
// import { AppContext } from "../../context/AppContext";

// const AdminDashboard = () => {
//   const { backendURL } = useContext(AppContext);
//   const [stats, setStats] = useState({ users: 0, docs: 0, pending: 0, rejected: 0 ,approved:0});

//   useEffect(() => {
//     axios.get(`${backendURL}/api/admin/stats`, { withCredentials: true })
//       .then(res => setStats(res.data||{}))
//       .catch(err => console.error(err));   
   
//   }, []);

//   return (
//     <div className="flex">
//       <Sidebar />
//       <div className="flex-1 p-6 bg-gray-100 min-h-screen">
//         <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
//         <div className="grid grid-cols-4 gap-6">
//           <StatsCard title="Total Users" value={stats.users} />
//           <StatsCard title="Total Documents" value={stats.docs} />
//           <StatsCard title="Pending Reviews" value={stats.pending} />
//           <StatsCard title="Rejected Docs" value={stats.rejected} />
//           <StatsCard title="Approved Docs" value={stats.approved} />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;

import Sidebar from "../../components/admin/Sidebar";
import StatsCard from "../../components/admin/StatsCard";
import Navbar from "../../components/reviewer/Navbar"; 
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const AdminDashboard = () => {
  const { backendURL } = useContext(AppContext);
  const [stats, setStats] = useState({ users: 0, docs: 0, pending: 0, rejected: 0, approved: 0 });
  const [adminName, setAdminName] = useState("");

  // Fetch dashboard stats
  useEffect(() => {
    axios
      .get(`${backendURL}/api/admin/stats`, { withCredentials: true })
      .then((res) => setStats(res.data || {}))
      .catch((err) => console.error(err));
  }, [backendURL]);

  // Fetch admin info
  useEffect(() => {
    axios
      .get(`${backendURL}/api/auth/check-auth`, { withCredentials: true })
      .then((res) => {
        if (res.data.success && res.data.role === "admin") {
          setAdminName(res.data.user.name);
        } else {
          toast.error("Unauthorized access!");
          window.location.href = "/";
        }
      })
      .catch(() => toast.error("Failed to fetch admin data"));
  }, [backendURL]);

  // Logout handler
  const handleLogout = async () => {
    try {
      const res = await axios.post(`${backendURL}/api/auth/logout`, {}, { withCredentials: true });
      if (res.data.success) {
        toast.success("Logged out successfully!");
        window.location.href = "/";
      }
    } catch (error) {
      toast.error("Logout failed!");
    }
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content area */}
      <div className="flex-1 flex flex-col bg-gray-100 min-h-screen">
        {/* Navbar at the top */}
        <Navbar userName={adminName} role="Admin" onLogout={handleLogout} />

        {/* Dashboard content */}
        <div className="p-6">
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
    </div>
  );
};

export default AdminDashboard;
