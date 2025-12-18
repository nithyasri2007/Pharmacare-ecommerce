# PharmCare - Quick Start Guide

## 🚀 Getting Started

### Prerequisites
- Node.js (v14+)
- MongoDB (running on localhost:27017)
- npm or yarn

### Installation Steps

#### 1. Install Backend Dependencies
```bash
npm install
```

#### 2. Install Frontend Dependencies
```bash
cd frontend
npm install
cd ..
```

#### 3. Configure Environment Variables
The `.env` file is already created. Update if needed:
```
MONGODB_URI=mongodb://localhost:27017/pharmacy-ecommerce-mern
JWT_SECRET=your_jwt_secret_key_here
STRIPE_SECRET_KEY=your_stripe_secret_key
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_password
NODE_ENV=development
```

#### 4. Start MongoDB
Make sure MongoDB is running on your system.

#### 5. Run the Application

**Option A: Run both servers concurrently**
```bash
npm run dev
```

**Option B: Run separately**

Terminal 1 (Backend):
```bash
npm run server
```

Terminal 2 (Frontend):
```bash
cd frontend
npm start
```

### 🌐 Access the Application

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:5001

---

## 👤 Test Accounts

### Create Admin Account
1. Register a new user at http://localhost:3000/register
2. Manually update the user role in MongoDB:
```javascript
db.users.updateOne(
  { email: "admin@pharmcare.com" },
  { $set: { role: "admin" } }
)
```

---

## 📝 Sample Data

### Add Sample Categories
Use MongoDB or the admin panel to add categories:
```javascript
db.categories.insertMany([
  { name: "Medicines", description: "Prescription and OTC medicines", isActive: true },
  { name: "Supplements", description: "Health supplements and vitamins", isActive: true },
  { name: "Medical Equipment", description: "Medical devices and equipment", isActive: true },
  { name: "Personal Care", description: "Personal care products", isActive: true }
])
```

### Add Sample Products
Use the admin dashboard at http://localhost:3000/admin/products

---

## 🔑 Key Features to Test

### Customer Flow:
1. ✅ Register/Login
2. ✅ Browse products with filters
3. ✅ View product details
4. ✅ Add products to cart
5. ✅ Upload prescription (for prescription medicines)
6. ✅ Checkout and place order
7. ✅ View order history
8. ✅ Manage profile and addresses

### Admin Flow:
1. ✅ Access admin dashboard
2. ✅ Add/Edit/Delete products
3. ✅ Manage categories
4. ✅ View and update order status
5. ✅ Verify prescriptions
6. ✅ Create coupons
7. ✅ View statistics

---

## 🛠️ Troubleshooting

### Port Already in Use
If port 5001 is in use, change it in:
- `backend/server.js` (line 49)
- `frontend/package.json` (proxy setting)

### MongoDB Connection Error
- Ensure MongoDB is running
- Check the connection string in `.env`

### Email Not Sending
- Update EMAIL_USER and EMAIL_PASS in `.env`
- For Gmail, enable "Less secure app access" or use App Password

### CORS Issues
- Backend already configured for CORS
- Frontend proxy is set to http://localhost:5001

---

## 📚 API Documentation

### Authentication
- POST `/api/auth/register` - Register user
- POST `/api/auth/login` - Login user
- GET `/api/auth/profile` - Get profile (protected)

### Products
- GET `/api/products` - Get all products (with filters)
- GET `/api/products/:id` - Get single product
- GET `/api/products/categories/all` - Get categories

### Orders
- POST `/api/orders` - Create order (protected)
- GET `/api/orders/myorders` - Get user orders (protected)
- GET `/api/orders/:id` - Get order details (protected)

### Cart
- GET `/api/cart` - Get cart (protected)
- POST `/api/cart/add` - Add to cart (protected)
- PUT `/api/cart/update` - Update cart (protected)
- DELETE `/api/cart/remove/:productId` - Remove from cart (protected)

### Prescriptions
- POST `/api/prescriptions/upload` - Upload prescription (protected)
- GET `/api/prescriptions/my` - Get user prescriptions (protected)
- GET `/api/prescriptions/all` - Get all prescriptions (admin)
- PUT `/api/prescriptions/verify/:id` - Verify prescription (admin)

### Admin
- GET `/api/admin/stats` - Dashboard stats (admin)
- POST `/api/admin/products` - Create product (admin)
- PUT `/api/admin/products/:id` - Update product (admin)
- DELETE `/api/admin/products/:id` - Delete product (admin)
- GET `/api/admin/orders` - Get all orders (admin)
- PUT `/api/admin/orders/:id/status` - Update order status (admin)

### Reviews
- POST `/api/reviews` - Add review (protected)
- GET `/api/reviews/product/:productId` - Get product reviews

### Coupons
- POST `/api/coupons/apply` - Apply coupon (protected)
- POST `/api/coupons` - Create coupon (admin)
- GET `/api/coupons` - Get all coupons (admin)

### Payment
- POST `/api/payment/create-payment-intent` - Create payment (protected)

---

## 🎯 Project Structure

```
pharmacy-ecommerce-mern/
├── backend/
│   ├── config/          # Email, Stripe configuration
│   ├── controllers/     # Route controllers
│   ├── middleware/      # Auth middleware
│   ├── models/          # MongoDB models
│   ├── routes/          # API routes
│   ├── uploads/         # File uploads
│   └── server.js        # Express server
├── frontend/
│   ├── public/
│   └── src/
│       ├── components/  # React components
│       ├── pages/       # Page components
│       ├── store/       # Redux store
│       ├── App.js
│       └── App.css
├── .env                 # Environment variables
├── package.json
├── README.md
├── FEATURES.md          # Feature checklist
└── QUICKSTART.md        # This file
```

---

## 💡 Tips

1. **Development Mode:** Both servers have hot-reload enabled
2. **Database:** Use MongoDB Compass for easy database management
3. **Testing API:** Use Postman or Thunder Client
4. **Debugging:** Check browser console and terminal logs
5. **File Uploads:** Prescription files are stored in `backend/uploads/prescriptions/`

---

## 🆘 Support

For issues or questions:
1. Check the console logs (browser and terminal)
2. Verify all dependencies are installed
3. Ensure MongoDB is running
4. Check the `.env` configuration
5. Review the API documentation above

---

## ✨ Features Implemented

See `FEATURES.md` for a complete list of 100+ implemented features!

Happy Coding! 🚀