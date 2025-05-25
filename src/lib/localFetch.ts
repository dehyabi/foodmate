export const fetchOrders = async (): Promise<any[]> => {
  const data = localStorage.getItem('orders');
  return data ? JSON.parse(data) : [];
};

export const fetchFavorites = async (): Promise<any[]> => {
  const data = localStorage.getItem('favorites');
  return data ? JSON.parse(data) : [];
};

