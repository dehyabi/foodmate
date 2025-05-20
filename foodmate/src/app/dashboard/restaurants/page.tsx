'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart } from 'lucide-react';
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
  user: string;
};

type Favorite = {
  id: string;
  name: string;
  type: 'Restaurant';
  description: string;
};

export default function UserRestaurantsPage() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [userName, setUserName] = useState<string>('Guest');

  useEffect(() => {
    // Load user name from localStorage
    const user = localStorage.getItem('user');
    if (user) {
      try {
        const parsed = JSON.parse(user);
        setUserName(parsed.name || 'Guest');
      } catch {
        setUserName('Guest');
      }
    }

    const stored = localStorage.getItem('restaurants');
    if (stored) {
      try {
        const parsed: Restaurant[] = JSON.parse(stored);
        setRestaurants(parsed);
      } catch (err) {
        console.error('Failed to parse restaurants from localStorage:', err);
      }
    }

    const favs = localStorage.getItem('favorites');
    if (favs) {
      try {
        const parsedFavs: Favorite[] = JSON.parse(favs);
        const favIds = parsedFavs.map((fav) => fav.id);
        setFavorites(favIds);
      } catch (err) {
        console.error('Failed to parse favorites from localStorage:', err);
      }
    }
  }, []);

  const handleOrder = (item: MenuItem) => {
    if (!selectedRestaurant) return;

    const order: Order = {
      id: `o-${Date.now()}`,
      restaurant: selectedRestaurant.name,
      items: [{ id: item.id, name: item.name, quantity: 1 }],
      total: item.price,
      status: 'Pending',
      user: userName, // ✅ Save user's name
    };

    const existingOrders = localStorage.getItem('orders');
    const parsed = existingOrders ? JSON.parse(existingOrders) : [];

    localStorage.setItem('orders', JSON.stringify([...parsed, order]));

    toast.success(`Ordered ${item.name} from ${selectedRestaurant.name}`);
  };

  const toggleFavorite = (restaurant: Restaurant) => {
    let updatedFavorites: string[];

    if (favorites.includes(restaurant.id)) {
      updatedFavorites = favorites.filter((id) => id !== restaurant.id);
    } else {
      updatedFavorites = [...favorites, restaurant.id];
    }

    setFavorites(updatedFavorites);

    const detailedFavorites: Favorite[] = updatedFavorites.map((id) => {
      const r = restaurants.find((res) => res.id === id)!;
      return {
        id: r.id,
        name: r.name,
        type: 'Restaurant',
        description: r.description,
      };
    });

    localStorage.setItem('favorites', JSON.stringify(detailedFavorites));
  };

  return (
    <main className="h-full p-6 bg-white/30 backdrop-blur-md rounded-2xl">
      <h1 className="text-3xl font-bold mb-6">Browse Restaurants</h1>

      {!selectedRestaurant ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {restaurants.map((restaurant) => (
            <Card
              key={restaurant.id}
              className="bg-white/30 backdrop-blur-md hover:shadow-lg transition relative group"
            >
              <button
                onClick={() => toggleFavorite(restaurant)}
                className={`absolute top-2 right-2 z-10 p-2 rounded-full transition ${
                  favorites.includes(restaurant.id)
                    ? 'bg-pink-500 text-white'
                    : 'bg-white/70 text-gray-500 hover:bg-pink-100'
                }`}
              >
                <Heart
                  fill={favorites.includes(restaurant.id) ? 'white' : 'none'}
                  className="w-5 h-5"
                />
              </button>

              <div onClick={() => setSelectedRestaurant(restaurant)} className="p-4 cursor-pointer">
                <CardHeader>
                  <CardTitle>{restaurant.name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="text-gray-700">{restaurant.description}</p>
                  <p className="text-gray-700">Cuisine: {restaurant.cuisine}</p>
                  <p className="text-yellow-600">⭐ {restaurant.rating.toFixed(1)}</p>
                </CardContent>
              </div>
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

