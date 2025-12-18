const mongoose = require('mongoose');
const Product = require('./models/Product');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const updateParacetamolImage = async () => {
  try {
    const result = await Product.updateOne(
      { name: 'Paracetamol 500mg' },
      { 
        $set: { 
          images: ['https://tse2.mm.bing.net/th/id/OIP.W7NNdONWEXM2_wQ8QvEhYwHaHa?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3']
        }
      }
    );
    
    if (result.modifiedCount > 0) {
      console.log('✅ Paracetamol 500mg image updated successfully!');
    } else {
      console.log('❌ Paracetamol 500mg product not found');
    }
    
    process.exit();
  } catch (error) {
    console.error('Error updating product:', error);
    process.exit(1);
  }
};

updateParacetamolImage();