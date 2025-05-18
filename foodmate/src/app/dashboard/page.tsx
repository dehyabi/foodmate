'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function UserDashboard() {
  return (
    <main className="h-[100%] overflow-hidden p-6 bg-white/30 backdrop-blur-md rounded-2xl">
      <h1 className="text-3xl font-bold mb-6">User Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Example user dashboard cards */}
        <Card className="bg-white/30 backdrop-blur-md">
          <CardHeader>
            <CardTitle>My Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold">12</p>
          </CardContent>
        </Card>

        <Card className="bg-white/30 backdrop-blur-md">
          <CardHeader>
            <CardTitle>Favorite Restaurants</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold">5</p>
          </CardContent>
        </Card>

        <Card className="bg-white/30 backdrop-blur-md">
          <CardHeader>
            <CardTitle>Pending Reviews</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold">3</p>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}

