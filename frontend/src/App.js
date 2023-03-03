import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { loadUser, login } from './Actions/User';
import './App.css';

const App = () => {

  const dispatch  = useDispatch();
  useEffect(async () => {
    dispatch(loadUser());
    // dispatch(login());
  }, [dispatch])
  return (
    <div>App</div>
  )
}

export default App;