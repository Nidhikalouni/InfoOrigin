import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';
import jsPDF from 'jspdf';
import { DocumentDetail } from '../assets/constant';

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
          const allDocs = [
           
            ...DocumentDetail.map(d => ({ ...d, docId: String(d.id), isStatic: true })),
            ...data.data.map(d => ({ ...d, docId: String(d._id), isStatic: false }))
          ];
          const found = allDocs.find(d => d.docId === id);
          if (found) setDoc(found);
          else toast.error("Document not found");
        }
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch document");
      }
    };
    fetchDoc();
  }, [id, backendURL]);

  const handleDownload = async (version) => {
  try {
    const response = await axios.get(
      `${backendURL}/api/pdf/download/${doc._id}/${version.versionNo}`,
      { responseType: "blob", withCredentials: true }
    );

    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `${doc.title}_v${version.versionNo}.pdf`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  } catch (error) {
    console.error(error);
    toast.error("Failed to download PDF");
  }
};

  const handleDelete = async () => {
    if (doc.isStatic) {
      toast.info("Static documents cannot be deleted!");
      return;
    }
    try {
      await axios.delete(`${backendURL}/api/auth/delete-doc/${doc.docId}`);
      toast.success('Document Deleted Successfully!');
      navigate('/document');
    } catch (error) {
      console.error(error);
      toast.error('Failed to delete document.');
    }
  };

  const submitForReview = async (version) => {
    if (doc.isStatic) {
      toast.info("Static documents cannot be submitted!");
      return;
    }

    if (!["draft", "rejected"].includes(version.status.toLowerCase())) {
      toast.error("You can only submit Draft or Rejected documents for review!");
      return;
    }

    try {
      const { data } = await axios.post(
        `${backendURL}/api/auth/submit-review`,
        { id: doc.docId, fields: version.fields || [] },
        { withCredentials: true }
      );

      if (data.success) {
        toast.success("Document submitted for review!");
        navigate('/review');
      } else {
        toast.error(data.message || "Something went wrong!");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  if (!doc) return <p className="text-center mt-6">Loading document...</p>;

  return (
    <div className="p-6 max-w-5xl mx-auto bg-white rounded shadow-md space-y-6">
      <h1 className="text-3xl font-bold text-cyan-700">{doc.title}</h1>

      {/* ✅ Static Document Section */}
      {doc.isStatic ? (
        <div className="border p-4 rounded shadow-sm">
          <h2 className="text-xl font-semibold mb-2">Static Document</h2>

          <p><strong>Requirement:</strong> {doc.requirement}</p>
          <p><strong>Intro:</strong> {doc.intro}</p>
          <p><strong>Use Case:</strong> {doc.useCase}</p>
          <p><strong>Process:</strong> {doc.process}</p>

          {doc.fields && doc.fields.length > 0 && (
            <div className="my-4">
              {doc.fields.map((field, i) => (
                <div key={i} className="flex gap-2 mb-1">
                  <span className="font-semibold">{field.label}:</span>
                  <span>{field.value}</span>
                </div>
              ))}
            </div>
          )}

          <div className="flex gap-4 mt-4">
            <button
              onClick={() => handleDownload(doc)}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Download PDF
            </button>
          </div>
        </div>
      ) : (
        // ✅ Dynamic Document Versions
        doc.versions.map((version, idx) => (
          <div key={idx} className="border p-4 rounded shadow-sm">
            <h2 className="text-xl font-semibold mb-2">
              Version {version.versionNo} - <span className="capitalize">{version.status}</span>
            </h2>

            {version.status === 'rejected' && version.reviewerComments && (
              <p className="text-red-600 mb-2">Reviewer Comment: {version.reviewerComments}</p>
            )}


            <p><strong>Requirement:</strong> {doc.requirement  || ''}</p>
            <p><strong>Intro:</strong> {doc.intro || ''}</p>
            <p><strong>Use Case:</strong> {doc.useCase ||  ''}</p>
            <p><strong>Process:</strong> {doc.process  || ''}</p>

            {version.fields && version.fields.length > 0 && (
              <div className="my-4">
                {version.fields.map((field, i) => (
                  <div key={i} className="flex gap-2 mb-1">
                    <span className="font-semibold">{field.label}:</span>
                    <span>{field.value}</span>
                  </div>
                ))}
              </div>
            )}

            <div className="flex gap-4 mt-2">
              <button
                onClick={() => handleDownload(version)}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                Download PDF
              </button>


              {!doc.isStatic && version.status.toLowerCase() === "draft" && (
                <>
                  <button
                    onClick={() => navigate(`/editDoc/${doc.docId}`)}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => submitForReview(version)}
                    className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
                  >
                    Submit for Review
                  </button>
                </>
              )}

              {!doc.isStatic && (
                <button
                  onClick={handleDelete}
                  className="bg-red-400 text-white px-4 py-2 rounded hover:bg-red-500"
                >
                  Delete
                </button>
              )}
            </div>
            
          </div>
        ))
      )}
    </div>
  );
};

export default DocumentDetailPage;



