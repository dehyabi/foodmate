'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type Order = {
  id: number;
  restaurant: string;
  items: string[];
  total: number;
  status: 'Pending' | 'Preparing' | 'Delivered' | 'Cancelled';
};

export default function UserOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    // Simulate fetching orders from API or localStorage
    const mockOrders: Order[] = [
      {
        id: 101,
        restaurant: 'Tasty Bites',
        items: ['Pizza', 'Garlic Bread'],
        total: 24.99,
        status: 'Delivered',
      },
      {
        id: 102,
        restaurant: 'Spice Villa',
        items: ['Butter Chicken', 'Naan'],
        total: 18.5,
        status: 'Preparing',
      },
      {
        id: 103,
        restaurant: 'Green Garden',
        items: ['Vegan Bowl'],
        total: 12.0,
        status: 'Cancelled',
      },
    ];

    setOrders(mockOrders);
  }, []);

  return (
    <main className="h-full p-6 bg-white/30 backdrop-blur-md rounded-2xl">
      <h1 className="text-3xl font-bold mb-6">My Orders</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {orders.map((order) => (
          <Card key={order.id} className="bg-white/30 backdrop-blur-md hover:shadow-lg transition">
            <CardHeader>
              <CardTitle>Order #{order.id}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-gray-700 font-medium">
                Restaurant: {order.restaurant}
              </p>
              <p className="text-sm text-gray-600">
                Items: {order.items.join(', ')}
              </p>
              <p className="text-gray-800 font-semibold">
                Total: ${order.total.toFixed(2)}
              </p>
              <span
                className={`inline-block px-3 py-1 text-sm rounded-full ${
                  order.status === 'Delivered'
                    ? 'bg-green-100 text-green-800'
                    : order.status === 'Preparing'
                    ? 'bg-yellow-100 text-yellow-800'
                    : order.status === 'Pending'
                    ? 'bg-gray-100 text-gray-800'
                    : 'bg-red-100 text-red-800'
                }`}
              >
                {order.status}
              </span>
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  );
}

