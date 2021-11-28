import React from 'react';
import { useDispatch } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import { startLogin, startRegister } from '../../actions/auth';
import { useForm } from '../../hooks/useForm';
import './login.css';

export const Login = () => {

  const dispatch = useDispatch();

  const [formLoginValues, handleLoginInputChange,] = useForm({
    lEmail: 'arley@gmail.com',
    lPassword: '123421',
  });

  const [formRegisterValues, handleRegisterInputChange,] = useForm({
    rName: 'Perro',
    rEmail: 'perro@gmail.com',
    rPassword: '123123',
    rPassword1: '123123',
  });

  const { lEmail, lPassword } = formLoginValues;

  const { rEmail, rPassword, rPassword1, rName } = formRegisterValues;

  const handleLogin = (e) => {
    e.preventDefault();
    const baseUrl = import.meta.env.VITE_REACT_APP_API_URL;
    console.log(baseUrl)
    dispatch(startLogin(lEmail, lPassword));
  }

  const handleRegister = (e) => {
    e.preventDefault();

    if (rPassword1 !== rPassword) {
      return toast.error('Los password no coinciden', {
        position: "top-center",
        autoClose: 3000,
        closeOnClick: true,
      });
    }else {
      dispatch(startRegister(rEmail, rPassword, rName))
    }
  }

  return (
    <div className="container login-container">
      <ToastContainer
        position="top-left"
        autoClose={1000}
      />
      <div className="row">
        <div className="col-md-6 login-form-1">
          <h3>Ingreso</h3>
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Correo"
                name="lEmail"
                value={lEmail}
                onChange={handleLoginInputChange}
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                placeholder="Contraseña"
                name="lPassword"
                value={lPassword}
                onChange={handleLoginInputChange}
              />
            </div>
            <div className="form-group">
              <input
                type="submit"
                className="btnSubmit"
                value="Login"
              />
            </div>
          </form>
        </div>

        <div className="col-md-6 login-form-2">
          <h3>Registro</h3>
          <form onSubmit={handleRegister}>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Nombre"
                name="rName"
                value={rName}
                onChange={handleRegisterInputChange}
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                className="form-control"
                placeholder="Correo"
                name="rEmail"
                value={rEmail}
                onChange={handleRegisterInputChange}
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                placeholder="Contraseña"
                name="rPassword"
                value={rPassword}
                onChange={handleRegisterInputChange}
              />
            </div>

            <div className="form-group">
              <input
                type="password"
                className="form-control"
                placeholder="Repita la contraseña"
                name="rPassword1"
                value={rPassword1}
                onChange={handleRegisterInputChange}
              />
            </div>

            <div className="form-group">
              <input
                type="submit"
                className="btnSubmit"
                value="Crear cuenta" />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
