import React, { useEffect, useState } from 'react';
import axios from 'axios';

type Order = {
  id: number;
  customerName: string;
  itemName: string;
  quantity: number;
  price: number;
};

export default function OrderList() {
  // start with an empty array
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    axios
      .get('http://localhost:8081/api/orders')
      .then(res => {
        const data = res.data;
        // If Spring Data JPA is returning a Page object, it'll be in `data.content`
        // Otherwise, assume `data` itself is an array
        const list: Order[] = Array.isArray(data)
          ? data
          : (data?.content as Order[]) ?? [];
        setOrders(list);
      })
      .catch(err => {
        console.error('Failed to fetch orders:', err);
        setOrders([]);  // fallback to empty array
      });
  }, []);

  return (
    <div className="mt-4">
      <h2 className="text-xl">Existing Orders</h2>
      <ul>
        {orders.length > 0 ? (
          orders.map(o => (
            <li key={o.id}>
              {o.customerName} ordered {o.quantity}×{o.itemName} @ ₹{o.price}
            </li>
          ))
        ) : (
          <li>No orders found.</li>
        )}
      </ul>
    </div>
  );
}
