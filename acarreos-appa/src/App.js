import React from 'react';
import Header from './components/Header.js';
import MainView from './Views/MainView.js';
import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <MainView />
    </div>
  );
}

export default App;