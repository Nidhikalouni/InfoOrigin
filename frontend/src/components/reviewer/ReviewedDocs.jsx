import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AppContext } from '../../context/AppContext';
import { toast } from 'react-toastify';

const ReviewedDocs = () => {
  const { backendURL } = useContext(AppContext);
  const [docs, setDocs] = useState([]);
  const [loading, setLoading] = useState(true);

  
  const fetchReviewedDocs = async () => {
  try {
    const response = await axios.get(`${backendURL}/api/reviewer/reviewed-docs`, {
      withCredentials: true,
    });

    if (response.data.success) {
      const formattedDocs = response.data.data.map((doc) => ({
        id: doc._id,
        title: doc.title,
        status: doc.status.charAt(0).toUpperCase() + doc.status.slice(1),
        date: new Date(doc.updatedAt).toLocaleDateString(),
        reason:doc.status.toLowerCase() === 'rejected'
                ? doc.reviewerComments || 'No comment provided'
                : '-', // only show reason if rejected
      }));
      setDocs(formattedDocs);
    } else {
      toast.error('Failed to fetch reviewed documents');
    }
  } catch (error) {
    console.error('Error fetching reviewed docs:', error);
    toast.error('Failed to fetch reviewed documents');
  } finally {
    setLoading(false);
  }
};


  useEffect(() => {
    fetchReviewedDocs();
  }, []);

  if (loading) {
    return <div className="text-center text-gray-600 py-6">Loading reviewed documents...</div>;
  }

  if (docs.length === 0) {
    return <div className="text-center text-gray-500 py-6">No reviewed documents found.</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4 text-cyan-700">Reviewed Documents</h2>
      <table className="w-full border border-gray-300 rounded-lg bg-white shadow">
        <thead>
          <tr className="bg-gray-200 text-gray-700">
            
            <th className="p-2">Title</th>
            <th className="p-2">Status</th>
            <th className="p-2">Reviewed On</th>
            <th className="p-2">Rejection Reason</th>
          </tr>
        </thead>
        <tbody>
          {docs.map((doc) => (
            <tr key={doc.id} className="text-center border-b hover:bg-gray-50">
              <td className="p-2">{doc.title}</td>
              <td
                className={`p-2 font-semibold ${
                  doc.status === 'Approved' ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {doc.status}
              </td>
              <td className="p-2">{doc.date}</td>
               <td className="p-2 text-sm text-red-600">
                 {doc.reason}
               </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReviewedDocs;

// import React, { useEffect, useState, useContext } from 'react';
// import axios from 'axios';
// import { AppContext } from '../../context/AppContext';
// import { toast } from 'react-toastify';

// const ReviewedDocs = () => {
//   const { backendURL } = useContext(AppContext);
//   const [docs, setDocs] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const fetchReviewedDocs = async () => {
//     try {
//       const response = await axios.get(`${backendURL}/api/reviewer/reviewed-docs`, {
//         withCredentials: true,
//       });

//       if (response.data.success) {
//         const formattedDocs = response.data.data.map((doc) => {
//           // get latest version info
//           const latestVersion = doc.versions?.[doc.currentVersion - 1] || {};
//           return {
//             id: doc._id,
//             title: doc.title,
//             status: latestVersion.status
//               ? latestVersion.status.charAt(0).toUpperCase() + latestVersion.status.slice(1)
//               : 'Unknown',
//             date: new Date(latestVersion.updatedAt || doc.updatedAt).toLocaleDateString(),
//             reason:
//               latestVersion.status.toLowerCase() === 'rejected'
//                 ? latestVersion.reviewerComments || 'No comment provided'
//                 : '-', // only show reason if rejected
//           };
//         });

//         setDocs(formattedDocs);
//       } else {
//         toast.error('Failed to fetch reviewed documents');
//       }
//     } catch (error) {
//       console.error('Error fetching reviewed docs:', error);
//       toast.error('Failed to fetch reviewed documents');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchReviewedDocs();
//   }, []);

//   if (loading) {
//     return <div className="text-center text-gray-600 py-6">Loading reviewed documents...</div>;
//   }

//   if (docs.length === 0) {
//     return <div className="text-center text-gray-500 py-6">No reviewed documents found.</div>;
//   }

//   return (
//     <div className="p-4">
//       <h2 className="text-xl font-semibold mb-4 text-cyan-700">Reviewed Documents</h2>
//       <table className="w-full border border-gray-300 rounded-lg bg-white shadow">
//         <thead>
//           <tr className="bg-gray-200 text-gray-700">
//             <th className="p-2">Title</th>
//             <th className="p-2">Status</th>
//             <th className="p-2">Reviewed On</th>
//             <th className="p-2">Rejection Reason</th>
//           </tr>
//         </thead>
//         <tbody>
//           {docs.map((doc) => (
//             <tr key={doc.id} className="text-center border-b hover:bg-gray-50">
//               <td className="p-2">{doc.title}</td>
//               <td
//                 className={`p-2 font-semibold ${
//                   doc.status === 'Approved' ? 'text-green-600' : doc.status === 'Rejected' ? 'text-red-600' : ''
//                 }`}
//               >
//                 {doc.status}
//               </td>
//               <td className="p-2">{doc.date}</td>
//               <td className="p-2 text-sm text-gray-700">
//                 {doc.reason}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default ReviewedDocs;

