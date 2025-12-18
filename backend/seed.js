const mongoose = require('mongoose');
const Category = require('./models/Category');
const Product = require('./models/Product');
require('dotenv').config({ path: '../.env' });

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const categories = [
  { name: 'Medicines', description: 'Prescription and OTC medicines', isActive: true },
  { name: 'Supplements', description: 'Health supplements and vitamins', isActive: true },
  { name: 'Medical Equipment', description: 'Medical devices and equipment', isActive: true },
  { name: 'Personal Care', description: 'Personal care products', isActive: true },
  { name: 'Baby Care', description: 'Baby care products', isActive: true }
];

const seedData = async () => {
  try {
    await Category.deleteMany({});
    await Product.deleteMany({});

    const createdCategories = await Category.insertMany(categories);
    console.log('Categories added!');

    const products = [
      {
        name: 'Paracetamol 500mg',
        description: 'Pain relief and fever reducer. Effective for headaches, muscle aches, and cold symptoms.',
        price: 89,
        category: createdCategories[0]._id,
        brand: 'HealthCare Plus',
        images: ['https://via.placeholder.com/300x300?text=Paracetamol'],
        stock: 100,
        prescriptionRequired: false,
        dosage: '500mg, Take 1-2 tablets every 4-6 hours',
        activeIngredients: ['Paracetamol 500mg'],
        sideEffects: ['Nausea', 'Allergic reactions (rare)'],
        warnings: ['Do not exceed 8 tablets in 24 hours', 'Consult doctor if pregnant'],
        manufacturer: 'PharmaCorp Ltd',
        isActive: true
      },
      {
        name: 'Amoxicillin 250mg',
        description: 'Antibiotic for bacterial infections. Treats respiratory, ear, and urinary tract infections.',
        price: 299,
        category: createdCategories[0]._id,
        brand: 'MediCure',
        images: ['https://via.placeholder.com/300x300?text=Amoxicillin'],
        stock: 50,
        prescriptionRequired: true,
        dosage: '250mg, Take 3 times daily for 7 days',
        activeIngredients: ['Amoxicillin 250mg'],
        sideEffects: ['Diarrhea', 'Nausea', 'Skin rash'],
        warnings: ['Complete full course', 'Inform doctor of allergies'],
        manufacturer: 'BioPharm Industries',
        isActive: true
      },
      {
        name: 'Vitamin D3 1000 IU',
        description: 'Essential vitamin for bone health and immune system support.',
        price: 199,
        category: createdCategories[1]._id,
        brand: 'VitaLife',
        images: ['https://via.placeholder.com/300x300?text=Vitamin+D3'],
        stock: 200,
        prescriptionRequired: false,
        dosage: '1000 IU, Take 1 capsule daily',
        activeIngredients: ['Cholecalciferol 1000 IU'],
        sideEffects: ['Rare: Nausea, constipation'],
        warnings: ['Do not exceed recommended dose'],
        manufacturer: 'NutriHealth Co',
        isActive: true
      },
      {
        name: 'Omega-3 Fish Oil',
        description: 'Heart health supplement with EPA and DHA. Supports cardiovascular and brain health.',
        price: 449,
        category: createdCategories[1]._id,
        brand: 'OceanPure',
        images: ['https://via.placeholder.com/300x300?text=Omega+3'],
        stock: 150,
        prescriptionRequired: false,
        dosage: 'Take 2 capsules daily with meals',
        activeIngredients: ['EPA 180mg', 'DHA 120mg'],
        sideEffects: ['Fishy aftertaste', 'Mild digestive upset'],
        warnings: ['Consult doctor if on blood thinners'],
        manufacturer: 'Marine Wellness Ltd',
        isActive: true
      },
      {
        name: 'Digital Thermometer',
        description: 'Fast and accurate digital thermometer. Oral, rectal, and underarm use.',
        price: 249,
        category: createdCategories[2]._id,
        brand: 'MediTech',
        images: ['https://via.placeholder.com/300x300?text=Thermometer'],
        stock: 75,
        prescriptionRequired: false,
        manufacturer: 'MediTech Devices',
        isActive: true
      },
      {
        name: 'Blood Pressure Monitor',
        description: 'Automatic digital blood pressure monitor with large display and memory function.',
        price: 3999,
        category: createdCategories[2]._id,
        brand: 'CarePlus',
        images: ['https://via.placeholder.com/300x300?text=BP+Monitor'],
        stock: 30,
        prescriptionRequired: false,
        manufacturer: 'CarePlus Medical',
        isActive: true
      },
      {
        name: 'Hand Sanitizer 500ml',
        description: '70% alcohol-based hand sanitizer. Kills 99.9% of germs.',
        price: 149,
        category: createdCategories[3]._id,
        brand: 'CleanHands',
        images: ['https://via.placeholder.com/300x300?text=Sanitizer'],
        stock: 300,
        prescriptionRequired: false,
        manufacturer: 'HygieneFirst Inc',
        isActive: true
      },
      {
        name: 'Face Masks (Pack of 50)',
        description: '3-ply disposable face masks. Comfortable and breathable.',
        price: 349,
        category: createdCategories[3]._id,
        brand: 'SafeGuard',
        images: ['https://via.placeholder.com/300x300?text=Face+Masks'],
        stock: 500,
        prescriptionRequired: false,
        manufacturer: 'ProtectAll Ltd',
        isActive: true
      },
      {
        name: 'Ibuprofen 400mg',
        description: 'Anti-inflammatory pain reliever. Effective for pain, fever, and inflammation.',
        price: 129,
        category: createdCategories[0]._id,
        brand: 'PainRelief Pro',
        images: ['https://via.placeholder.com/300x300?text=Ibuprofen'],
        stock: 120,
        prescriptionRequired: false,
        dosage: '400mg, Take 1 tablet every 6-8 hours',
        activeIngredients: ['Ibuprofen 400mg'],
        sideEffects: ['Stomach upset', 'Heartburn', 'Dizziness'],
        warnings: ['Take with food', 'Avoid if stomach ulcers'],
        manufacturer: 'PharmaCorp Ltd',
        isActive: true
      },
      {
        name: 'Multivitamin Complex',
        description: 'Complete daily multivitamin with essential vitamins and minerals.',
        price: 499,
        category: createdCategories[1]._id,
        brand: 'VitaLife',
        images: ['https://via.placeholder.com/300x300?text=Multivitamin'],
        stock: 180,
        prescriptionRequired: false,
        dosage: 'Take 1 tablet daily with breakfast',
        activeIngredients: ['Vitamin A, C, D, E, B-Complex, Zinc, Magnesium'],
        sideEffects: ['Rare: Nausea if taken on empty stomach'],
        warnings: ['Do not exceed recommended dose'],
        manufacturer: 'NutriHealth Co',
        isActive: true
      },
      {
        name: 'Cough Syrup 100ml',
        description: 'Relieves cough and soothes throat. Non-drowsy formula.',
        price: 179,
        category: createdCategories[0]._id,
        brand: 'CoughCare',
        images: ['https://via.placeholder.com/300x300?text=Cough+Syrup'],
        stock: 90,
        prescriptionRequired: false,
        dosage: '10ml, Take 3 times daily',
        activeIngredients: ['Dextromethorphan 15mg/5ml'],
        sideEffects: ['Drowsiness', 'Dizziness'],
        warnings: ['Not for children under 6'],
        manufacturer: 'RespiCare Pharma',
        isActive: true
      },
      {
        name: 'Insulin Syringes (Pack of 10)',
        description: 'Sterile insulin syringes with ultra-fine needles.',
        price: 399,
        category: createdCategories[2]._id,
        brand: 'DiabCare',
        images: ['https://via.placeholder.com/300x300?text=Syringes'],
        stock: 60,
        prescriptionRequired: true,
        manufacturer: 'MediTech Devices',
        isActive: true
      },
      {
        name: 'Baby Diaper Rash Cream',
        description: 'Soothes and protects baby skin. Zinc oxide formula.',
        price: 229,
        category: createdCategories[4]._id,
        brand: 'BabySoft',
        images: ['https://via.placeholder.com/300x300?text=Diaper+Cream'],
        stock: 100,
        prescriptionRequired: false,
        manufacturer: 'BabyCare Products',
        isActive: true
      },
      {
        name: 'Probiotic Capsules',
        description: 'Digestive health support with 10 billion CFU. Promotes gut health.',
        price: 699,
        category: createdCategories[1]._id,
        brand: 'GutHealth',
        images: ['https://th.bing.com/th/id/OIP.ADNjS1e69QgFuAZDAVkiKwHaHa?w=172&h=180&c=7&r=0&o=7&cb=ucfimg2&dpr=1.3&pid=1.7&rm=3&ucfimg=1'],
        stock: 85,
        prescriptionRequired: false,
        dosage: 'Take 1 capsule daily',
        activeIngredients: ['Lactobacillus acidophilus', 'Bifidobacterium'],
        sideEffects: ['Mild bloating initially'],
        warnings: ['Keep refrigerated'],
        manufacturer: 'BioBalance Ltd',
        isActive: true
      },
      {
        name: 'First Aid Kit',
        description: 'Complete first aid kit with bandages, antiseptic, and medical supplies.',
        price: 999,
        category: createdCategories[2]._id,
        brand: 'EmergencyCare',
        images: ['https://via.placeholder.com/300x300?text=First+Aid'],
        stock: 45,
        prescriptionRequired: false,
        manufacturer: 'SafetyFirst Medical',
        isActive: true
      }
    ];

    await Product.insertMany(products);
    console.log('Products added successfully!');
    console.log(`Added ${products.length} products across ${categories.length} categories`);
    
    process.exit();
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedData();