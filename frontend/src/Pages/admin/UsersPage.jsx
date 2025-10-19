import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import Sidebar from "../../components/admin/Sidebar";
import { AppContext } from "../../context/AppContext"

const UserPage = () => {
  const { backendURL } = useContext(AppContext);
  const [users, setUsers] = useState([]);

  const fetchUsers = () => {
    axios
      .get(`${backendURL}/api/admin/users`, { withCredentials: true })
      // .then((res) => setUsers(res.data.users||[]))
      .then((res) => setUsers(res.data.users || res.data.data?.users || []))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6 bg-gray-100 min-h-screen">
        <h1 className="text-3xl font-bold mb-6">Users</h1>

        <table className="min-w-full bg-white border rounded-lg shadow">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="py-3 px-4">Name</th>
              <th className="py-3 px-4">Email</th>
              
              <th className="py-3 px-4">Joined</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="border-b hover:bg-gray-50">
                <td className="py-2 px-4">{user.name}</td>
                <td className="py-2 px-4">{user.email}</td>
                
                <td className="py-2 px-4">
                  {user.createdAt
                    ? new Date(user.createdAt).toLocaleString()
                    : "N/A"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserPage;
