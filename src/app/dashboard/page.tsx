'use client';

import { useEffect, useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import socket from '@/lib/websocketClient';
import { fetchGrpcOrders, fetchGrpcFavorites } from '@/lib/grpcClient';

export default function UserDashboard() {
  const queryClient = useQueryClient();
  const [wsConnected, setWsConnected] = useState(false);

  // gRPC: Fetch data (with no auto-refetch on window focus)
  const {
    data: orders = [],
    isLoading: loadingOrders,
    refetch: refetchOrders,
  } = useQuery({
    queryKey: ['orders'],
    queryFn: fetchGrpcOrders,
    refetchOnWindowFocus: false,
  });

  const {
    data: favorites = [],
    isLoading: loadingFavorites,
    refetch: refetchFavorites,
  } = useQuery({
    queryKey: ['favorites'],
    queryFn: fetchGrpcFavorites,
    refetchOnWindowFocus: false,
  });

  // Socket.IO: Realtime updates
  useEffect(() => {
    socket.on('connect', () => {
      setWsConnected(true);
      console.log('WebSocket connected');
    });

    socket.on('order-updated', (newOrders) => {
      if (Array.isArray(newOrders) && newOrders.length > 0) {
        queryClient.setQueryData(['orders'], newOrders);
      } else {
        console.warn('Skipped updating orders: empty or invalid data.');
      }
    });

    socket.on('favorites-updated', (newFavorites) => {
      if (Array.isArray(newFavorites) && newFavorites.length > 0) {
        queryClient.setQueryData(['favorites'], newFavorites);
      } else {
        console.warn('Skipped updating favorites: empty or invalid data.');
      }
    });

    socket.on('disconnect', () => {
      setWsConnected(false);
      console.log('WebSocket disconnected');
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('order-updated');
      socket.off('favorites-updated');
    };
  }, [queryClient]);

  return (
    <main className="h-[100%] overflow-hidden p-6 bg-white/30 backdrop-blur-md rounded-2xl">
      <h1 className="text-3xl font-bold mb-6">User Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="bg-white/30 backdrop-blur-md hover:shadow-md transition">
          <CardHeader>
            <CardTitle>My Orders</CardTitle>
          </CardHeader>
          <CardContent>
            {loadingOrders ? (
              <p className="text-gray-500 text-sm">Loading...</p>
            ) : (
              <>
                <p className="text-2xl font-semibold">{orders.length}</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Most recent: {orders[0]?.restaurant || 'N/A'}
                </p>
              </>
            )}
          </CardContent>
        </Card>

        <Card className="bg-white/30 backdrop-blur-md hover:shadow-md transition">
          <CardHeader>
            <CardTitle>Favorite Restaurants</CardTitle>
          </CardHeader>
          <CardContent>
            {loadingFavorites ? (
              <p className="text-gray-500 text-sm">Loading...</p>
            ) : (
              <>
                <p className="text-2xl font-semibold">{favorites.length}</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Top pick: {favorites[0]?.name || 'N/A'}
                </p>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  );
}

