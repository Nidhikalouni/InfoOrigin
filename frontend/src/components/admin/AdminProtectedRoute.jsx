// import React, { useContext } from 'react';
// import { Navigate } from 'react-router-dom';
// import { AppContext } from '../../context/AppContext'

// const AdminProtectedRoute = ({ children,roles }) => {
//   const { role,isLoggedIn} = useContext(AppContext);

//   if (!isLoggedIn) {
//     return <Navigate to="/login" replace />;
//   }

//   if (!roles.includes(role)) {
//     return <Navigate to="/" replace />;
//   }

//   return children;
// };

// export default AdminProtectedRoute;

import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";

const AdminProtectedRoute = ({ children, roles }) => {
  const { isLoggedIn, role, loading } = useContext(AppContext);

  if (loading) {
    return <div>Loading...</div>; // You can add a spinner or skeleton UI here
  }

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  if (!roles.includes(role)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AdminProtectedRoute;

