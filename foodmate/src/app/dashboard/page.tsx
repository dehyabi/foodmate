'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function UserDashboard() {
  const [ordersCount, setOrdersCount] = useState(0);
  const [favoritesCount, setFavoritesCount] = useState(0);

  useEffect(() => {
    const storedOrders = localStorage.getItem('orders');
    if (storedOrders) {
      try {
        const orders = JSON.parse(storedOrders);
        setOrdersCount(orders.length);
      } catch (err) {
        console.error('Failed to parse orders:', err);
      }
    }

    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      try {
        const favorites = JSON.parse(storedFavorites);
        setFavoritesCount(favorites.length);
      } catch (err) {
        console.error('Failed to parse favorites:', err);
      }
    }
  }, []);

  return (
    <main className="h-[100%] overflow-hidden p-6 bg-white/30 backdrop-blur-md rounded-2xl">
      <h1 className="text-3xl font-bold mb-6">User Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="bg-white/30 backdrop-blur-md hover:shadow-md transition">
          <CardHeader>
            <CardTitle>My Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold">{ordersCount}</p>
          </CardContent>
        </Card>

        <Card className="bg-white/30 backdrop-blur-md hover:shadow-md transition">
          <CardHeader>
            <CardTitle>Favorite Restaurants</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold">{favoritesCount}</p>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}

