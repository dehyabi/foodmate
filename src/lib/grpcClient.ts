export async function fetchGrpcOrders() {
  const res = await fetch('/api/orders');
  if (!res.ok) throw new Error('Failed to fetch orders');
  return res.json();
}

export async function fetchGrpcFavorites() {
  const res = await fetch('/api/favorites');
  if (!res.ok) throw new Error('Failed to fetch favorites');
  return res.json();
}

