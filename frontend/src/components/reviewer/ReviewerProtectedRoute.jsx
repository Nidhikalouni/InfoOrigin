import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';

const ReviewerProtectedRoute = ({ children }) => {
  const { isLoggedIn, role } = useContext(AppContext);

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  if (role !== 'reviewer') {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ReviewerProtectedRoute;
