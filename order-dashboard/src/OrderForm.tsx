import React, { useState } from 'react';
import axios from 'axios';

export default function OrderForm() {
  const [data, setData] = useState({ customerName: '', itemName: '', quantity: 1, price: 0 });
  const submit = async () => {
    await axios.post('/api/orders', data);
    window.location.reload();
  };
  return (
    <div className="mb-4">
      <input placeholder="Customer" onChange={e=>setData({...data, customerName:e.target.value})} />
      <input placeholder="Item" onChange={e=>setData({...data, itemName:e.target.value})} />
      <input type="number" placeholder="Qty" onChange={e=>setData({...data, quantity:+e.target.value})} />
      <input type="number" placeholder="Price" onChange={e=>setData({...data, price:+e.target.value})} />
      <button onClick={submit}>Create Order</button>
    </div>
  );
}