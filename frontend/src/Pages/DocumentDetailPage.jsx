import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AppContext } from '../context/AppContext';
import { DocumentDetail } from '../assets/constant';
import { toast } from 'react-toastify';
import jsPDF from 'jspdf';

const DocumentDetailPage = () => {
  const { backendURL } = useContext(AppContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const [doc, setDoc] = useState(null);

  useEffect(() => {
    const fetchDoc = async () => {
      try {
        const { data } = await axios.get(`${backendURL}/api/auth/get-docs`);
        if (data.success) {
          // Add isStatic flag to distinguish static and backend docs
          const allDocs = [
            ...DocumentDetail.map(d => ({ ...d, docId: d.id.toString(), isStatic: true })),
            ...data.data.map(d => ({ ...d, docId: d._id, isStatic: false }))
          ];
          const found = allDocs.find(d => d.docId === id);
          setDoc(found);
        }
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch document");
      }
    };

    fetchDoc();
  }, [id, backendURL]);

  const handleDelete = async () => {
    if (doc.isStatic) {
      toast.info("Static documents cannot be deleted!");
      return;
    }

    try {
      await axios.delete(`${backendURL}/api/auth/delete-doc/${id}`);
      toast.success('Document Deleted Successfully!');
      navigate('/document'); 
    } catch (error) {
      console.error(error);
      toast.error('Failed to delete document.');
    }
  };

  const handleDownload = () => {
    if (!doc) return;

    const pdf = new jsPDF();

    pdf.setFontSize(20);
    pdf.text(doc.title, 20, 20);

    pdf.setFontSize(12);
    pdf.text(`Requirement: ${doc.requirement}`, 20, 40);
    pdf.text(`Intro: ${doc.intro}`, 20, 60);
    pdf.text(`Use Case: ${doc.useCase}`, 20, 80);
    pdf.text(`Process: ${doc.process}`, 20, 100);

    pdf.save(`${doc.title}.pdf`);
  };

  if (!doc) return <p className="text-center mt-6">Loading document...</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-cyan-700 mb-4">{doc.title}</h1>
      <p><strong>Requirement:</strong> {doc.requirement}</p>
      <p><strong>Intro:</strong> {doc.intro}</p>
      <p><strong>Use Case:</strong> {doc.useCase}</p>
      <p><strong>Process:</strong> {doc.process}</p>

      <div className="mt-6 flex gap-4">
        <button
          onClick={() => {
            if (doc.isStatic) {
              toast.info("Static documents cannot be edited!");
              return;
            }
            navigate(`/editDoc/${doc.docId}`);
          }}
          className="bg-blue-400 text-white px-4 py-2 rounded hover:bg-blue-500"
        >
          Edit
        </button>
        <button
          onClick={handleDelete}
          className="bg-red-400 text-white px-4 py-2 rounded hover:bg-red-500"
        >
          Delete
        </button>
        <button
          onClick={handleDownload}
          className="bg-green-400 text-white px-4 py-2 rounded hover:bg-green-500"
        >
          Download PDF
        </button>
      </div>
    </div>
  );
};

export default DocumentDetailPage;
