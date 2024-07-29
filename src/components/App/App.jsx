import React, { useEffect } from 'react';
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import { useDispatch } from 'react-redux';

import NavAppBar from '../Nav/AppBar';
import Footer from '../Footer/Footer';
import AppRoutes from './AppRoutes';
// import './App.css';
// import './output.css';

function App() {
  const dispatch = useDispatch();
  
  useEffect(() => {
    
    dispatch({ type: 'FETCH_USER' });
  }, [dispatch]);

  return (
    <Router>
      <div>
        <NavAppBar />
        <AppRoutes />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
