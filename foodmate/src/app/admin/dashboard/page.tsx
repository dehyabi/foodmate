'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { seedRestaurants } from '@/lib/seedRestaurants';

export default function AdminDashboard() {
  const [restaurantCount, setRestaurantCount] = useState(0);
  const [orderCount, setOrderCount] = useState(0);
  const [userCount, setUserCount] = useState(0);

  useEffect(() => {
    // Seed if not already done
    seedRestaurants();

    // Load restaurants
    const restaurants = JSON.parse(localStorage.getItem('restaurants') || '[]');
    setRestaurantCount(restaurants.length);

    // Load orders
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    setOrderCount(orders.length);

    // Load users
    const users = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    setUserCount(users.length);
  }, []);

  return (
    <main className="h-[100%] overflow-hidden p-6 bg-white/30 backdrop-blur-md rounded-2xl">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="bg-white/30 backdrop-blur-md">
          <CardHeader>
            <CardTitle>Total Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold">{orderCount}</p>
          </CardContent>
        </Card>

        <Card className="bg-white/30 backdrop-blur-md">
          <CardHeader>
            <CardTitle>Active Restaurants</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold">{restaurantCount}</p>
          </CardContent>
        </Card>

        <Card className="bg-white/30 backdrop-blur-md">
          <CardHeader>
            <CardTitle>Registered Users</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold">{userCount}</p>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}

