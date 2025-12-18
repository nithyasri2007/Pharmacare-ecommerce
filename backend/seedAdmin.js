const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const createAdmin = async () => {
  try {
    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: 'admin@pharmacare.com' });
    
    if (existingAdmin) {
      console.log('Admin user already exists!');
      console.log('Email: admin@pharmacare.com');
      process.exit();
    }

    // Create admin user
    const admin = new User({
      name: 'PharmaCare Admin',
      email: 'admin@pharmacare.com',
      password: 'admin123',
      phone: '+1234567890',
      role: 'admin',
      isVerified: true
    });

    await admin.save();
    
    console.log('✅ Admin user created successfully!');
    console.log('Email: admin@pharmacare.com');
    console.log('Password: admin123');
    console.log('\nPlease change the password after first login!');
    
    process.exit();
  } catch (error) {
    console.error('Error creating admin:', error);
    process.exit(1);
  }
};

createAdmin();