import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const ReviewerProtectedRoute = ({ children }) => {
  const { isLoggedIn, userRole } = useContext(AppContext);

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  if (userRole !== 'reviewer') {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ReviewerProtectedRoute;
