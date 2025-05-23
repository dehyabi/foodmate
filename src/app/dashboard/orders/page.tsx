'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChevronLeft, ChevronRight, Utensils } from 'lucide-react';

type Order = {
  id: string;
  restaurant: string;
  items: { id: string; name: string; quantity: number }[];
  total: number;
  status: 'Pending';
};

export default function UserOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    const stored = localStorage.getItem('orders');
    if (stored) {
      try {
        const parsed: Order[] = JSON.parse(stored);
        setOrders(parsed);
      } catch (err) {
        console.error('Failed to parse orders:', err);
      }
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
    <main className="h-full p-6 bg-white/30 backdrop-blur-md rounded-2xl">
      <h1 className="text-3xl font-bold mb-6">Your Orders</h1>

      {orders.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center text-gray-600 mt-20">
          <Utensils className="w-16 h-16 mb-4 text-gray-500" />
          <p className="text-lg font-medium">No orders found</p>
          <p className="text-sm">Your orders will appear here.</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
            {paginatedOrders.map((order) => (
              <Card
                key={order.id}
                className="bg-white/30 backdrop-blur-md transition shadow"
              >
                <CardHeader>
                  <CardTitle>{order.restaurant}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <ul className="list-disc pl-5 text-gray-700">
                    {order.items.map((item) => (
                      <li key={item.id}>
                        {item.name} x {item.quantity}
                      </li>
                    ))}
                  </ul>
                  <p className="font-semibold text-green-700">
                    Total: ${order.total.toFixed(2)}
                  </p>
                  <p className="text-sm text-gray-500">Status: {order.status}</p>
                </CardContent>
              </Card>
            ))}
          </div>

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

