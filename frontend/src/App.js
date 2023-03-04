import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { loadUser, login } from './Actions/User';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Login from './components/Login/Login';
import Home from './components/Home/Home';
import Register from './components/Register/Register';
import UpdateProfile from './components/UpdateProfile/UpdateProfile';
const App = () => {

  const {isAuthenticated} = useSelector(state => state.userReducer);

  const dispatch  = useDispatch();
  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch])

  return (
    <Router>
      <ToastContainer autoClose={2000} theme="dark" />
      <Routes>
        <Route path='/' element={ isAuthenticated ? <Home/> :
          <Login/>
        }></Route>

        <Route path='/edit/profile' element={ isAuthenticated ? <UpdateProfile/> :
          <Login/>
        }></Route>

        <Route path='/login' element={ isAuthenticated ? <Home/> :
          <Login/>
        }></Route>

        <Route path='/register' element={ isAuthenticated ? <Home/> :
          <Register/>
        }></Route>

      </Routes>
    </Router>
  )
}

export default App;