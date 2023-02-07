import React from 'react';
import { Navigate } from 'react-router-dom';

export function ProtectedRoute({ children, loggedIn }) {
  return loggedIn ? children : <Navigate to='/login' />;
}
