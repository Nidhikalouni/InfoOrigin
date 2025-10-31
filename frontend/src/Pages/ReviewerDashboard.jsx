import React, { useState, useEffect, useContext } from 'react';
import Sidebar from '../components/reviewer/Sidebar';
import Navbar from '../components/reviewer/Navbar';
import StatsCard from '../components/reviewer/StatsCard';
import ReviewedDocs from '../components/reviewer/ReviewedDocs';
import ReviewerPage from '../components/reviewer/ReviewerPage';
import axios from 'axios';
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';

const ReviewerDashboard = () => {
  const [active, setActive] = useState('dashboard');
  const { backendURL } = useContext(AppContext);
  const [stats, setStats] = useState(null);
  const [reviewedDocs, setReviewedDocs] = useState([]);
  const [reviewer, setReviewer] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch reviewer dashboard data
  const fetchDashboardData = async () => {
    try {
      const [statsRes, docsRes, profileRes] = await Promise.all([
        axios.get(`${backendURL}/api/reviewer/reviewer-stats`, { withCredentials: true }),
        axios.get(`${backendURL}/api/reviewer/reviewed-docs`, { withCredentials: true }),
        axios.get(`${backendURL}/api/reviewer/reviewer-profile`, { withCredentials: true }),
      ]);

      if (statsRes.data.success) setStats(statsRes.data.data);
      if (docsRes.data.success) setReviewedDocs(docsRes.data.data);
      if (profileRes.data.success) setReviewer(profileRes.data.data);
    } catch (error) {
      toast.error("Failed to fetch reviewer data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, [backendURL]);

  // ✅ Logout Handler
  const handleLogout = async () => {
    try {
      const res = await axios.post(`${backendURL}/api/auth/logout`, {}, { withCredentials: true });
      if (res.data.success) {
        toast.success("Logged out successfully!");
        window.location.href = '/'; // redirect to homepage/login
      } else {
        toast.error(res.data.message || "Logout failed");
      }
    } catch (error) {
      toast.error("Something went wrong during logout");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-lg text-gray-600">
        Loading reviewer dashboard...
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar setActive={setActive} />
      <div className="flex-1 flex flex-col">
        
        <Navbar userName={reviewer?.name || "Reviewer"} role={reviewer?.role || "Reviewer"} onLogout={handleLogout} />


        <div className="p-6 overflow-auto flex-1">
          {/* Dashboard Stats */}
          {active === 'dashboard' && stats && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatsCard title="Total Reviewed" value={stats.totalReviewed} />
              <StatsCard title="Pending" value={stats.pending} />
              <StatsCard title="Approved" value={stats.approved} />
              <StatsCard title="Rejected" value={stats.rejected} />
            </div>
          )}

          {/* Pending Docs */}
          {active === 'pending' && <ReviewerPage />}

          {/* Reviewed Docs */}
          {active === 'reviewed' && <ReviewedDocs reviewedDocs={reviewedDocs} />}

          {/* Reviewer Profile */}
          {active === 'profile' && reviewer && (
            <div className="p-4 bg-white rounded shadow-md max-w-md">
              <h2 className="text-xl font-semibold mb-3 text-cyan-700">Reviewer Profile</h2>
              <p><strong>Name:</strong> {reviewer.name}</p>
              <p><strong>Email:</strong> {reviewer.email}</p>
              <p><strong>Role:</strong> {reviewer.role}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReviewerDashboard;

