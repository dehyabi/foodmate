'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface OrderItem {
  id: string;
  name: string;
  quantity: number;
}

interface Order {
  id: string;
  restaurantId: string;
  items: OrderItem[];
  total: number;
  user: string;
  status: 'completed' | 'pending' | 'cancelled';
}

interface Restaurant {
  id: string;
  name: string;
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [restaurantMap, setRestaurantMap] = useState<Record<string, string>>({});

  useEffect(() => {
    // Load restaurants
    try {
      const restaurants: Restaurant[] = JSON.parse(localStorage.getItem('restaurants') || '[]');
      const map: Record<string, string> = {};
      restaurants.forEach((r) => {
        map[r.id] = r.name;
      });
      setRestaurantMap(map);
    } catch (err) {
      console.error('Failed to parse restaurants:', err);
    }

    // Load orders
    try {
      const existingOrders = JSON.parse(localStorage.getItem('orders') || '[]');
      setOrders(existingOrders);
    } catch (err) {
      console.error('Failed to parse orders:', err);
    }
  }, []);

  return (
    <main className="h-full p-6 bg-white/30 backdrop-blur-md rounded-2xl overflow-hidden">
      <h1 className="text-3xl font-bold mb-6">Orders</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {orders.map((order) => (
          <Card key={order.id} className="bg-white/40 backdrop-blur-md hover:shadow-md transition">
            <CardHeader>
              <CardTitle>Order #{order.id}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <p><strong>User:</strong> {order.user}</p>
              <p><strong>Restaurant:</strong> {restaurantMap[order.restaurantId] ?? order.restaurantId}</p>
              <div>
                <strong>Items:</strong>
                <ul className="list-disc ml-5">
                  {order.items.map((item) => (
                    <li key={item.id}>
                      {item.name} × {item.quantity}
                    </li>
                  ))}
                </ul>
              </div>
              <p><strong>Total:</strong> ${order.total}</p>
              <p>
                <strong>Status:</strong>{' '}
                <span
                  className={`font-medium ${
                    order.status === 'completed'
                      ? 'text-green-600'
                      : order.status === 'pending'
                      ? 'text-yellow-600'
                      : 'text-red-600'
                  }`}
                >
                  {order.status}
                </span>
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  );
}

