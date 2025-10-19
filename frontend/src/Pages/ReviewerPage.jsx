import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ReviewerPage = () => {
  const { backendURL } = useContext(AppContext);
  const navigate = useNavigate();
  const [docs, setDocs] = useState([]);
  const [comment, setComment] = useState({}); // store comments per doc

  // Fetch documents from backend
  const fetchDocs = async () => {
    try {
      const { data } = await axios.get(`${backendURL}/api/auth/get-docs`);
      if (data.success) {
        // Only include docs with latest version status "pending"
        const pendingDocs = data.data.filter((doc) => {
          const latestVersion = doc.versions[doc.currentVersion - 1];
          return latestVersion.status.toLowerCase() === "pending";
        });
        setDocs(pendingDocs);
      }
    } catch (error) {
      toast.error("Failed to fetch documents");
    }
  };
  useEffect(() => {
    fetchDocs();
  }, []);

  // Handle approve or reject
  const handleReview = async (docId, action) => {
    try {
      const { data } = await axios.post(
        `${backendURL}/api/auth/review/${docId}`,
        { action, comment: comment[docId] || "" },
        { withCredentials: true }
      );
      if (data.success) {
        toast.success(`Document ${action}ed successfully`);
        fetchDocs(); // refresh documents
      } else {
        toast.error(data.message || "Action failed");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Action failed");
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold text-cyan-700 mb-6">Documents for Review</h1>

      {docs.length === 0 ? (
        <p>No documents pending review.</p>
      ) : (
        docs.map((doc) => {
          const latestVersion = doc.versions[doc.currentVersion - 1];
          const status = latestVersion.status.toLowerCase();

          return (
            <div key={doc._id} className="bg-white p-6 mb-4 rounded shadow-md border-l-4 border-cyan-400">
              <h2 className="text-xl font-semibold mb-2">
                {doc.title} (v{latestVersion.versionNo}) - <span className="capitalize">{status}</span>
              </h2>

              <p><strong>Requirement:</strong> {doc.requirement}</p>
              <p><strong>Intro:</strong> {doc.intro}</p>
              <p><strong>Use Case:</strong> {doc.useCase}</p>
              <p><strong>Process:</strong> {doc.process}</p>

              {latestVersion.fields && latestVersion.fields.length > 0 && (
                <div className="my-4">
                  {latestVersion.fields.map((field, i) => (
                    <div key={i} className="flex gap-2 mb-2">
                      <span className="font-semibold">{field.label}:</span>
                      <span>{field.value}</span>
                    </div>
                  ))}
                </div>
              )}

              {status === "rejected" && latestVersion.reviewerComments && (
                <p className="text-red-600 mb-2">Rejected comment: {latestVersion.reviewerComments}</p>
              )}

              {status === "pending" && (
                <>
                  <textarea
                    placeholder="Add comment if rejecting..."
                    value={comment[doc._id] || ""}
                    onChange={(e) => setComment({ ...comment, [doc._id]: e.target.value })}
                    className="w-full border rounded px-3 py-2 mb-3"
                  />

                  <div className="flex gap-4">
                    <button
                      onClick={() => handleReview(doc._id, "approve")}
                      className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleReview(doc._id, "reject")}
                      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    >
                      Reject
                    </button>
                  </div>
                </>
              )}

              {status === "rejected" && (
                <button
                  onClick={() => navigate(`/editDoc/${doc._id}`)}
                  className="mt-3 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Edit Rejected Version
                </button>
              )}
            </div>
          );
        })
      )}
    </div>
  );
};

export default ReviewerPage;
