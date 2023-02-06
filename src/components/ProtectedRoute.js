import React from 'react';
import { Route, Navigate } from 'react-router-dom';

export function ProtectedRoute({ children, loggedIn, ...props }) {
  return (
    <Route {...props}>{loggedIn ? children : <Navigate to='/login' />}</Route>
  );
}
