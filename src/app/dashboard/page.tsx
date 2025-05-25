'use client';

import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { fetchOrders, fetchFavorites } from '@/lib/localFetch';

export default function UserDashboard() {
  const { data: orders = [], isLoading: loadingOrders } = useQuery({
    queryKey: ['orders'],
    queryFn: fetchOrders,
  });

  const { data: favorites = [], isLoading: loadingFavorites } = useQuery({
    queryKey: ['favorites'],
    queryFn: fetchFavorites,
  });

  return (
    <main className="h-[100%] overflow-hidden p-6 bg-white/30 backdrop-blur-md rounded-2xl">
      <h1 className="text-3xl font-bold mb-6">User Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="bg-white/30 backdrop-blur-md hover:shadow-md transition">
          <CardHeader>
            <CardTitle>My Orders</CardTitle>
          </CardHeader>
          <CardContent>
            {loadingOrders ? (
              <p className="text-gray-500 text-sm">Loading...</p>
            ) : (
              <p className="text-2xl font-semibold">{orders.length}</p>
            )}
          </CardContent>
        </Card>

        <Card className="bg-white/30 backdrop-blur-md hover:shadow-md transition">
          <CardHeader>
            <CardTitle>Favorite Restaurants</CardTitle>
          </CardHeader>
          <CardContent>
            {loadingFavorites ? (
              <p className="text-gray-500 text-sm">Loading...</p>
            ) : (
              <p className="text-2xl font-semibold">{favorites.length}</p>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  );
}

