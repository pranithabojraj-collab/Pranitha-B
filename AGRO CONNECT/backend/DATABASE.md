# 🗄️ AgroConnect Database Documentation

## Database Type: MongoDB (NoSQL)

MongoDB is a document-based database that stores data in JSON-like format, making it perfect for flexible data structures.

---

## 📊 Database Schema

### Collections (Tables)

The database has **3 main collections**:

1. **users** - All user accounts (farmers and buyers)
2. **products** - Crop/product listings
3. **orders** - Order transactions

---

## 👤 Users Collection

Stores both **Farmers** and **Buyers** with different fields for each.

### Common Fields (All Users)
```javascript
{
  _id: ObjectId,           // Unique identifier (auto-generated)
  name: String,            // User's full name
  email: String,           // Email address (unique)
  phone: String,           // 10-digit phone number (unique)
  password: String,        // Encrypted password (bcrypt hashed)
  userType: String,        // 'farmer' | 'buyer' | 'admin'
  profileImage: String,    // Profile picture URL
  isActive: Boolean,       // Account active status
  emailVerified: Boolean,
  phoneVerified: Boolean,
  createdAt: Date,
  lastLogin: Date
}
```

### Farmer-Specific Fields
```javascript
{
  farmDetails: {
    farmName: String,
    farmSize: Number,      // in acres
    location: {
      address: String,
      city: String,
      state: String,
      pincode: String,
      coordinates: {
        latitude: Number,
        longitude: Number
      }
    },
    crops: [String],       // Array of crop names
    verificationStatus: String,  // 'pending' | 'verified' | 'rejected'
    rating: Number,        // 0-5 stars
    totalReviews: Number
  }
}
```

### Buyer-Specific Fields
```javascript
{
  buyerDetails: {
    businessName: String,
    businessType: String,  // 'individual' | 'restaurant' | 'retailer' | 'wholesaler'
    deliveryAddress: {
      address: String,
      city: String,
      state: String,
      pincode: String
    }
  }
}
```

### Example User Document
```json
{
  "_id": "65a1b2c3d4e5f6789",
  "name": "Rajesh Kumar",
  "email": "rajesh@example.com",
  "phone": "9876543210",
  "password": "$2a$10$hashed_password_here",
  "userType": "farmer",
  "farmDetails": {
    "farmName": "Kumar Organic Farms",
    "farmSize": 10,
    "location": {
      "city": "Nashik",
      "state": "Maharashtra"
    },
    "rating": 4.9
  },
  "createdAt": "2026-01-01T10:00:00Z"
}
```

---

## 🌾 Products Collection

Stores crop/product listings created by farmers.

### Schema
```javascript
{
  _id: ObjectId,
  farmer: ObjectId,          // Reference to User._id (farmer)
  name: String,              // Product name
  category: String,          // 'vegetables' | 'fruits' | 'grains' | 'pulses' | 'spices' | 'dairy'
  description: String,       // Product description
  images: [String],          // Array of image URLs
  
  // Pricing
  price: Number,             // Price per unit
  unit: String,              // 'kg' | 'quintal' | 'ton' | 'piece' | 'dozen'
  quantity: Number,          // Available quantity
  minOrder: Number,          // Minimum order quantity
  
  // Quality
  quality: String,           // 'A' | 'B' | 'C' | 'organic' | 'premium'
  isOrganic: Boolean,
  certifications: [String],
  
  // Dates
  harvestDate: Date,
  expiryDate: Date,
  availableFrom: Date,
  availableUntil: Date,
  
  // Location
  location: {
    city: String,
    state: String,
    pincode: String
  },
  
  // Status & Analytics
  status: String,            // 'active' | 'pending' | 'sold' | 'expired' | 'inactive'
  views: Number,
  
  // Market Data
  marketPrice: {
    current: Number,
    change: Number,          // Percentage
    lastUpdated: Date
  },
  
  createdAt: Date,
  updatedAt: Date
}
```

### Example Product Document
```json
{
  "_id": "65a2b3c4d5e6f7890",
  "farmer": "65a1b2c3d4e5f6789",
  "name": "Organic Tomatoes",
  "category": "vegetables",
  "description": "Fresh organic tomatoes",
  "price": 28,
  "unit": "kg",
  "quantity": 500,
  "quality": "A",
  "isOrganic": true,
  "location": {
    "city": "Nashik",
    "state": "Maharashtra"
  },
  "status": "active",
  "views": 124,
  "createdAt": "2026-01-05T08:00:00Z"
}
```

---

## 📦 Orders Collection

Tracks all order transactions between buyers and farmers.

### Schema
```javascript
{
  _id: ObjectId,
  orderNumber: String,       // Auto-generated (ORD-2026-000001)
  
  // Parties
  buyer: ObjectId,           // Reference to User._id (buyer)
  farmer: ObjectId,          // Reference to User._id (farmer)
  product: ObjectId,         // Reference to Product._id
  
  // Order Details
  quantity: Number,
  unit: String,
  pricePerUnit: Number,
  totalAmount: Number,
  
  // Delivery
  deliveryAddress: {
    name: String,
    phone: String,
    address: String,
    city: String,
    state: String,
    pincode: String
  },
  
  // Status Tracking
  status: String,            // 'pending' → 'confirmed' → 'harvested' → 
                            // 'quality_checked' → 'packed' → 'dispatched' → 
                            // 'in_transit' → 'delivered' | 'cancelled'
  
  statusHistory: [{
    status: String,
    timestamp: Date,
    note: String,
    location: String
  }],
  
  // Payment
  paymentMethod: String,     // 'cod' | 'online' | 'bank_transfer' | 'upi'
  paymentStatus: String,     // 'pending' | 'paid' | 'failed' | 'refunded'
  paymentId: String,
  paidAt: Date,
  
  // Delivery Tracking
  expectedDelivery: Date,
  actualDelivery: Date,
  trackingNumber: String,
  vehicleNumber: String,
  driverPhone: String,
  
  // Quality Control (for perishables)
  temperature: {
    current: Number,
    readings: [{
      value: Number,
      timestamp: Date
    }]
  },
  qualityGrade: String,
  
  // Cancellation
  cancellationReason: String,
  cancelledBy: String,       // 'buyer' | 'farmer' | 'admin'
  cancelledAt: Date,
  
  // Notes
  buyerNotes: String,
  farmerNotes: String,
  
  createdAt: Date,
  updatedAt: Date
}
```

### Example Order Document
```json
{
  "_id": "65a3b4c5d6e7f8901",
  "orderNumber": "ORD-2026-000156",
  "buyer": "65a9b8c7d6e5f4321",
  "farmer": "65a1b2c3d4e5f6789",
  "product": "65a2b3c4d5e6f7890",
  "quantity": 100,
  "unit": "kg",
  "pricePerUnit": 28,
  "totalAmount": 2800,
  "status": "in_transit",
  "paymentStatus": "paid",
  "expectedDelivery": "2026-01-08T10:00:00Z",
  "createdAt": "2026-01-05T14:30:00Z"
}
```

---

## 🔗 Relationships (References)

```
User (Farmer) ──┬── Creates ──→ Product
                │
                └── Receives ──→ Order

User (Buyer) ────── Places ──→ Order

Product ────── Part of ──→ Order
```

### How References Work
```javascript
// Fetch order with all related data
Order.findById(orderId)
  .populate('buyer', 'name email phone')      // Get buyer details
  .populate('farmer', 'name farmDetails')     // Get farmer details
  .populate('product', 'name price images')   // Get product details
```

---

## 📈 Indexes

Optimized queries with indexes on:

### Users
- `email` (unique)
- `phone` (unique)
- `userType`

### Products
- `farmer + status`
- `category + status`
- `name` (text search)

### Orders
- `orderNumber` (unique)
- `buyer + status`
- `farmer + status`
- `createdAt` (for sorting)

---

## 🔢 Database Statistics

After running seed data:
- **Users**: 5 (3 farmers, 2 buyers)
- **Products**: 6 crops
- **Orders**: 3 transactions

---

## 🚀 How to Populate Database

Run the seed script:
```bash
cd backend
node seedData.js
```

This will:
1. Clear existing data
2. Create sample users
3. Create sample products
4. Create sample orders

### Test Login Credentials

**Farmers:**
- rajesh@example.com / farmer123
- suresh@example.com / farmer123
- amit@example.com / farmer123

**Buyers:**
- priya@example.com / buyer123
- rohit@example.com / buyer123

---

## 💾 Backup & Restore

### Backup
```bash
mongodump --uri="mongodb://localhost:27017/agroconnect" --out=./backup
```

### Restore
```bash
mongorestore --uri="mongodb://localhost:27017/agroconnect" ./backup/agroconnect
```

---

## 📊 Query Examples

### Find all organic products
```javascript
db.products.find({ isOrganic: true, status: 'active' })
```

### Find farmer's active orders
```javascript
db.orders.find({ 
  farmer: farmerId, 
  status: { $in: ['pending', 'in_transit'] } 
})
```

### Calculate total earnings
```javascript
db.orders.aggregate([
  { $match: { farmer: farmerId, paymentStatus: 'paid' } },
  { $group: { _id: null, total: { $sum: '$totalAmount' } } }
])
```

---

## 🔒 Security

- **Passwords**: Hashed with bcrypt (10 salt rounds)
- **Validation**: Mongoose schema validation
- **Indexes**: Unique constraints on email/phone
- **Access Control**: Role-based (farmer/buyer/admin)

---

**Database designed and implemented for AgroConnect 🌱**
