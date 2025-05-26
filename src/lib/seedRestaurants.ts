export function seedRestaurants() {
  const existingRestaurants = localStorage.getItem('restaurants');

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

  
}

