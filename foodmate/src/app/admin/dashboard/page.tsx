'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function AdminDashboard() {
  return (
    <main className="h-[94vh] overflow-hidden p-6 bg-white/30 backdrop-blur-md rounded-2xl">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Example cards */}
        <Card className="bg-white/30 backdrop-blur-md">
          <CardHeader>
            <CardTitle>Total Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold">1,245</p>
          </CardContent>
        </Card>

        <Card className="bg-white/30 backdrop-blur-md">
          <CardHeader>
            <CardTitle>Active Restaurants</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold">34</p>
          </CardContent>
        </Card>

        <Card className="bg-white/30 backdrop-blur-md">
          <CardHeader>
            <CardTitle>New Signups</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold">120</p>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}

