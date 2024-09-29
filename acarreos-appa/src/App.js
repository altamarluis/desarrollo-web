import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header.js';
import MainView from './Views/MainView.js';
import RegisterView from './Views/RegisterView.js';
import LoginView from './Views/LoginView.js';
import OrderView from './Views/OrderView.js'
import OrdersTable from './Views/OrdersTableView.js'
import CarrierTable from './Views/CarrierTableView.js'
import CarriersInventoryTable from './Views/AdminCarriersTableView.js'
import AdminOrdersTable from './Views/AdminOrdersTableView.js'
import RegisterCarrierView from './Views/RegisterCarriersView.js';
import './App.css';

function App() {
  return (
    <div className="App content-center">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<MainView />} />
          <Route path="/register" element={<RegisterView />} />
          <Route path="/login" element={<LoginView />} />
          <Route path="/order" element={<OrderView />} />
          <Route path="/my-orders" element={<OrdersTable />} />
          <Route path="/all-orders" element={<AdminOrdersTable />} />
          <Route path="/carrierorders" element={<CarrierTable />} />
          <Route path="/carriers" element={<CarriersInventoryTable />} />
          <Route path="/addCarriers" element={<RegisterCarrierView />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;