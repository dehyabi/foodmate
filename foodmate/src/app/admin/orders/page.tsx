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
    // Get or seed restaurants
    const existingRestaurants = localStorage.getItem('restaurants');
    let restaurants: Restaurant[];

    if (!existingRestaurants) {
      restaurants = [
        {
          id: 'r1',
          name: 'Pasta Palace',
          description: 'Best handmade pasta in town.',
          menu: [
            { id: 'm1', name: 'Spaghetti Bolognese', price: 12 },
            { id: 'm2', name: 'Penne Alfredo', price: 10 },
            { id: 'm3', name: 'Lasagna', price: 13 },
          ],
        },
        {
          id: 'r2',
          name: 'Burger House',
          description: 'Juicy, crispy, and classic burgers.',
          menu: [
            { id: 'm4', name: 'Classic Beef Burger', price: 9 },
            { id: 'm5', name: 'Chicken Burger', price: 8 },
            { id: 'm6', name: 'Vegan Burger', price: 10 },
          ],
        },
        {
          id: 'r3',
          name: 'Sushi World',
          description: 'Fresh sushi and sashimi made to order.',
          menu: [
            { id: 'm7', name: 'Salmon Nigiri', price: 14 },
            { id: 'm8', name: 'Tuna Roll', price: 12 },
            { id: 'm9', name: 'Veggie Roll', price: 11 },
          ],
        },
      ];

      localStorage.setItem('restaurants', JSON.stringify(restaurants));
    } else {
      restaurants = JSON.parse(existingRestaurants);
    }

    // Build a map: restaurantId -> restaurantName
    const map: Record<string, string> = {};
    restaurants.forEach((r) => {
      map[r.id] = r.name;
    });
    setRestaurantMap(map);

    // Get or seed orders
    const existingOrders = localStorage.getItem('orders');
    if (!existingOrders) {
      const orders: Order[] = [
        {
          id: 'o1',
          restaurantId: 'r1',
          items: [
            { id: 'm1', name: 'Spaghetti Bolognese', quantity: 2 },
            { id: 'm2', name: 'Penne Alfredo', quantity: 1 },
          ],
          total: 34,
          user: 'user1@example.com',
          status: 'completed',
        },
        {
          id: 'o2',
          restaurantId: 'r2',
          items: [
            { id: 'm4', name: 'Classic Beef Burger', quantity: 1 },
            { id: 'm6', name: 'Vegan Burger', quantity: 2 },
          ],
          total: 29,
          user: 'user2@example.com',
          status: 'pending',
        },
        {
          id: 'o3',
          restaurantId: 'r3',
          items: [
            { id: 'm7', name: 'Salmon Nigiri', quantity: 1 },
            { id: 'm8', name: 'Tuna Roll', quantity: 1 },
          ],
          total: 26,
          user: 'user3@example.com',
          status: 'completed',
        },
      ];

      localStorage.setItem('orders', JSON.stringify(orders));
      setOrders(orders);
    } else {
      setOrders(JSON.parse(existingOrders));
    }
  }, []);

  return (
    <main className="h-[100%] p-6 bg-white/30 backdrop-blur-md rounded-2xl overflow-hidden">
      <h1 className="text-3xl font-bold mb-6">Orders</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {orders.map((order) => (
          <Card key={order.id} className="bg-white/40 backdrop-blur-md">
            <CardHeader>
              <CardTitle>Order #{order.id}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <p><strong>User:</strong> {order.user}</p>
              <p>
                <strong>Restaurant:</strong>{' '}
                {restaurantMap[order.restaurantId] ?? order.restaurantId}
              </p>
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

