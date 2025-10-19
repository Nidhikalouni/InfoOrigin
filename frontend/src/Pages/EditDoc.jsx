import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AppContext } from '../context/AppContext';
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

  const [fields, setFields] = useState([]);
  const [isStatic, setIsStatic] = useState(false);

  useEffect(() => {
    const fetchDoc = async () => {
      try {
        const { data } = await axios.get(`${backendURL}/api/auth/get-docs`, {
          withCredentials: true,
        });

        if (data.success) {
          const doc = data.data.find(d => String(d._id) === String(id));
          if (!doc) return toast.error("Document not found!");

          setIsStatic(false);
          setDocDetails({
            title: doc.title || '',
            requirement: doc.requirement || '',
            intro: doc.intro || '',
            useCase: doc.useCase || '',
            process: doc.process || '',
          });
          setFields(doc.fields || []);
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

  const addField = () => {
    setFields([...fields, { label: "", value: "", type: "text", required: false }]);
  };

  const removeField = (index) => {
    const newFields = [...fields];
    newFields.splice(index, 1);
    setFields(newFields);
  };

  const handleFieldChange = (index, key, value) => {
    // const newFields = [...fields];
    // newFields[index][key] = value;// finds the object at the specified index, and updates the key property with the new value
    const newFields = fields.map((field, i) =>
      i === index ? { ...field, [key]: value } : field
    );
    setFields(newFields);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isStatic) return toast.info("Static documents cannot be edited!");

    try {
      await axios.put(`${backendURL}/api/auth/update-doc/${id}`, { ...docDetails, fields }, {
        withCredentials: true,
      });
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
        {['title', 'requirement', 'intro', 'useCase', 'process'].map((field) => (
          <div key={field}>
            <label className="block font-semibold mb-1">
              {field.charAt(0).toUpperCase() + field.slice(1)}
            </label>
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

        {/* Dynamic Fields */}
        <div className="mt-4">
          <h3 className="font-semibold mb-2">Dynamic Fields</h3>
          {fields.map((field, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <input
                type="text"
                placeholder="Label"
                value={field.label}
                onChange={(e) => handleFieldChange(index, "label", e.target.value)}
                className="p-2 border rounded flex-1"
                required
              />
              <input
                type="text"
                placeholder="Value"
                value={field.value}
                onChange={(e) => handleFieldChange(index, "value", e.target.value)}
                className="p-2 border rounded flex-1"
              />
              <select
                value={field.type}
                onChange={(e) => handleFieldChange(index, "type", e.target.value)}
                className="p-2 border rounded"
              >
                <option value="text">Text</option>
                <option value="number">Number</option>
                <option value="date">Date</option>
              </select>
              <button
                type="button"
                onClick={() => removeField(index)}
                className="bg-red-500 text-white px-2 rounded"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addField}
            className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
          >
            Add Field
          </button>
        </div>

        <div className="text-center mt-4">
          <button
            type="submit"
            className={`px-6 py-2 rounded text-white ${isStatic ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
              }`}
            disabled={isStatic}
          >
            Update Document
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditDoc;
