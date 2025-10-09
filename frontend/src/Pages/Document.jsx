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
        // Map static docs to include a common 'docId' field
        const staticDocs = DocumentDetail.map(d => ({ ...d, docId: d.id.toString(), isStatic: true }));
        const backendDocs = data.data.map(d => ({ ...d, docId: d._id, isStatic: false }));
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
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4 text-center">Welcome to the Document Page!</h1>
      <p className="text-center mb-6">View all your documents in one place!</p>

      {docs.length === 0 ? (
        <p className="text-center text-gray-500">No documents found.</p>
      ) : (
        <div className="space-y-6">
          {docs.map((doc) => (
            <Link
              key={doc.docId}
              to={`/document/${doc.docId}`}   // Navigate to detail page
              className="block bg-slate-100 rounded-lg p-4 shadow-md hover:bg-slate-200"
            >
              <h2 className="text-xl font-semibold text-cyan-700 mb-2">{doc.title}</h2>
              <p><strong>Requirement:</strong> {doc.requirement}</p>
              <p><strong>Intro:</strong> {doc.intro}</p>
              <p><strong>Use Case:</strong> {doc.useCase}</p>
              <p><strong>Process:</strong> {doc.process}</p>
            </Link>
          ))}
        </div>
      )}

      <div className="text-center mt-6">
        <Link to="/addDoc">
          <button className="bg-teal-400 text-slate-800 px-6 py-2 rounded shadow-md hover:bg-teal-500">
            Add Document
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Document;
