'use client';

import { useEffect, useState } from 'react';
import { Heart } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type Favorite = {
  id: number;
  name: string;
  type: 'Restaurant' | 'Dish';
  description: string;
};

export default function UserFavoritesPage() {
  const [favorites, setFavorites] = useState<Favorite[]>([]);

  useEffect(() => {
    // Simulate fetching favorite items
    const mockFavorites: Favorite[] = [
      {
        id: 1,
        name: 'Spicy Dragon Roll',
        type: 'Dish',
        description: 'A fiery sushi roll with tuna, jalapeño, and wasabi mayo.',
      },
      {
        id: 2,
        name: 'Olive Garden',
        type: 'Restaurant',
        description: 'Casual Italian-American chain restaurant with family-style meals.',
      },
      {
        id: 3,
        name: 'Butter Chicken',
        type: 'Dish',
        description: 'Rich tomato-based creamy curry from Spice Villa.',
      },
    ];

    setFavorites(mockFavorites);
  }, []);

  return (
    <main className="h-full p-6 bg-white/30 backdrop-blur-md rounded-2xl">
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
        <Heart className="text-pink-500" />
        My Favorites
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {favorites.map((fav) => (
          <Card key={fav.id} className="bg-white/30 backdrop-blur-md hover:shadow-lg transition">
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                {fav.name}
                <span className="text-sm px-3 py-1 rounded-full bg-pink-100 text-pink-800">
                  {fav.type}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 text-sm">{fav.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  );
}

