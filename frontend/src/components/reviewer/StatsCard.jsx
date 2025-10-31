import React from 'react';

const StatsCard = ({ title, value }) => {
  return (
    <div className="bg-white shadow rounded-lg p-4 flex flex-col items-center justify-center text-center">
      <h3 className="text-lg font-medium">{title}</h3>
      <p className="text-2xl font-bold text-blue-600">{value}</p>
    </div>
  );
};

export default StatsCard;
