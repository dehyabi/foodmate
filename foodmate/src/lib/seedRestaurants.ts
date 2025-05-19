export function seedRestaurants() {
  const existingRestaurants = localStorage.getItem('restaurants');
  const existingOrders = localStorage.getItem('orders');

  // Seed restaurants if not already
  if (!existingRestaurants) {
    const restaurants = [
      {
        id: 'r1',
        name: 'Pasta Palace',
        description: 'Best handmade pasta in town.',
        cuisine: 'Italian',
        rating: 4.5,
        menu: [
          { id: 'm1', name: 'Spaghetti Bolognese', price: 12 },
          { id: 'm2', name: 'Penne Alfredo', price: 10 },
          { id: 'm3', name: 'Lasagna', price: 13 },
        ],
      },
      {
        id: 'r2',
        name: 'Burger House',
        description: 'Juicy, crispy, and classic burgers.',
        cuisine: 'American',
        rating: 4.3,
        menu: [
          { id: 'm4', name: 'Classic Beef Burger', price: 9 },
          { id: 'm5', name: 'Chicken Burger', price: 8 },
          { id: 'm6', name: 'Vegan Burger', price: 10 },
        ],
      },
      {
        id: 'r3',
        name: 'Sushi World',
        description: 'Fresh sushi and sashimi made to order.',
        cuisine: 'Japanese',
        rating: 4.8,
        menu: [
          { id: 'm7', name: 'Salmon Nigiri', price: 14 },
          { id: 'm8', name: 'Tuna Roll', price: 12 },
          { id: 'm9', name: 'Veggie Roll', price: 11 },
        ],
      },
    ];

    localStorage.setItem('restaurants', JSON.stringify(restaurants));
  }

  // Seed orders if not already
  if (!existingOrders) {
    const orders = [
      {
        id: 'o1',
        restaurantId: 'r1',
        items: [
          { id: 'm1', name: 'Spaghetti Bolognese', quantity: 2 },
          { id: 'm2', name: 'Penne Alfredo', quantity: 1 },
        ],
        total: 34,
        user: 'user1@example.com',
        status: 'completed',
      },
      {
        id: 'o2',
        restaurantId: 'r2',
        items: [
          { id: 'm4', name: 'Classic Beef Burger', quantity: 1 },
          { id: 'm6', name: 'Vegan Burger', quantity: 2 },
        ],
        total: 29,
        user: 'user2@example.com',
        status: 'pending',
      },
      {
        id: 'o3',
        restaurantId: 'r3',
        items: [
          { id: 'm7', name: 'Salmon Nigiri', quantity: 1 },
          { id: 'm8', name: 'Tuna Roll', quantity: 1 },
        ],
        total: 26,
        user: 'user3@example.com',
        status: 'completed',
      },
    ];

    localStorage.setItem('orders', JSON.stringify(orders));
  }
}

