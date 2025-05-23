'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChevronLeft, ChevronRight, Utensils } from 'lucide-react';

interface OrderItem {
  id: string;
  name: string;
  quantity: number;
}

interface Order {
  id: string;
  restaurantId: string;
  items: OrderItem[];
  total: number;
  user: string;
  status: 'completed' | 'pending' | 'cancelled';
}

interface Restaurant {
  id: string;
  name: string;
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [restaurantMap, setRestaurantMap] = useState<Record<string, string>>({});
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    try {
      const restaurants: Restaurant[] = JSON.parse(localStorage.getItem('restaurants') || '[]');
      const map: Record<string, string> = {};
      restaurants.forEach((r) => {
        map[r.id] = r.name;
      });
      setRestaurantMap(map);
    } catch (err) {
      console.error('Failed to parse restaurants:', err);
    }

    try {
      const existingOrders = JSON.parse(localStorage.getItem('orders') || '[]');
      setOrders(existingOrders);
    } catch (err) {
      console.error('Failed to parse orders:', err);
    }
  }, []);

  const totalPages = Math.ceil(orders.length / itemsPerPage);
  const paginatedOrders = orders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <main className="h-full p-6 bg-white/30 backdrop-blur-md rounded-2xl overflow-hidden">
      <h1 className="text-3xl font-bold mb-6">Orders</h1>

      {orders.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center text-gray-600 mt-20">
          <Utensils className="w-16 h-16 mb-4 text-gray-500" />
          <p className="text-lg font-medium">No orders found</p>
          <p className="text-sm">Orders placed by users will appear here.</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            {paginatedOrders.map((order) => (
              <Card key={order.id} className="bg-white/40 backdrop-blur-md hover:shadow-md transition">
                <CardHeader>
                  <CardTitle>Order #{order.id}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <p><strong>User:</strong> {order.user}</p>
                  <p><strong>Restaurant:</strong> {restaurantMap[order.restaurantId] || 'Unknown'}</p>
                  <div>
                    <strong>Items:</strong>
                    <ul className="list-disc ml-5">
                      {order.items.map((item) => (
                        <li key={item.id}>
                          {item.name} × {item.quantity}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <p><strong>Total:</strong> ${order.total}</p>
                  <p>
                    <strong>Status:</strong>{' '}
                    <span
                      className={`font-medium ${
                        order.status === 'completed'
                          ? 'text-green-600'
                          : order.status === 'pending'
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

          {/* Pagination */}
          <div className="flex justify-center items-center gap-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-2 rounded bg-white/50 hover:bg-white/70 disabled:opacity-50"
            >
              <ChevronLeft />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-3 py-1 rounded ${
                  page === currentPage
                    ? 'bg-green-600 text-white'
                    : 'bg-white/70 text-gray-800 hover:bg-white'
                }`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-2 rounded bg-white/50 hover:bg-white/70 disabled:opacity-50"
            >
              <ChevronRight />
            </button>
          </div>
        </>
      )}
    </main>
  );
}

