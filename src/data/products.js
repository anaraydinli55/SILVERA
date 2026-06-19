export const products = [
  {
    id: 'silver_ring_eternity',
    name: 'Eternal Embrace Silver Ring',
    description: 'A beautifully crafted 925 sterling silver ring featuring a continuous line of sparkling zirconia stones, symbolizing eternal love and commitment. Perfect for everyday elegance or special occasions.',
    material: '925 Sterling Silver, Cubic Zirconia',
    dimensions: 'Band width: 2mm, Stone size: 1.5mm',
    weight: '2.5g',
    price: 89.99,
    currency: 'AZN',
    category: 'Rings',
    imageUrl: '/images/ring-1.jpg',
    images: [
      '/images/ring-1.jpg',
      '/images/ring-1-alt1.jpg', // Assuming you'll add more images
      '/images/ring-1-alt2.jpg'
    ],
    isNewArrival: true,
    isBestSeller: true,
  },
  {
    id: 'silver_necklace_celestial',
    name: 'Celestial Dewdrop Necklace',
    description: 'Delicate sterling silver necklace with a gracefully hanging dewdrop-shaped pendant, adorned with a single, brilliant-cut crystal. It captures the essence of morning dew on a celestial body, offering subtle sparkle.',
    material: '925 Sterling Silver, Swarovski Crystal',
    dimensions: 'Chain length: 45cm (adjustable), Pendant: 10mm',
    weight: '4.0g',
    price: 129.00,
    currency: 'AZN',
    category: 'Necklaces',
    imageUrl: '/images/necklace-2.jpg',
    images: [
      '/images/necklace-2.jpg',
      '/images/necklace-2-alt1.jpg'
    ],
    isNewArrival: false,
    isBestSeller: true,
  },
  {
    id: 'silver_bracelet_serenity',
    name: 'Serenity Cuff Bracelet',
    description: 'A minimalist yet striking sterling silver cuff bracelet, polished to a high shine. Its open design allows for comfortable wear and makes a bold statement of modern sophistication.',
    material: '925 Sterling Silver',
    dimensions: 'Circumference: 17cm (adjustable), Width: 5mm',
    weight: '15.0g',
    price: 149.50,
    currency: 'AZN',
    category: 'Bracelets',
    imageUrl: '/images/bracelet-3.jpg',
    images: [
      '/images/bracelet-3.jpg',
      '/images/bracelet-3-alt1.jpg'
    ],
    isNewArrival: true,
    isBestSeller: false,
  },
  {
    id: 'silver_earrings_starlight',
    name: 'Starlight Drop Earrings',
    description: 'Elegant drop earrings crafted from sterling silver, featuring delicate chains cascading down to tiny, shimmering star-shaped charms. Perfect for adding a touch of celestial magic.',
    material: '925 Sterling Silver',
    dimensions: 'Drop length: 4cm',
    weight: '3.0g (pair)',
    price: 75.00,
    currency: 'AZN',
    category: 'Earrings',
    imageUrl: '/images/earring-4.jpg',
    images: [
      '/images/earring-4.jpg',
      '/images/earring-4-alt1.jpg'
    ],
    isNewArrival: false,
    isBestSeller: true,
  },
  {
    id: 'silver_ring_classic_band',
    name: 'Classic Silver Band Ring',
    description: 'A timeless and versatile polished sterling silver band ring. Simple yet elegant, suitable for stacking or as a standalone piece.',
    material: '925 Sterling Silver',
    dimensions: 'Band width: 3mm',
    weight: '3.0g',
    price: 45.00,
    currency: 'AZN',
    category: 'Rings',
    imageUrl: '/images/classic-ring.jpg',
    images: ['/images/classic-ring.jpg'],
    isNewArrival: true,
    isBestSeller: false,
  },
  {
    id: 'silver_necklace_geometric',
    name: 'Geometric Cube Necklace',
    description: 'A modern sterling silver necklace featuring a minimalist geometric cube pendant. A statement piece for contemporary style.',
    material: '925 Sterling Silver',
    dimensions: 'Chain length: 50cm, Pendant: 8mm cube',
    weight: '6.0g',
    price: 95.00,
    currency: 'AZN',
    category: 'Necklaces',
    imageUrl: '/images/geometric-necklace.jpg',
    images: ['/images/geometric-necklace.jpg'],
    isNewArrival: false,
    isBestSeller: false,
  },
  {
    id: 'silver_bracelet_beaded',
    name: 'Delicate Beaded Bracelet',
    description: 'A subtle sterling silver bracelet adorned with tiny, polished silver beads. Perfect for layering or a delicate everyday look.',
    material: '925 Sterling Silver',
    dimensions: 'Length: 18cm (adjustable)',
    weight: '4.5g',
    price: 60.00,
    currency: 'AZN',
    category: 'Bracelets',
    imageUrl: '/images/beaded-bracelet.jpg',
    images: ['/images/beaded-bracelet.jpg'],
    isNewArrival: true,
    isBestSeller: false,
  },
  {
    id: 'silver_earrings_hoops',
    name: 'Sleek Silver Hoop Earrings',
    description: 'Classic sterling silver hoop earrings, a staple for any jewelry collection. Lightweight and comfortable for all-day wear.',
    material: '925 Sterling Silver',
    dimensions: 'Diameter: 3cm',
    weight: '5.0g (pair)',
    price: 55.00,
    currency: 'AZN',
    category: 'Earrings',
    imageUrl: '/images/hoop-earrings.jpg',
    images: ['/images/hoop-earrings.jpg'],
    isNewArrival: false,
    isBestSeller: false,
  }
];

// Helper to simulate fetching product details for a given ID
export const getProductById = (id) => products.find(p => p.id === id);

// Helper to get products by category
export const getProductsByCategory = (category) => products.filter(p => p.category === category);

// Helper to get best sellers
export const getBestSellers = (limit = 4) => products.filter(p => p.isBestSeller).slice(0, limit);

// Helper to get new arrivals
export const getNewArrivals = (limit = 4) => products.filter(p => p.isNewArrival).slice(0, limit);

// Helper to get related products (simple example, could be more complex)
export const getRelatedProducts = (currentProductId, category, limit = 4) => {
  return products
    .filter(p => p.category === category && p.id !== currentProductId)
    .slice(0, limit);
};
