import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import Sidebar from "../../components/admin/Sidebar"
import { AppContext } from "../../context/AppContext"
import { useNavigate } from "react-router-dom";

const DocumentPage = () => {
  const { backendURL } = useContext(AppContext);
  const [docs, setDocs] = useState([]);
  const navigate = useNavigate();

  // Fetch all documents
  const fetchDocs = () => {
    axios
      .get(`${backendURL}/api/admin/documents`, { withCredentials: true })
      .then((res) => setDocs(res.data.docs||[]))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchDocs();
  }, []);

  
  const handleView = (id) => {
    navigate(`/admin/documents/${id}`);
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6 bg-gray-100 min-h-screen">
        <h1 className="text-3xl font-bold mb-6">All Documents</h1>

        <table className="min-w-full bg-white border rounded-lg shadow">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="py-3 px-4">Title</th>
              <th className="py-3 px-4">Owner</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Created</th>
              <th className="py-3 px-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {docs.map((doc) => (
              <tr key={doc._id} className="border-b hover:bg-gray-50">
                <td className="py-2 px-4">{doc.title}</td>
                <td className="py-2 px-4">{doc.ownerId?.name || "Unknown"}</td>
                <td
                  className={`py-2 px-4 font-semibold ${
                    doc.status === "Approved"
                      ? "text-green-600"
                      : doc.status === "Rejected"
                      ? "text-red-600"
                      : "text-yellow-600"
                  }`}
                >
                  {doc.status}
                </td>
                <td className="py-2 px-4">
                  {doc.createdAt
                    ? new Date(doc.createdAt).toLocaleDateString()
                    : "N/A"}
                </td>
                <td className="py-2 px-4">
                  <button
                    onClick={() => handleView(doc._id)}
                    className="bg-blue-500 text-white px-3 py-1 rounded mr-2"
                  >
                    View
                  </button>
                 
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DocumentPage;
