# PharmCare - Online Pharmacy E-commerce Platform

A full-stack MERN (MongoDB, Express.js, React.js, Node.js) e-commerce application for an online pharmacy.

## Features

### Customer Features
- 🏠 Modern homepage with featured products and categories
- 🔍 Product browsing with search and filtering
- 🛒 Shopping cart functionality
- 👤 User authentication (login/register)
- 📋 Order management and history
- 💊 Prescription upload for prescription-only medicines
- 💳 Secure checkout process
- 📱 Responsive design for all devices

### Admin Features
- 📊 Admin dashboard with analytics
- 📦 Product management (CRUD operations)
- 🏷️ Category management
- 📋 Order management and status updates
- 💊 Prescription verification
- 👥 User management

### Security Features
- 🔐 JWT authentication
- 🛡️ Password hashing with bcrypt
- 🚦 Rate limiting
- 🔒 Input validation and sanitization
- 🛡️ Security headers with Helmet

## Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **Multer** - File upload handling
- **Bcrypt** - Password hashing

### Frontend
- **React.js** - UI library
- **Redux Toolkit** - State management
- **React Router** - Navigation
- **Axios** - HTTP client
- **React Toastify** - Notifications
- **React Icons** - Icon library

## Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Backend Setup
1. Navigate to the project root directory
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file and configure:
   ```
   MONGODB_URI=mongodb://localhost:27017/pharmcare
   JWT_SECRET=your_jwt_secret_key_here
   STRIPE_SECRET_KEY=your_stripe_secret_key
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_email_password
   NODE_ENV=development
   ```
4. Start the backend server:
   ```bash
   npm run server
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the React development server:
   ```bash
   npm start
   ```

### Run Both Frontend and Backend
From the root directory:
```bash
npm run dev
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile

### Products
- `GET /api/products` - Get all products (with filtering)
- `GET /api/products/:id` - Get single product
- `GET /api/products/categories/all` - Get all categories

### Orders
- `POST /api/orders` - Create new order
- `GET /api/orders/myorders` - Get user orders
- `GET /api/orders/:id` - Get order by ID

### Cart
- `GET /api/cart` - Get user cart
- `POST /api/cart/add` - Add item to cart
- `PUT /api/cart/update` - Update cart item
- `DELETE /api/cart/remove/:productId` - Remove item from cart

### Prescriptions
- `POST /api/prescriptions/upload` - Upload prescription
- `GET /api/prescriptions/my` - Get user prescriptions
- `GET /api/prescriptions/all` - Get all prescriptions (admin)
- `PUT /api/prescriptions/verify/:id` - Verify prescription (admin)

### Admin
- `GET /api/admin/stats` - Dashboard statistics
- `POST /api/admin/products` - Create product
- `PUT /api/admin/products/:id` - Update product
- `DELETE /api/admin/products/:id` - Delete product
- `GET /api/admin/orders` - Get all orders
- `PUT /api/admin/orders/:id/status` - Update order status

## Database Schema

### User Model
- name, email, password, phone
- role (customer, admin, pharmacist)
- addresses array
- verification status

### Product Model
- name, description, price, category
- brand, images, stock
- prescription requirement
- pharmaceutical details (dosage, ingredients, etc.)

### Order Model
- user reference, order items
- shipping address, payment method
- order status, payment status

### Prescription Model
- user reference, prescription image
- doctor and patient information
- verification status and notes

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License.

## Support

For support, email support@pharmcare.com or create an issue in the repository.