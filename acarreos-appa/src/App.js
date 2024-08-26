import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header.js';
import MainView from './Views/MainView.js';
import RegisterView from './Views/RegisterView.js';
import LoginView from './Views/LoginView.js';
import OrderView from './Views/OrderView.js'
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<MainView />} />
          <Route path="/register" element={<RegisterView />} />
          <Route path="/login" element={<LoginView />} />
          <Route path="/order" element={<OrderView />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;