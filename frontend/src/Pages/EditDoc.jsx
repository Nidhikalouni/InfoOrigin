import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AppContext } from '../context/AppContext';
import { DocumentDetail } from '../assets/constant';
import { toast } from 'react-toastify';

const EditDoc = () => {
  const { backendURL } = useContext(AppContext);
  const { id } = useParams();
  const navigate = useNavigate();

  const [docDetails, setDocDetails] = useState({
    title: '',
    requirement: '',
    intro: '',
    useCase: '',
    process: '',
  });

  const [isStatic, setIsStatic] = useState(false);

  useEffect(() => {
    const fetchDoc = async () => {
      try {
        const { data } = await axios.get(`${backendURL}/api/auth/get-docs`);
        if (data.success) {
          const allDocs = [
            ...DocumentDetail.map(d => ({ ...d, _id: d.id.toString(), isStatic: true })),
            ...data.data.map(d => ({ ...d, isStatic: false }))
          ];
          const doc = allDocs.find(d => d._id === id);
          if (!doc) return toast.error("Document not found!");
          setIsStatic(doc.isStatic);
          setDocDetails({
            title: doc.title || '',
            requirement: doc.requirement || '',
            intro: doc.intro || '',
            useCase: doc.useCase || '',
            process: doc.process || '',
          });
        }
      } catch (error) {
        console.error(error);
        toast.error('Failed to fetch document.');
      }
    };

    fetchDoc();
  }, [id, backendURL]);

  const handleChange = (e) => {
    setDocDetails({ ...docDetails, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isStatic) {
      toast.info("Static documents cannot be edited!");
      return;
    }
    try {
      await axios.put(`${backendURL}/api/auth/update-doc/${id}`, docDetails);
      toast.success('Document updated successfully!');
      navigate(`/document/${id}`);
    } catch (error) {
      console.error(error);
      toast.error('Failed to update document.');
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Edit Document</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {['title','requirement','intro','useCase','process'].map((field) => (
          <div key={field}>
            <label className="block font-semibold mb-1">{field.charAt(0).toUpperCase() + field.slice(1)}</label>
            {field === 'title' ? (
              <input
                type="text"
                name={field}
                value={docDetails[field]}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2"
                required
              />
            ) : (
              <textarea
                name={field}
                value={docDetails[field]}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2"
                rows={3}
              />
            )}
          </div>
        ))}
        <div className="text-center mt-4">
          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
          >
            Update Document
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditDoc;
