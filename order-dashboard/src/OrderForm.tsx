import { useState } from 'react';
import axios from 'axios';

export default function OrderForm() {
  const [data, setData] = useState({ customerName: '', itemName: '', quantity: 1, price: 0 });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const submit = async () => {
    setLoading(true);
    try {
      await axios.post('/api/orders', data);
      setSuccess(true);
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.error("Failed to submit order:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mb-8 bg-gray-400 p-4 rounded-lg shadow-sm">
      <h2 className="text-lg font-semibold mb-4 text-gray-900">Create New Order</h2>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <input
          className="border p-2 rounded"
          placeholder="Customer Name"
          onChange={e => setData({ ...data, customerName: e.target.value })}
        />
        <input
          className="border p-2 rounded"
          placeholder="Item Name"
          onChange={e => setData({ ...data, itemName: e.target.value })}
        />
        <input
          className="border p-2 rounded"
          type="number"
          placeholder="Quantity"
          min={1}
          onChange={e => setData({ ...data, quantity: +e.target.value })}
        />
        <input
          className="border p-2 rounded"
          type="number"
          placeholder="Price"
          min={0}
          onChange={e => setData({ ...data, price: +e.target.value })}
        />
      </div>
      <button
        onClick={submit}
        disabled={loading}
        className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition duration-200"
      >
        {loading ? 'Submitting...' : 'Create Order'}
      </button>
      {success && <p className="text-green-600 mt-2">Order created successfully!</p>}
    </div>
  );
}
