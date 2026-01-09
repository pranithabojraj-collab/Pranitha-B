# AgroConnect Backend API

Professional Node.js/Express backend for the AgroConnect agricultural marketplace platform.

## 🚀 Features

- ✅ **RESTful API** - Clean and well-structured endpoints
- ✅ **JWT Authentication** - Secure user authentication
- ✅ **Role-Based Access** - Farmer and Buyer user types
- ✅ **MongoDB Database** - Flexible NoSQL database
- ✅ **Input Validation** - Request validation with express-validator
- ✅ **Security** - Helmet, CORS, and rate limiting
- ✅ **Error Handling** - Centralized error handling

## 📁 Project Structure

```
backend/
├── models/
│   ├── User.js          # User model (Farmer/Buyer)
│   ├── Product.js       # Crop/Product listings
│   └── Order.js         # Order management
├── routes/
│   ├── auth.js          # Authentication routes
│   ├── users.js         # User profile routes
│   ├── products.js      # Product CRUD routes
│   ├── orders.js        # Order management routes
│   └── dashboard.js     # Dashboard statistics
├── middleware/
│   └── auth.js          # JWT verification middleware
├── .env.example         # Environment variables template
├── .gitignore           # Git ignore file
├── package.json         # Dependencies
├── server.js            # Express server setup
└── README.md            # This file
```

## 🛠️ Installation

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Steps

1. **Install dependencies**
```bash
cd backend
npm install
```

2. **Setup environment variables**
```bash
# Copy the example env file
copy .env.example .env

# Edit .env and update the values
```

3. **Configure MongoDB**
- For local MongoDB: `mongodb://localhost:27017/agroconnect`
- For MongoDB Atlas: Get your connection string from Atlas

4. **Start the server**
```bash
# Development mode (with auto-reload)
npm run dev

# Production mode
npm start
```

The server will start at `http://localhost:5000`

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (Protected)

### Users
- `GET /api/users/profile` - Get user profile (Protected)
- `PUT /api/users/profile` - Update profile (Protected)

### Products
- `GET /api/products` - Get all products (Public)
- `GET /api/products/:id` - Get single product (Public)
- `POST /api/products` - Create product (Farmer only)
- `PUT /api/products/:id` - Update product (Farmer only)
- `DELETE /api/products/:id` - Delete product (Farmer only)

### Orders
- `POST /api/orders` - Create order (Buyer only)
- `GET /api/orders` - Get user's orders (Protected)
- `GET /api/orders/:id` - Get single order (Protected)
- `PUT /api/orders/:id/status` - Update order status (Farmer only)
- `PUT /api/orders/:id/cancel` - Cancel order (Protected)

### Dashboard
- `GET /api/dashboard/stats` - Get dashboard statistics (Protected)
- `GET /api/dashboard/recent-activity` - Get recent activity (Protected)

## 🔐 Authentication

The API uses JWT (JSON Web Tokens) for authentication.

### Register Example
```json
POST /api/auth/register
{
  "name": "Rajesh Kumar",
  "email": "rajesh@example.com",
  "phone": "9876543210",
  "password": "password123",
  "userType": "farmer",
  "farmDetails": {
    "farmName": "Kumar Farms",
    "farmSize": 5,
    "location": {
      "city": "Nashik",
      "state": "Maharashtra"
    }
  }
}
```

### Login Example
```json
POST /api/auth/login
{
  "email": "rajesh@example.com",
  "password": "password123",
  "userType": "farmer"
}
```

Response:
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "...",
    "name": "Rajesh Kumar",
    "email": "rajesh@example.com",
    "userType": "farmer"
  }
}
```

### Using the Token
Add the token to the Authorization header:
```
Authorization: Bearer YOUR_TOKEN_HERE
```

## 🗄️ Database Models

### User
- name, email, phone, password
- userType: farmer | buyer | admin
- farmDetails (for farmers)
- buyerDetails (for buyers)

### Product
- farmer (reference to User)
- name, category, description
- price, unit, quantity
- quality, isOrganic
- location, status

### Order
- buyer, farmer, product (references)
- quantity, price, totalAmount
- deliveryAddress
- status (pending → delivered)
- payment information

## 🧪 Testing the API

You can test the API using:
- **Postman** - Import the endpoints
- **Thunder Client** (VS Code extension)
- **curl** commands

### Example curl
```bash
# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@test.com","phone":"1234567890","password":"test123","userType":"farmer"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"test123"}'

# Get products
curl http://localhost:5000/api/products
```

## 🔒 Security Features

- **Helmet** - Security headers
- **CORS** - Cross-origin resource sharing
- **Rate Limiting** - Prevent abuse (100 requests/15 min)
- **Password Hashing** - bcrypt encryption
- **JWT Tokens** - Secure authentication
- **Input Validation** - express-validator

## 📝 Environment Variables

```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/agroconnect
JWT_SECRET=your-secret-key
JWT_EXPIRE=7d
CLIENT_URL=http://localhost:3000
```

## 🚀 Deployment

### Deploy to Heroku
```bash
heroku create agroconnect-api
heroku config:set NODE_ENV=production
heroku config:set MONGODB_URI=your-atlas-uri
heroku config:set JWT_SECRET=your-secret
git push heroku main
```

### Deploy to Render/Railway
- Connect your GitHub repository
- Set environment variables
- Deploy automatically

## 📚 Dependencies

- **express** - Web framework
- **mongoose** - MongoDB ODM
- **bcryptjs** - Password hashing
- **jsonwebtoken** - JWT authentication
- **express-validator** - Input validation
- **cors** - CORS support
- **helmet** - Security headers
- **morgan** - HTTP logging
- **dotenv** - Environment variables

## 👨‍💻 Development

```bash
# Install nodemon for auto-restart
npm install -g nodemon

# Run in development mode
npm run dev
```

## 📄 License

MIT License - feel free to use for your projects!

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

**Made with ❤️ for farmers and agricultural communities**
