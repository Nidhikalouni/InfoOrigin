import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { AppContext } from '../context/AppContext';
import { DocumentDetail } from '../assets/constant';

const Document = () => {
  const { backendURL } = useContext(AppContext);
  const [docs, setDocs] = useState([]);

  const fetchDocs = async () => {
    try {
      const { data } = await axios.get(`${backendURL}/api/auth/get-docs`);
      if (data.success) {
        const staticDocs = DocumentDetail.map(d => ({
          ...d,
          docId: d.id,
          isStatic: true,
          currentVersion: 1,
          versions: [{ versionNo: 1, status: "Draft", fields: d.fields || [] }],
        }));

        const backendDocs = data.data.map(d => ({
          ...d,
          docId: d._id,
          isStatic: false,
        }));

        setDocs([...staticDocs, ...backendDocs]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchDocs();
  }, []);

  return (
    <div className="p-6 min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-4 text-center text-cyan-700">
        Welcome to the Document Page!
      </h1>
      <p className="text-center mb-6 text-gray-600">View all your documents in one place!</p>

      {docs.length === 0 ? (
        <p className="text-center text-gray-500">No documents found.</p>
      ) : (
        <div className="space-y-6">
          {docs.map((doc) => {
            const latestVersion = doc.versions[doc.versions.length - 1];

            return (
              <Link
                key={doc.docId}
                to={`/document/${doc.docId}`}
                className="block bg-white rounded-lg p-6 shadow hover:shadow-lg transition"
              >
                <div className="flex justify-between items-center mb-2">
                  <h2 className="text-xl font-semibold text-cyan-700">{doc.title}</h2>
                  <span
                    className={`px-2 py-1 rounded text-white text-sm ${
                      latestVersion.status === "approved"
                        ? "bg-green-500"
                        : latestVersion.status === "rejected"
                        ? "bg-red-500"
                        : "bg-yellow-500"
                    }`}
                  >
                    {latestVersion.status} (v{latestVersion.versionNo})
                  </span>
                </div>

                <p><strong>Requirement:</strong> {doc.requirement}</p>
                <p><strong>Intro:</strong> {doc.intro}</p>
                <p><strong>Use Case:</strong> {doc.useCase}</p>
                <p><strong>Process:</strong> {doc.process}</p>

                {latestVersion.fields && latestVersion.fields.length > 0 && (
                  <div className="mt-2">
                    <ul className="space-y-1">
                      {latestVersion.fields.map((field, idx) => (
                        <li key={idx}>
                          <strong>{field.label}:</strong> {field.value}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </Link>
            );
          })}
        </div>
      )}

      <div className="text-center mt-8">
        <Link to="/addDoc">
          <button className="bg-teal-500 text-white px-6 py-2 rounded shadow hover:bg-teal-600">
            Add Document
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Document;


