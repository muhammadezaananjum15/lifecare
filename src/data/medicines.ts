export interface Medicine {
  id: number;
  name: string;
  category: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  inStock: boolean;
  requiresPrescription: boolean;
  manufacturer: string;
  dosage: string;
  unit: string;
  rating: number;
  reviews: number;
  tags: string[];
}

export const medicines: Medicine[] = [
  {
    id: 1,
    name: 'Amoxicillin 500mg',
    category: 'Antibiotics',
    description: 'Broad-spectrum antibiotic used to treat bacterial infections including respiratory, urinary tract, and skin infections.',
    price: 180,
    originalPrice: 220,
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&q=80',
    inStock: true,
    requiresPrescription: true,
    manufacturer: 'GSK Pakistan',
    dosage: '500mg',
    unit: 'Per Strip (10 Tabs)',
    rating: 4.7,
    reviews: 128,
    tags: ['Antibiotic', 'Prescription Required']
  },
  {
    id: 2,
    name: 'Paracetamol 500mg',
    category: 'Pain Relief',
    description: 'Effective pain reliever and fever reducer for headaches, muscle aches, arthritis, toothaches, and cold symptoms.',
    price: 45,
    image: 'https://images.unsplash.com/photo-1626716493137-b67fe9501e76?w=400&q=80',
    inStock: true,
    requiresPrescription: false,
    manufacturer: 'Reckitt Pakistan',
    dosage: '500mg',
    unit: 'Per Strip (10 Tabs)',
    rating: 4.9,
    reviews: 856,
    tags: ['OTC', 'Pain Relief', 'Fever']
  },
  {
    id: 3,
    name: 'Omeprazole 20mg',
    category: 'Gastroenterology',
    description: 'Proton pump inhibitor used to treat acid reflux, GERD, and stomach ulcers. Provides lasting acid relief.',
    price: 290,
    originalPrice: 340,
    image: 'https://images.unsplash.com/photo-1550572017-edd951b55104?w=400&q=80',
    inStock: true,
    requiresPrescription: false,
    manufacturer: 'AstraZeneca',
    dosage: '20mg',
    unit: 'Per Box (14 Caps)',
    rating: 4.6,
    reviews: 342,
    tags: ['Acid Reflux', 'GERD']
  },
  {
    id: 4,
    name: 'Metformin 850mg',
    category: 'Diabetes',
    description: 'First-line medication for type 2 diabetes. Helps control blood sugar levels by improving insulin sensitivity.',
    price: 320,
    image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=400&q=80',
    inStock: true,
    requiresPrescription: true,
    manufacturer: 'Sanofi Pakistan',
    dosage: '850mg',
    unit: 'Per Strip (10 Tabs)',
    rating: 4.5,
    reviews: 219,
    tags: ['Diabetes', 'Prescription Required']
  },
  {
    id: 5,
    name: 'Vitamin D3 1000IU',
    category: 'Vitamins & Supplements',
    description: 'Essential vitamin D3 supplement to support bone health, immune function, and overall well-being.',
    price: 450,
    originalPrice: 550,
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&q=80',
    inStock: true,
    requiresPrescription: false,
    manufacturer: 'Abbott Pakistan',
    dosage: '1000IU',
    unit: 'Per Bottle (60 Caps)',
    rating: 4.8,
    reviews: 634,
    tags: ['Vitamin', 'OTC', 'Bone Health']
  },
  {
    id: 6,
    name: 'Atorvastatin 20mg',
    category: 'Cardiovascular',
    description: 'Statin medication used to lower cholesterol and reduce the risk of heart disease, heart attacks, and strokes.',
    price: 520,
    image: 'https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?w=400&q=80',
    inStock: false,
    requiresPrescription: true,
    manufacturer: 'Pfizer Pakistan',
    dosage: '20mg',
    unit: 'Per Strip (10 Tabs)',
    rating: 4.7,
    reviews: 287,
    tags: ['Cholesterol', 'Prescription Required']
  },
  {
    id: 7,
    name: 'Cetirizine 10mg',
    category: 'Allergy',
    description: 'Antihistamine that provides relief from allergy symptoms including runny nose, sneezing, itchy eyes, and hives.',
    price: 95,
    originalPrice: 120,
    image: 'https://images.unsplash.com/photo-1576602976047-174e57a47881?w=400&q=80',
    inStock: true,
    requiresPrescription: false,
    manufacturer: 'UCB Pharma',
    dosage: '10mg',
    unit: 'Per Strip (10 Tabs)',
    rating: 4.6,
    reviews: 445,
    tags: ['Allergy', 'OTC', 'Antihistamine']
  },
  {
    id: 8,
    name: 'Omega-3 Fish Oil 1000mg',
    category: 'Vitamins & Supplements',
    description: 'High-quality fish oil rich in EPA and DHA omega-3 fatty acids for heart, brain, and joint health.',
    price: 680,
    originalPrice: 780,
    image: 'https://images.unsplash.com/photo-1619897751466-8ccdcbc2f5ff?w=400&q=80',
    inStock: true,
    requiresPrescription: false,
    manufacturer: 'Pharmatec',
    dosage: '1000mg',
    unit: 'Per Bottle (90 Softgels)',
    rating: 4.8,
    reviews: 512,
    tags: ['Supplement', 'OTC', 'Heart Health']
  },
  {
    id: 9,
    name: 'Salbutamol Inhaler',
    category: 'Respiratory',
    description: 'Bronchodilator inhaler for quick relief of bronchospasm in asthma and COPD. Fast-acting and effective.',
    price: 380,
    image: 'https://images.unsplash.com/photo-1615461066841-6116e61058f4?w=400&q=80',
    inStock: true,
    requiresPrescription: true,
    manufacturer: 'Novartis Pakistan',
    dosage: '100mcg/dose',
    unit: 'Per Inhaler (200 doses)',
    rating: 4.9,
    reviews: 198,
    tags: ['Asthma', 'Respiratory', 'Prescription Required']
  },
  {
    id: 10,
    name: 'Multivitamin Complex',
    category: 'Vitamins & Supplements',
    description: 'Complete daily multivitamin providing essential vitamins, minerals, and antioxidants for optimal health.',
    price: 890,
    originalPrice: 1050,
    image: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=400&q=80',
    inStock: true,
    requiresPrescription: false,
    manufacturer: 'Pharmatec',
    dosage: '1 tablet daily',
    unit: 'Per Bottle (60 Tabs)',
    rating: 4.7,
    reviews: 423,
    tags: ['Vitamin', 'OTC', 'Wellness']
  },
  {
    id: 11,
    name: 'Ibuprofen 400mg',
    category: 'Pain Relief',
    description: 'Non-steroidal anti-inflammatory drug (NSAID) for pain relief, fever reduction, and inflammation.',
    price: 65,
    image: 'https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?w=400&q=80',
    inStock: true,
    requiresPrescription: false,
    manufacturer: 'Reckitt Pakistan',
    dosage: '400mg',
    unit: 'Per Strip (10 Tabs)',
    rating: 4.5,
    reviews: 678,
    tags: ['OTC', 'Pain Relief', 'Anti-inflammatory']
  },
  {
    id: 12,
    name: 'Zinc + Vitamin C 500mg',
    category: 'Vitamins & Supplements',
    description: 'Immune-boosting combination of Zinc and Vitamin C to strengthen defenses and support recovery.',
    price: 320,
    originalPrice: 390,
    image: 'https://images.unsplash.com/photo-1470116945706-e6bf5d5a53ca?w=400&q=80',
    inStock: true,
    requiresPrescription: false,
    manufacturer: 'Abbott Pakistan',
    dosage: 'Zinc 10mg + Vit C 500mg',
    unit: 'Per Box (30 Effervescent Tabs)',
    rating: 4.8,
    reviews: 389,
    tags: ['Vitamin', 'OTC', 'Immunity']
  }
];

export const medicineCategories = [
  'All Categories',
  'Antibiotics',
  'Pain Relief',
  'Gastroenterology',
  'Diabetes',
  'Vitamins & Supplements',
  'Cardiovascular',
  'Allergy',
  'Respiratory',
];
