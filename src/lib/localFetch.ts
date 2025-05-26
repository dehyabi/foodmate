export interface Order {
  id: string;
  userId: string;
  items: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
  }>;
  total: number;
  status: 'pending' | 'preparing' | 'ready' | 'delivered' | 'cancelled';
  createdAt: string;
  updatedAt: string;
}

export const fetchOrders = async (): Promise<Order[]> => {
  const data = localStorage.getItem('orders');
  return data ? JSON.parse(data) : [];
};

export interface Favorite {
  id: string;
  userId: string;
  type: 'Restaurant' | 'Dish';
  name: string;
  description: string;
  createdAt: string;
}

export const fetchFavorites = async (): Promise<Favorite[]> => {
  const data = localStorage.getItem('favorites');
  return data ? JSON.parse(data) : [];
};

