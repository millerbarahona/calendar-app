import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const PublicRoute = () => {
  const { uid } = useSelector(state => state.auth);

  return uid ? <Navigate to="/"/> : <Outlet />
}
