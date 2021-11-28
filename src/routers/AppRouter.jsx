import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import {
  BrowserRouter as Router,
  Route,
  Routes, Navigate
} from 'react-router-dom';
import { startChecking } from '../actions/auth';
import { Screen404 } from '../components/404/Screen404';
import { Login } from '../components/auth/Login';
import { CalendarScreen } from '../components/calendar/CalendarScreen';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';

export const AppRouter = () => {

  const dispatch = useDispatch();
  const { checking, uid } = useSelector(state => state.auth);

  useEffect(() => {
    dispatch(startChecking());
  }, [dispatch]);

  if (checking) {
    return <h5>Espere...</h5>
  }

  return (
    <Router>
      
      <Routes>
        <Route
          path="/"
          element={<PrivateRoute />}
        >
          <Route  path='/' element={<CalendarScreen/>}/>
        </Route>
        <Route
          path="/login"
          element={<PublicRoute />}
        >
          <Route  path='/login' element={<Login/>}/>
        </Route>
        <Route path="*" element={<Screen404 />} />
      </Routes>
    </Router>
  )
}
