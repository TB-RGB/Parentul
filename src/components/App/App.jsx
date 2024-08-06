import React, { useEffect } from 'react';
import { HashRouter as Router } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import NavAppBar from '../Nav/AppBar';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
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
      <div className="min-h-screen w-full bg-custom-bg">
        <NavAppBar />
        <Header />
        <main>
        <AppRoutes />
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
