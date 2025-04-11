import { useEffect, useState } from 'react';
import axios from 'axios';

type Order = {
  id: number;
  customerName: string;
  itemName: string;
  quantity: number;
  price: number;
};

export default function OrderList() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    axios
      .get('http://localhost:8081/api/orders')
      .then(res => {
        const data = res.data;
        const list: Order[] = Array.isArray(data)
          ? data
          : (data?.content as Order[]) ?? [];
        setOrders(list);
      })
      .catch(err => {
        console.error('Failed to fetch orders:', err);
        setOrders([]);
      });
  }, []);

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Existing Orders</h2>
      <div className="space-y-3">
        {orders.length > 0 ? (
          orders.map(o => (
            <div
              key={o.id}
              className="p-4 border rounded-lg shadow-sm bg-white hover:shadow-md transition"
            >
              <p className="text-gray-700 font-medium">
                <span className="text-indigo-600">{o.customerName}</span> ordered{' '}
                <strong>{o.quantity}</strong> × <span className="italic">{o.itemName}</span>
              </p>
              <p className="text-sm text-gray-500">Total: ₹{o.quantity * o.price}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500 italic">No orders found.</p>
        )}
      </div>
    </div>
  );
}
