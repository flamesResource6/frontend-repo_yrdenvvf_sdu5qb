// Minimal mock data for products
export const products = [
  {
    id: 'p1',
    brand: 'Nike',
    name: 'Air Zoom Concept — Black/Volt',
    price: 249.0,
    category: 'sneakers',
    label: 'New',
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200&auto=format&fit=crop'
    ],
    colors: ['black', 'volt'],
    sizes: ['40', '41', '42', '43', '44']
  },
  {
    id: 'p2',
    brand: 'adidas',
    name: 'Response Archive — Cream',
    price: 189.0,
    category: 'sneakers',
    label: 'Limited',
    images: [
      'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1200&auto=format&fit=crop'
    ],
    colors: ['cream'],
    sizes: ['39', '40', '41', '42']
  },
  {
    id: 'p3',
    brand: 'New Balance',
    name: '990v Pre-Release — Grey',
    price: 219.0,
    category: 'sneakers',
    label: 'Online Exclusive',
    images: [
      'https://images.unsplash.com/photo-1526401281623-3593f14b251f?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1526178617596-4bc4b5704b51?q=80&w=1200&auto=format&fit=crop'
    ],
    colors: ['grey'],
    sizes: ['40', '41', '42', '43']
  },
  {
    id: 'p4',
    brand: 'Salomon',
    name: 'XT-Concept — Glacier',
    price: 199.0,
    category: 'sneakers',
    images: [
      'https://images.unsplash.com/photo-1605408499391-6368c628ef42?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200&auto=format&fit=crop'
    ],
    colors: ['white'],
    sizes: ['41', '42', '43']
  },
  {
    id: 'p5',
    brand: 'A-COLD-WALL*',
    name: 'Concept Hoodie — Charcoal',
    price: 289.0,
    category: 'clothing',
    label: 'Limited',
    images: [
      'https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=1200&auto=format&fit=crop'
    ],
    colors: ['charcoal'],
    sizes: ['S', 'M', 'L', 'XL']
  },
  {
    id: 'p6',
    brand: 'Stone Island',
    name: 'Shadow Project Vest',
    price: 359.0,
    category: 'clothing',
    images: [
      'https://images.unsplash.com/photo-1520975682031-b48b6a0f2c00?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1542060748-10c28b62716d?q=80&w=1200&auto=format&fit=crop'
    ],
    colors: ['black'],
    sizes: ['S', 'M', 'L']
  },
  {
    id: 'p7',
    brand: 'Nike',
    name: 'ACG Beanie — Black',
    price: 39.0,
    category: 'accessories',
    images: [
      'https://images.unsplash.com/photo-1585247226801-bc613c1o?ixlib=rb-4.0.3&q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=1200&auto=format&fit=crop'
    ],
    colors: ['black'],
    sizes: ['One Size']
  },
  {
    id: 'p8',
    brand: 'Carhartt WIP',
    name: 'Essential Tote — Natural',
    price: 29.0,
    category: 'accessories',
    images: [
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1560841651-04b3c9e9d8b5?q=80&w=1200&auto=format&fit=crop'
    ],
    colors: ['natural'],
    sizes: ['One Size']
  }
];

export const categories = [
  { key: 'sneakers', label: 'Sneakers' },
  { key: 'clothing', label: 'Clothing' },
  { key: 'accessories', label: 'Accessories' }
];
