'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const restaurants = [
  { id: 1, name: 'Pasta Palace', location: 'New York', status: 'Open' },
  { id: 2, name: 'Sushi Spot', location: 'Tokyo', status: 'Closed' },
  { id: 3, name: 'Burger Haven', location: 'Los Angeles', status: 'Open' },
];

export default function AdminRestaurantsPage() {
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
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  );
}

