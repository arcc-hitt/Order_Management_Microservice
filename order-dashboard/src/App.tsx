import React from 'react';
import OrderList from './OrderList';
import OrderForm from './OrderForm';
import './App.css';

function App() {
  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Order Dashboard</h1>
      <OrderForm />
      <OrderList />
    </div>
  );
}
export default App