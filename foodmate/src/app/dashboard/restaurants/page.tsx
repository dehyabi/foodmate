'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type Restaurant = {
  id: string;
  name: string;
  cuisine: string;
  rating: number;
};

export default function UserRestaurantsPage() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('restaurants');
    if (stored) {
      try {
        const parsed: Restaurant[] = JSON.parse(stored);
        setRestaurants(parsed);
      } catch (err) {
        console.error('Failed to parse restaurants from localStorage:', err);
      }
    }
  }, []);

  return (
    <main className="h-full p-6 bg-white/30 backdrop-blur-md rounded-2xl">
      <h1 className="text-3xl font-bold mb-6">Browse Restaurants</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {restaurants.map((restaurant) => (
          <Card
            key={restaurant.id}
            className="bg-white/30 backdrop-blur-md hover:shadow-lg transition"
          >
            <CardHeader>
              <CardTitle>{restaurant.name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-gray-700">Cuisine: {restaurant.cuisine}</p>
              <p className="text-yellow-600">⭐ {restaurant.rating.toFixed(1)}</p>
              <button className="mt-2 px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition">
                Order Now
              </button>
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  );
}

