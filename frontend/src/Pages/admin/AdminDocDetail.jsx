import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { AppContext } from "../../context/AppContext";

const AdminDocDetail = () => {
  const { backendURL } = useContext(AppContext);
  const { id } = useParams();
  const [doc, setDoc] = useState(null);


  useEffect(() => {
    const fetchDoc = async () => {
      try {
        const { data } = await axios.get(
          `${backendURL}/api/admin/documents/${id}`,
          { withCredentials: true }
        );
        setDoc(data.doc);
      } catch (error) {
        console.error(error);
      } 
    };
    fetchDoc();
  }, [backendURL, id]);


  if (!doc) return <p>Document not found.</p>;

  const currentVersion = doc.versions?.[doc.currentVersion - 1];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">{doc.title}</h1>

      <div className="bg-white p-6 rounded shadow">
        {/* Fixed fields */}
        <p><strong>Owner:</strong> {doc.ownerId?.name || "Unknown"}</p>
        <p><strong>Status:</strong> {doc.status}</p>
        <p><strong>Created At:</strong> {new Date(doc.createdAt).toLocaleString()}</p>
        <p><strong>Requirement:</strong> {doc.requirement}</p>
        <p><strong>Intro:</strong> {doc.intro}</p>
        <p><strong>Use Case:</strong> {doc.useCase}</p>
        <p><strong>Process:</strong> {doc.process}</p>

        {/* Dynamic fields */}
        {currentVersion?.fields?.map((field) => (
          <p key={field._id}>
            <strong>{field.label}:</strong> {field.value ?? "N/A"}
          </p>
        ))}
      </div>
    </div>
  );
};

export default AdminDocDetail;
