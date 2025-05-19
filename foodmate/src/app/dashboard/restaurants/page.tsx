'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import toast from 'react-hot-toast';

type MenuItem = {
  id: string;
  name: string;
  price: number;
};

type Restaurant = {
  id: string;
  name: string;
  description: string;
  cuisine: string;
  rating: number;
  menu: MenuItem[];
};

type Order = {
  id: string;
  restaurant: string;
  items: { id: string; name: string; quantity: number }[];
  total: number;
  status: 'Pending';
};

export default function UserRestaurantsPage() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);

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

  const handleOrder = (item: MenuItem) => {
    const order: Order = {
      id: `o-${Date.now()}`,
      restaurant: selectedRestaurant!.name,
      items: [{ id: item.id, name: item.name, quantity: 1 }],
      total: item.price,
      status: 'Pending',
    };

    const existingOrders = localStorage.getItem('orders');
    const parsed = existingOrders ? JSON.parse(existingOrders) : [];

    localStorage.setItem('orders', JSON.stringify([...parsed, order]));

    toast.success(`Ordered ${item.name} from ${selectedRestaurant!.name}`);
  };

  return (
    <main className="h-full p-6 bg-white/30 backdrop-blur-md rounded-2xl">
      <h1 className="text-3xl font-bold mb-6">Browse Restaurants</h1>

      {!selectedRestaurant ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {restaurants.map((restaurant) => (
            <Card
              key={restaurant.id}
              onClick={() => setSelectedRestaurant(restaurant)}
              className="bg-white/30 backdrop-blur-md hover:shadow-lg transition cursor-pointer"
            >
              <CardHeader>
                <CardTitle>{restaurant.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-gray-700">{restaurant.description}</p>
                <p className="text-gray-700">Cuisine: {restaurant.cuisine}</p>
                <p className="text-yellow-600">⭐ {restaurant.rating.toFixed(1)}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="space-y-6">
          <button
            onClick={() => setSelectedRestaurant(null)}
            className="text-blue-600 hover:underline mb-4"
          >
            ← Back to restaurants
          </button>

          <h2 className="text-2xl font-bold">{selectedRestaurant.name}</h2>
          <p className="text-gray-700">{selectedRestaurant.description}</p>
          <p className="text-gray-700">Cuisine: {selectedRestaurant.cuisine}</p>
          <p className="text-yellow-600">⭐ {selectedRestaurant.rating.toFixed(1)}</p>

          <h3 className="text-xl font-semibold mt-4">Menu</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {selectedRestaurant.menu.map((item) => (
              <Card key={item.id} className="bg-white/40 p-4">
                <CardTitle className="text-lg">{item.name}</CardTitle>
                <p className="text-gray-800 font-medium">${item.price.toFixed(2)}</p>
                <button
                  onClick={() => handleOrder(item)}
                  className="mt-2 px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition"
                >
                  Order
                </button>
              </Card>
            ))}
          </div>
        </div>
      )}
    </main>
  );
}

