import React from 'react';

const PendingDocs = () => {
  const docs = [
    { id: 1, title: "Passport Verification", user: "john_doe", date: "2025-10-28" },
    { id: 2, title: "License Review", user: "alice", date: "2025-10-25" }
  ];

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Pending Documents</h2>
      <table className="w-full border border-gray-300 rounded-lg">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2">Title</th>
            <th className="p-2">User</th>
            <th className="p-2">Submitted On</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {docs.map(doc => (
            <tr key={doc.id} className="text-center border-b">
              <td className="p-2">{doc.title}</td>
              <td className="p-2">{doc.user}</td>
              <td className="p-2">{doc.date}</td>
              <td className="p-2 space-x-2">
                <button className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600">Approve</button>
                <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">Reject</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PendingDocs;
