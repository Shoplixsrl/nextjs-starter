import { db } from './index';
import {
  users,
  customers,
  products,
  materials,
  suppliers,
  billOfMaterials,
  productionPhases,
  orders,
  orderItems,
  productionOrders,
  productionTracking
} from './schema';

async function seed() {
  console.log('🌱 Seeding database...');

  // 1. Insert Production Phases (6 phases for umbrella manufacturing)
  console.log('📦 Creating production phases...');
  await db.insert(productionPhases).values([
    {
      name: 'Stampa Personalizzata',
      orderNumber: 1,
      description: 'Stampa digitale o serigrafica su tessuto',
      estimatedDuration: 4,
    },
    {
      name: 'Taglio e Cucitura Tessuto',
      orderNumber: 2,
      description: 'Taglio pannelli e cucitura elementi',
      estimatedDuration: 6,
    },
    {
      name: 'Preparazione Componenti Telaio',
      orderNumber: 3,
      description: 'Preparazione stecche, leva e corona',
      estimatedDuration: 3,
    },
    {
      name: 'Assemblaggio Telaio',
      orderNumber: 4,
      description: 'Assemblaggio stecche con viti e bulloni',
      estimatedDuration: 5,
    },
    {
      name: 'Assemblaggio Finale',
      orderNumber: 5,
      description: 'Montaggio tessuto su telaio e palo',
      estimatedDuration: 4,
    },
    {
      name: 'Controllo Qualità e Packaging',
      orderNumber: 6,
      description: 'Ispezione finale e confezionamento',
      estimatedDuration: 2,
    },
  ]);

  // 2. Insert Users
  console.log('👥 Creating users...');
  await db.insert(users).values([
    {
      email: 'admin@umbrellamanager.it',
      name: 'Marco Rossi',
      role: 'admin',
      password: '$2a$10$XYZ...', // In production, use proper hashing
    },
    {
      email: 'production@umbrellamanager.it',
      name: 'Giovanni Bianchi',
      role: 'production',
      password: '$2a$10$XYZ...',
    },
    {
      email: 'sales@umbrellamanager.it',
      name: 'Laura Verdi',
      role: 'sales',
      password: '$2a$10$XYZ...',
    },
    {
      email: 'quality@umbrellamanager.it',
      name: 'Paolo Neri',
      role: 'quality',
      password: '$2a$10$XYZ...',
    },
  ]);

  // 3. Insert Suppliers
  console.log('🏢 Creating suppliers...');
  await db.insert(suppliers).values([
    {
      code: 'SUP001',
      name: 'Tessuti Italiani SRL',
      email: 'info@tessuti-italiani.it',
      phone: '+39 06 1234567',
      city: 'Prato',
      country: 'Italy',
      rating: 5,
      deliveryTime: 7,
    },
    {
      code: 'SUP002',
      name: 'Telai Alluminio Roma',
      email: 'vendite@telai-roma.it',
      phone: '+39 06 7654321',
      city: 'Roma',
      country: 'Italy',
      rating: 4,
      deliveryTime: 5,
    },
    {
      code: 'SUP003',
      name: 'Componenti Legno Toscana',
      email: 'info@legno-toscana.it',
      phone: '+39 055 9876543',
      city: 'Firenze',
      country: 'Italy',
      rating: 5,
      deliveryTime: 10,
    },
  ]);

  // 4. Insert Materials
  console.log('🎨 Creating materials...');
  await db.insert(materials).values([
    // Fabrics
    {
      code: 'FAB001',
      name: 'Tessuto Acrilico Bianco',
      type: 'fabric',
      unitOfMeasure: 'metri',
      unitCost: '15.50',
      currentStock: '250',
      minStock: '50',
      supplierId: 1,
      attributes: { color: 'bianco', waterproof: true, uvProtection: 'UPF 50+' },
    },
    {
      code: 'FAB002',
      name: 'Tessuto Acrilico Beige',
      type: 'fabric',
      unitOfMeasure: 'metri',
      unitCost: '15.50',
      currentStock: '180',
      minStock: '50',
      supplierId: 1,
      attributes: { color: 'beige', waterproof: true, uvProtection: 'UPF 50+' },
    },
    {
      code: 'FAB003',
      name: 'Tessuto Acrilico Verde',
      type: 'fabric',
      unitOfMeasure: 'metri',
      unitCost: '16.00',
      currentStock: '120',
      minStock: '50',
      supplierId: 1,
      attributes: { color: 'verde', waterproof: true, uvProtection: 'UPF 50+' },
    },
    // Aluminum Frames
    {
      code: 'FRA001',
      name: 'Palo Centrale Alluminio 3m',
      type: 'frame_aluminum',
      unitOfMeasure: 'pezzi',
      unitCost: '45.00',
      currentStock: '80',
      minStock: '20',
      supplierId: 2,
      attributes: { length: '3m', diameter: '48mm', finish: 'anodizzato' },
    },
    {
      code: 'FRA002',
      name: 'Palo Laterale Alluminio 2.5m',
      type: 'frame_aluminum',
      unitOfMeasure: 'pezzi',
      unitCost: '65.00',
      currentStock: '50',
      minStock: '15',
      supplierId: 2,
      attributes: { length: '2.5m', diameter: '52mm', finish: 'verniciato' },
    },
    {
      code: 'FRA003',
      name: 'Stecche Alluminio Set 8pz',
      type: 'frame_aluminum',
      unitOfMeasure: 'set',
      unitCost: '28.00',
      currentStock: '100',
      minStock: '30',
      supplierId: 2,
      attributes: { pieces: 8, material: 'alluminio', finish: 'anodizzato' },
    },
    // Wood Frames
    {
      code: 'FRA004',
      name: 'Palo Centrale Legno 3m',
      type: 'frame_wood',
      unitOfMeasure: 'pezzi',
      unitCost: '85.00',
      currentStock: '30',
      minStock: '10',
      supplierId: 3,
      attributes: { length: '3m', wood: 'teak', finish: 'oliato' },
    },
    // Components
    {
      code: 'COM001',
      name: 'Corona Plastica Nera',
      type: 'crown',
      unitOfMeasure: 'pezzi',
      unitCost: '8.50',
      currentStock: '150',
      minStock: '40',
      supplierId: 2,
    },
    {
      code: 'COM002',
      name: 'Leva Apertura',
      type: 'lever',
      unitOfMeasure: 'pezzi',
      unitCost: '12.00',
      currentStock: '120',
      minStock: '30',
      supplierId: 2,
    },
    {
      code: 'COM003',
      name: 'Kit Viti e Bulloni',
      type: 'fasteners',
      unitOfMeasure: 'set',
      unitCost: '5.50',
      currentStock: '200',
      minStock: '50',
      supplierId: 2,
    },
    {
      code: 'COM004',
      name: 'Sistema LED Integrato',
      type: 'lighting',
      unitOfMeasure: 'pezzi',
      unitCost: '95.00',
      currentStock: '25',
      minStock: '10',
      supplierId: 2,
      attributes: { power: '12W', colorTemp: '3000K', waterproof: 'IP65' },
    },
  ]);

  // 5. Insert Products
  console.log('🏖️ Creating products...');
  await db.insert(products).values([
    {
      code: 'OMB001',
      name: 'Ombrellone Palo Centrale 3x3m',
      type: 'umbrella_central',
      description: 'Ombrellone professionale con palo centrale in alluminio, dimensione 3x3 metri',
      basePrice: '299.00',
      specifications: {
        dimensions: '3x3m',
        height: '2.5m',
        weight: '18kg',
        poleType: 'central',
        material: 'aluminum',
      },
      productionTime: 5,
    },
    {
      code: 'OMB002',
      name: 'Ombrellone Palo Laterale 3x4m',
      type: 'umbrella_lateral',
      description: 'Ombrellone di lusso con palo laterale in alluminio, dimensione 3x4 metri',
      basePrice: '599.00',
      specifications: {
        dimensions: '3x4m',
        height: '2.8m',
        weight: '32kg',
        poleType: 'lateral',
        material: 'aluminum',
        rotation: '360°',
      },
      productionTime: 7,
    },
    {
      code: 'OMB003',
      name: 'Ombrellone Legno Teak 2.5x2.5m',
      type: 'umbrella_central',
      description: 'Ombrellone artigianale premium con palo centrale in legno teak',
      basePrice: '899.00',
      specifications: {
        dimensions: '2.5x2.5m',
        height: '2.4m',
        weight: '25kg',
        poleType: 'central',
        material: 'teak',
        finish: 'oiled',
      },
      productionTime: 10,
    },
    {
      code: 'GAZ001',
      name: 'Gazebo Professionale 3x3m',
      type: 'gazebo',
      description: 'Gazebo da esterno con struttura in alluminio e telo impermeabile',
      basePrice: '1299.00',
      specifications: {
        dimensions: '3x3m',
        height: '2.8m',
        weight: '45kg',
        structure: 'aluminum',
        waterproof: true,
      },
      productionTime: 12,
    },
  ]);

  // 6. Insert Bill of Materials for first product
  console.log('📋 Creating bill of materials...');
  await db.insert(billOfMaterials).values([
    // Ombrellone Palo Centrale 3x3m (product_id: 1)
    { productId: 1, materialId: 1, quantity: '12.5', notes: 'Tessuto per copertura 3x3m' },
    { productId: 1, materialId: 4, quantity: '1', notes: 'Palo centrale 3m' },
    { productId: 1, materialId: 6, quantity: '1', notes: 'Set stecche alluminio' },
    { productId: 1, materialId: 8, quantity: '1', notes: 'Corona' },
    { productId: 1, materialId: 9, quantity: '1', notes: 'Leva apertura' },
    { productId: 1, materialId: 10, quantity: '1', notes: 'Kit viti e bulloni' },

    // Ombrellone Palo Laterale 3x4m (product_id: 2)
    { productId: 2, materialId: 2, quantity: '16', notes: 'Tessuto per copertura 3x4m' },
    { productId: 2, materialId: 5, quantity: '1', notes: 'Palo laterale 2.5m' },
    { productId: 2, materialId: 6, quantity: '1', notes: 'Set stecche alluminio' },
    { productId: 2, materialId: 8, quantity: '1', notes: 'Corona' },
    { productId: 2, materialId: 9, quantity: '1', notes: 'Leva apertura' },
    { productId: 2, materialId: 10, quantity: '1', notes: 'Kit viti e bulloni' },
    { productId: 2, materialId: 11, quantity: '1', notes: 'Sistema LED opzionale' },
  ]);

  // 7. Insert Customers
  console.log('👤 Creating customers...');
  await db.insert(customers).values([
    {
      code: 'CLI001',
      companyName: 'Hotel Mediterraneo SRL',
      email: 'acquisti@hotelmediterraneo.it',
      phone: '+39 081 1234567',
      address: 'Via Roma 123',
      city: 'Napoli',
      postalCode: '80100',
      country: 'Italy',
      vatNumber: 'IT12345678901',
      rating: 5,
      totalOrders: 15,
      totalRevenue: '45000.00',
    },
    {
      code: 'CLI002',
      companyName: 'Ristorante Il Giardino',
      email: 'info@ristoranteilgiardino.it',
      phone: '+39 06 7654321',
      address: 'Piazza del Popolo 45',
      city: 'Roma',
      postalCode: '00187',
      country: 'Italy',
      vatNumber: 'IT98765432109',
      rating: 4,
      totalOrders: 8,
      totalRevenue: '12000.00',
    },
    {
      code: 'CLI003',
      firstName: 'Maria',
      lastName: 'Ferrari',
      email: 'maria.ferrari@email.it',
      phone: '+39 338 1234567',
      address: 'Via Verdi 78',
      city: 'Milano',
      postalCode: '20100',
      country: 'Italy',
      rating: 5,
      totalOrders: 2,
      totalRevenue: '1800.00',
    },
  ]);

  // 8. Insert Sample Orders
  console.log('📦 Creating sample orders...');
  await db.insert(orders).values([
    {
      orderNumber: 'ORD-2025-001',
      customerId: 1,
      status: 'in_production',
      orderDate: '2025-01-15',
      deliveryDate: '2025-02-01',
      totalAmount: '5980.00',
      salesPersonId: 3,
    },
    {
      orderNumber: 'ORD-2025-002',
      customerId: 2,
      status: 'confirmed',
      orderDate: '2025-01-20',
      deliveryDate: '2025-02-10',
      totalAmount: '2990.00',
      salesPersonId: 3,
    },
  ]);

  console.log('✅ Database seeded successfully!');
}

// Run seed if this file is executed directly
if (require.main === module) {
  seed()
    .then(() => {
      console.log('✅ Seed completed');
      process.exit(0);
    })
    .catch((error) => {
      console.error('❌ Seed failed:', error);
      process.exit(1);
    });
}

export { seed };
