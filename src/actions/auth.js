import { toast } from "react-toastify";
import { fetchConToken, fetchSinToken } from "../helpers/fetch"
import { types } from "../types/types";

export const startLogin = (email, password) => {
  return async (dispatch) => {

    const reponse = await fetchSinToken('auth', { email, password }, 'POST');
    const body = await reponse.json();

    if (body.ok) {
      localStorage.setItem('token', body.token);
      localStorage.setItem('token-init-date', new Date().getTime());

      dispatch(login({
        uid: body.uid,
        name: body.name
      }))
    } else {
      return toast.error(`${body.msg}`, {
        position: "top-center",
        autoClose: 3000,
        closeOnClick: true,
      });
    }
  }
}

export const startRegister = (email, password, name) => {

  return async (dispatch) => {

    const reponse = await fetchSinToken('auth/new', { name, email, password }, 'POST');
    const body = await reponse.json();

    if (body.ok) {
      localStorage.setItem('token', body.token);
      localStorage.setItem('token-init-date', new Date().getTime());

      dispatch(login({
        uid: body.uid,
        name: body.name,
      }))

      return toast.success(`Cuenta creada!!`, {
        position: "top-center",
        autoClose: 3000,
        closeOnClick: true,
      });
    } else {
      return toast.error(`${body.msg}`, {
        position: "top-center",
        autoClose: 3000,
        closeOnClick: true,
      });
    }

  }
}

export const startChecking = () => {
  return async (dispatch) => {
    const reponse = await fetchConToken('auth/renew');
    const body = await reponse.json();

    if (body.ok) {
      localStorage.setItem('token', body.token);
      localStorage.setItem('token-init-date', new Date().getTime());

      dispatch(login({
        uid: body.uid,
        name: body.name,
      }))
    } else {
      dispatch(checkingFinish())
    }
  }
}

const checkingFinish = () => ({
  type: types.authCheckingFinish
})

const login = (user) => ({
  type: types.authLogin,
  payload: user
})

export const startLogout = () => {
  return (dispatch) => {
    localStorage.clear();
    dispatch(logout());
  }
}

const logout = () => ({
  type: types.authLogout
})