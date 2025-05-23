export async function fetchGrpcOrders() {
  // simulate gRPC API
  return new Promise((resolve) =>
    setTimeout(() => resolve(JSON.parse(localStorage.getItem('orders') || '[]')), 500)
  );
}

export async function fetchGrpcFavorites() {
  return new Promise((resolve) =>
    setTimeout(() => resolve(JSON.parse(localStorage.getItem('favorites') || '[]')), 500)
  );
}

