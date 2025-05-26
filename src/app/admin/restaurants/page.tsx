'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface MenuItem {
  id: string;
  name: string;
  price: number;
}

interface Restaurant {
  id: string;
  name: string;
  description: string;
  menu: MenuItem[];
  location: string;
  status: string;
}

export default function AdminRestaurantsPage() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('restaurants');

    if (stored) {
      const parsed = JSON.parse(stored);

      // Add fallback `location` and `status` if missing
      const enriched = parsed.map((r: Restaurant, index: number) => ({
        ...r,
        location: r.location || ['New York', 'Tokyo', 'Los Angeles'][index % 3],
        status: r.status || (index % 2 === 0 ? 'Open' : 'Closed'),
      }));

      setRestaurants(enriched);
    }
  }, []);

  return (
    <main className="h-[100%] p-6 bg-white/30 backdrop-blur-md rounded-2xl overflow-hidden">
      <h1 className="text-3xl font-bold mb-6">Restaurants</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {restaurants.map((restaurant) => (
          <Card key={restaurant.id} className="bg-white/40 backdrop-blur-md">
            <CardHeader>
              <CardTitle>{restaurant.name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-1 text-sm">
              <p>
                <strong>Location:</strong> {restaurant.location}
              </p>
              <p>
                <strong>Status:</strong>{' '}
                <span
                  className={`font-medium ${
                    restaurant.status === 'Open'
                      ? 'text-green-600'
                      : 'text-red-600'
                  }`}
                >
                  {restaurant.status}
                </span>
              </p>
              <p>
                <strong>Description:</strong> {restaurant.description}
              </p>
              <p>
                <strong>Menu items:</strong> {restaurant.menu.length}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  );
}

