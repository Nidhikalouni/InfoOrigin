import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AppContext } from '../context/AppContext';
import axios from 'axios';

const AddDoc = () => {
  const { backendURL } = useContext(AppContext);
  const navigate = useNavigate();
  const { docId } = useParams(); // For editing a rejected version

  const [docDetails, setDocDetails] = useState({
    title: "",
    requirement: "",
    intro: "",
    useCase: "",
    process: "",
  });

  const [fields, setFields] = useState([]);

  // Fetch doc details if editing
  useEffect(() => {
    const fetchDoc = async () => {
      if (!docId) return;

      try {
        const { data } = await axios.get(`${backendURL}/api/auth/get-docs/${docId}`);
        if (data.success && data.doc) {
          const currentVersion = data.doc.versions[data.doc.currentVersion - 1];
          setDocDetails({
            title: data.doc.title,
            requirement: data.doc.requirement,
            intro: data.doc.intro,
            useCase: data.doc.useCase,
            process: data.doc.process,
          });
          setFields(currentVersion.fields || []);
        }
      } catch (error) {
        toast.error("Failed to load document for editing");
      }
    };

    fetchDoc();
  }, [docId, backendURL]);

  const changeHandler = (e) => {
    setDocDetails({ ...docDetails, [e.target.name]: e.target.value });
  };

  const addField = () => setFields([...fields, { label: "", value: "", type: "text" }]);
  const removeField = (index) => setFields(fields.filter((_, i) => i !== index));
  const handleFieldChange = (index, key, value) => {
    const newFields = [...fields];
    newFields[index][key] = value;
    setFields(newFields);
  };

 
  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    if (docId) {
      // Editing a rejected version
      const { data } = await axios.post(
        `${backendURL}/api/auth/submit-review/${docId}`,
        { ...docDetails, fields },
        { withCredentials: true }
      );
      if (data.success) {
        toast.success("Document resubmitted for review!");
        navigate('/document');
      } else {
        toast.error(data.message || "Something went wrong!");
      }
    } else {
      // New document
      const { data } = await axios.post(
        `${backendURL}/api/auth/add-doc`,
        {
          ...docDetails,
          fields,
          versions: [
            {
              versionNo: 1,
              status: "draft",  
              fields,
            },
          ],
          currentVersion: 1,
        },
        { withCredentials: true }
      );
      if (data.success) {
        toast.success("Document added successfully!");
        navigate('/document');
      } else {
        toast.error(data.message || "Something went wrong!");
      }
    }
  } catch (error) {
    toast.error(error.response?.data?.message || error.message);
  }
};

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-cyan-700 mb-8">
          {docId ? "Edit Rejected Document" : "Add New Document"}
        </h1>

        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-8 space-y-6">

          {['title','requirement','intro','useCase','process'].map(field => (
            <div key={field} className="flex flex-col">
              <label className="font-semibold text-gray-700 mb-1 capitalize">{field}</label>
              <textarea
                name={field}
                placeholder={`Enter ${field}`}
                value={docDetails[field]}
                onChange={changeHandler}
                className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                required
                rows={3}
              />
            </div>
          ))}

          {/* Dynamic Fields */}
          {fields.map((field, index) => (
            <div key={index} className="flex flex-col md:flex-row gap-4 items-center mb-4">
              <input
                type="text"
                placeholder="Label"
                value={field.label}
                onChange={(e) => handleFieldChange(index, "label", e.target.value)}
                className="flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                required
              />
              <textarea
                placeholder="Value"
                value={field.value}
                onChange={(e) => handleFieldChange(index, "value", e.target.value)}
                className="flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              />
              <select
                value={field.type}
                onChange={(e) => handleFieldChange(index, "type", e.target.value)}
                className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              >
                <option value="text">Text</option>
                <option value="number">Number</option>
                <option value="date">Date</option>
              </select>
              <button type="button" onClick={() => removeField(index)} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
                Remove
              </button>
            </div>
          ))}

          <div className="text-right">
            <button type="button" onClick={addField} className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600">
              Add Field
            </button>
          </div>

          <button type="submit" className="w-full bg-teal-500 text-white py-3 rounded-lg text-lg font-semibold hover:bg-teal-600">
            {docId ? "Submit for Review" : "Add Document"}
          </button>
        </form>
      </div>
    </div>
  );

   

};

export default AddDoc;

