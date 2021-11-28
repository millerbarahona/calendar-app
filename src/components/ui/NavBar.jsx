import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux'
import { startLogout } from '../../actions/auth';

export const NavBar = () => {

  const { name } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(startLogout());
  }

  return (
    <div className="navbar navbar-dark bg-dark mb-4">
      <span className="navbar-brand">
        { name }
      </span>

      <button className="btn btn-outline-danger" onClick={handleLogout}>
        <span> Salir </span>
        <i className="fas fa-sign-out-alt"></i>
      </button>
    </div>
  )
}
