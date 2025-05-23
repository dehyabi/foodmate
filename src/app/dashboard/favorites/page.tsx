'use client';

import { useEffect, useState } from 'react';
import { Heart } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Star } from 'lucide-react'; // Replace Utensils with Star or Heart icon if preferred

type Favorite = {
  id: string;
  name: string;
  type: 'Restaurant' | 'Dish';
  description: string;
};

export default function UserFavoritesPage() {
  const [favorites, setFavorites] = useState<Favorite[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('favorites');
    if (stored) {
      try {
        const parsed: Favorite[] = JSON.parse(stored);
        setFavorites(parsed);
      } catch (error) {
        console.error('Failed to parse favorites from localStorage:', error);
      }
    }
  }, []);

  return (
    <main className="h-full p-6 bg-white/30 backdrop-blur-md rounded-2xl">
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
        My Favorites
      </h1>

      {favorites.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center text-gray-600 mt-20">
          <Heart className="w-16 h-16 mb-4 text-gray-500" />
          <p className="text-lg font-medium">No favorites yet</p>
          <p className="text-sm">Your favorited restaurants will appear here.</p>
        </div>
      ) : (
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
      )}
    </main>
  );
}

