'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const orders = [
  {
    id: 1001,
    customer: 'John Doe',
    restaurant: 'Pasta Palace',
    total: '$25.99',
    status: 'Delivered',
  },
  {
    id: 1002,
    customer: 'Jane Smith',
    restaurant: 'Sushi Spot',
    total: '$42.50',
    status: 'Pending',
  },
  {
    id: 1003,
    customer: 'Alice Johnson',
    restaurant: 'Burger Haven',
    total: '$18.75',
    status: 'Cancelled',
  },
];

export default function AdminOrdersPage() {
  return (
    <main className="h-[100%] p-6 bg-white/30 backdrop-blur-md rounded-2xl overflow-hidden">
      <h1 className="text-3xl font-bold mb-6">Orders</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {orders.map((order) => (
          <Card key={order.id} className="bg-white/40 backdrop-blur-md">
            <CardHeader>
              <CardTitle>Order #{order.id}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-1 text-sm">
              <p>
                <strong>Customer:</strong> {order.customer}
              </p>
              <p>
                <strong>Restaurant:</strong> {order.restaurant}
              </p>
              <p>
                <strong>Total:</strong> {order.total}
              </p>
              <p>
                <strong>Status:</strong>{' '}
                <span
                  className={`font-medium ${
                    order.status === 'Delivered'
                      ? 'text-green-600'
                      : order.status === 'Pending'
                      ? 'text-yellow-600'
                      : 'text-red-600'
                  }`}
                >
                  {order.status}
                </span>
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  );
}

