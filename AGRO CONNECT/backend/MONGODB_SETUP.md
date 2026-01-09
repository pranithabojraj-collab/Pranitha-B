# 🛠️ MongoDB Setup Guide for AgroConnect

Complete guide to install and configure MongoDB for your project.

---

## 📥 Installation Options

Choose **ONE** of these methods:

### Option 1: MongoDB Atlas (Cloud) - **RECOMMENDED** ☁️
- ✅ No installation needed
- ✅ Free tier available
- ✅ Works from anywhere
- ✅ Automatic backups

### Option 2: Local MongoDB (Your Computer) 💻
- ✅ Full control
- ✅ Works offline
- ⚠️ Requires installation

---

## ☁️ Option 1: MongoDB Atlas (Cloud) Setup

### Step 1: Create Account
1. Go to https://www.mongodb.com/cloud/atlas
2. Click **"Try Free"**
3. Sign up with email or Google

### Step 2: Create Cluster
1. After login, click **"Build a Database"**
2. Choose **FREE** tier (M0)
3. Select cloud provider: **AWS**
4. Choose region: **Mumbai (ap-south-1)** (closest to India)
5. Cluster Name: `AgroConnect`
6. Click **"Create"**

### Step 3: Create Database User
1. Click **"Database Access"** (left sidebar)
2. Click **"Add New Database User"**
3. Authentication: **Password**
4. Username: `agroconnect_admin`
5. Password: Generate or create (save this!)
6. User Privileges: **Atlas Admin**
7. Click **"Add User"**

### Step 4: Allow Network Access
1. Click **"Network Access"** (left sidebar)
2. Click **"Add IP Address"**
3. Choose **"Allow Access from Anywhere"** (for development)
4. Click **"Confirm"**

### Step 5: Get Connection String
1. Go back to **"Database"** (left sidebar)
2. Click **"Connect"** on your cluster
3. Choose **"Connect your application"**
4. Driver: **Node.js**
5. Copy the connection string:
   ```
   mongodb+srv://agroconnect_admin:<password>@agroconnect.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```

### Step 6: Update .env File
1. Open `backend/.env` file
2. Replace the MongoDB URI:
   ```env
   MONGODB_URI=mongodb+srv://agroconnect_admin:YOUR_PASSWORD@agroconnect.xxxxx.mongodb.net/agroconnect?retryWrites=true&w=majority
   ```
3. Replace `<password>` with your actual password
4. Add `/agroconnect` before the `?` (database name)

✅ **Done! MongoDB Atlas is ready!**

---

## 💻 Option 2: Local MongoDB Setup

### For Windows

#### Step 1: Download MongoDB
1. Visit: https://www.mongodb.com/try/download/community
2. Version: **7.0** (Latest)
3. Platform: **Windows**
4. Package: **MSI**
5. Click **Download**

#### Step 2: Install MongoDB
1. Run the downloaded `.msi` file
2. Choose **"Complete"** installation
3. **Important**: Check **"Install MongoDB as a Service"**
4. Check **"Install MongoDB Compass"** (GUI tool)
5. Click **Install**
6. Wait for installation to complete

#### Step 3: Verify Installation
Open PowerShell/Command Prompt:
```bash
mongod --version
```
You should see version info.

#### Step 4: Start MongoDB Service
MongoDB should start automatically. If not:
```bash
net start MongoDB
```

#### Step 5: Configure .env
Your `.env` file should have:
```env
MONGODB_URI=mongodb://localhost:27017/agroconnect
```

✅ **Done! Local MongoDB is ready!**

---

## 🧪 Test Your MongoDB Connection

### Method 1: Use MongoDB Compass (GUI)
1. Open **MongoDB Compass** (installed with MongoDB)
2. Connection string:
   - Atlas: Use your connection string
   - Local: `mongodb://localhost:27017`
3. Click **Connect**
4. You should see databases listed

### Method 2: Test with Node.js
1. Make sure you're in the backend folder:
   ```bash
   cd backend
   ```

2. Create a test file `test-db.js`:
   ```javascript
   const mongoose = require('mongoose');
   require('dotenv').config();
   
   mongoose.connect(process.env.MONGODB_URI)
     .then(() => {
       console.log('✅ MongoDB Connected Successfully!');
       process.exit(0);
     })
     .catch(err => {
       console.error('❌ Connection Failed:', err.message);
       process.exit(1);
     });
   ```

3. Run the test:
   ```bash
   node test-db.js
   ```

4. You should see: `✅ MongoDB Connected Successfully!`

---

## 📊 Populate Database with Sample Data

Once MongoDB is connected:

```bash
cd backend
node seedData.js
```

This will:
- Create 5 sample users (3 farmers, 2 buyers)
- Create 6 products
- Create 3 orders

---

## 🔧 Common Issues & Solutions

### Issue 1: "mongod: command not found"
**Solution**: MongoDB not in PATH
- Windows: Restart computer after installation
- Or manually add to PATH: `C:\Program Files\MongoDB\Server\7.0\bin`

### Issue 2: "Connection failed: ECONNREFUSED"
**Solution**: MongoDB service not running
```bash
# Windows
net start MongoDB

# Check if running
tasklist | findstr mongod
```

### Issue 3: "Authentication failed"
**Solution for Atlas**: 
- Check username/password in connection string
- Ensure IP is whitelisted (0.0.0.0/0 for development)

**Solution for Local**: 
- Local MongoDB doesn't need authentication by default

### Issue 4: "Network timeout"
**Solution for Atlas**:
- Check internet connection
- Verify Network Access allows your IP

---

## 📱 MongoDB Compass (GUI Tool)

Use MongoDB Compass to:
- ✅ View your data visually
- ✅ Run queries
- ✅ Manage collections
- ✅ Import/Export data

### How to Use:
1. Open MongoDB Compass
2. Connect to your database
3. Click on `agroconnect` database
4. View collections: `users`, `products`, `orders`
5. Browse/edit documents

---

## 🔄 Database Operations

### View All Users
```javascript
db.users.find()
```

### View Only Farmers
```javascript
db.users.find({ userType: "farmer" })
```

### View Active Products
```javascript
db.products.find({ status: "active" })
```

### Clear All Data
```javascript
db.users.deleteMany({})
db.products.deleteMany({})
db.orders.deleteMany({})
```

---

## 📁 Database Structure

After setup and seeding:
```
agroconnect (database)
├── users (collection)
│   ├── Rajesh Kumar (farmer)
│   ├── Suresh Patel (farmer)
│   ├── Amit Singh (farmer)
│   ├── Priya Sharma (buyer)
│   └── Rohit Mehta (buyer)
│
├── products (collection)
│   ├── Organic Tomatoes
│   ├── Premium Wheat
│   ├── Fresh Carrots
│   ├── Basmati Rice
│   ├── Mixed Vegetables
│   └── Red Onions
│
└── orders (collection)
    ├── ORD-2026-000001
    ├── ORD-2026-000002
    └── ORD-2026-000003
```

---

## ✅ Quick Checklist

- [ ] MongoDB installed (Atlas or Local)
- [ ] `.env` file configured with correct URI
- [ ] Connection tested successfully
- [ ] Sample data seeded
- [ ] MongoDB Compass installed (optional but helpful)

---

## 🔗 Useful Links

- MongoDB Atlas: https://www.mongodb.com/cloud/atlas
- MongoDB Download: https://www.mongodb.com/try/download/community
- MongoDB Compass: https://www.mongodb.com/try/download/compass
- MongoDB Docs: https://www.mongodb.com/docs/

---

**Your database is ready! Start the backend server with `npm run dev` 🚀**
