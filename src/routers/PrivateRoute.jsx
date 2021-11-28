import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const PrivateRoute = () => {
  const { uid } = useSelector(state => state.auth);

  return uid ? <Outlet /> : <Navigate  to="/login"/>
}