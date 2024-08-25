import React from 'react';
import Header from './components/Header.js';
import MainView from './Views/MainView.js';
import RegisterView from './Views/RegisterView.js';
import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <RegisterView />
    </div>
  );
}

export default App;