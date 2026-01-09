
# DESCRIPTION OF WORK DONE

During my internship, I worked on a full-stack web development project titled "AgroConnect – Agricultural Marketplace Platform." The primary objective of this project was to develop a digital platform that directly connects farmers with buyers, eliminating middlemen and ensuring fair pricing for agricultural produce. The project aimed to empower farmers by providing them with a transparent marketplace to list their crops and enabling buyers to purchase fresh produce directly from the source.
The project focused on building a robust backend API using Node.js and Express, designing a user-friendly frontend interface, and implementing secure authentication and data management using MongoDB. In addition, dashboard functionalities were incorporated to allow farmers to manage listings and buyers to track their orders, thereby enhancing the overall user experience and supply chain efficiency.

# Understanding the Problem and Setting the Objective

*   Studied real-world challenges in the agricultural supply chain, such as the exploitation of farmers by middlemen and the lack of price transparency.
*   Defined the goal of the project as developing a web-based system that facilitates direct trade between farmers and buyers.
*   Established the objective of creating a scalable and secure platform with features like real-time product listings, order management, and secure user authentication.

# Learning the Concepts of AgroConnect

*   Gained knowledge about full-stack web development architectures, specifically the interaction between the frontend and backend.
*   Understood the importance of RESTful API design for efficient data communication between client and server.
*   Learned fundamental concepts of database management using MongoDB, including schema design, data relationships, and query optimization.
*   Explored security best practices such as JWT authentication, password hashing, and input validation to protect user data.

# PROJECT WORKFLOW – AgroConnect

## 1. Requirement Analysis
The project began with a detailed analysis of the requirements for both farmers and buyers. Key features identified included user registration, product management, and order tracking. This phase ensured that the platform would effectively address the needs of its target users.

## 2. Database Design & Organization
A robust database schema was designed to store and organize data efficiently. The database was structured using MongoDB with Mongoose models:
*   **Users Collection:** Stores farmer and buyer profiles with secure authentication data.
*   **Products Collection:** Stores details of crops listed by farmers, including price, quantity, and images.
*   **Orders Collection:** Tracks transactions between buyers and farmers, ensuring a record of sales and purchases.

## 3. Backend API Development
The backend was built using Node.js and Express to handle server-side logic. Key features included:
*   **RESTful Endpoints:** Created APIs for user authentication (`/api/auth`), product management (`/api/products`), order processing (`/api/orders`), and dashboard analytics (`/api/dashboard`).
*   **Middleware:** Implemented middleware for authentication, error handling, and security headers (Helmet).
*   **Controllers:** Developed logic to handle business rules and database interactions.

## 4. Frontend Implementation
The frontend was developed using HTML5, CSS3, and JavaScript to create an interactive user interface.
*   **Multi-Page Architecture:** Structured the application with distinct pages for Home (`index.html`), Farmer Dashboard (`farmer-dashboard.html`), Buyer Dashboard (`buyer-dashboard.html`), and Tracking (`tracking.html`).
*   **Responsive Design:** Ensured the platform is accessible on various devices using responsive CSS techniques.
*   **Dynamic Data:** Utilized the Fetch API to consume backend endpoints and dynamically update the UI with real-time data.

## 5. Security & Optimization
Security measures were integrated to protect the platform:
*   **Authentication:** Implemented JSON Web Tokens (JWT) for secure user sessions.
*   **Data Protection:** Used `bcryptjs` for password hashing and `helmet` for HTTP header security.
*   **Performance:** Implemented `express-rate-limit` to prevent abuse and optimized static file serving for images.

# LIBRARIES USED IN OUR PROJECT

*   **Node.js** – A runtime environment used to execute JavaScript on the server side.
*   **Express.js** – A web application framework for Node.js used to build robust APIs.
*   **MongoDB & Mongoose** – A NoSQL database and object modeling tool used for efficient data storage and retrieval.
*   **Bcryptjs** – Used for hashing passwords to ensure user account security.
*   **JsonWebToken (JWT)** – Used for implementing secure authentication and authorization mechanisms.
*   **Cors** – Middleware used to enable Cross-Origin Resource Sharing for frontend-backend communication.
*   **Multer** – Middleware used for handling file uploads (e.g., product images).
*   **Helmet** – Used to secure Express apps by setting various HTTP headers.
*   **Morgan** – An HTTP request logger used for debugging and monitoring during development.

# CODING

## 1. server.js (Backend Entry Point)

```javascript
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const app = express();

// Security headers
app.use(helmet());

// CORS & Body parser
app.use(cors({
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    credentials: true
}));
app.use(express.json());

// Database Connection
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`❌ Error: ${error.message}`);
        process.exit(1);
    }
};
connectDB();

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/products', require('./routes/products'));
app.use('/api/orders', require('./routes/orders'));
app.use('/api/dashboard', require('./routes/dashboard'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
```

## 2. Product Model (Mongoose Schema)

```javascript
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    farmer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        type: String,
        required: [true, 'Please provide product name'],
        trim: true
    },
    category: {
        type: String,
        required: [true, 'Please specify category'],
        enum: ['vegetables', 'fruits', 'grains', 'pulses', 'spices', 'dairy', 'other']
    },
    price: {
        type: Number,
        required: [true, 'Please provide price'],
        min: [0, 'Price cannot be negative']
    },
    quantity: {
        type: Number,
        required: [true, 'Please provide available quantity'],
        min: [0, 'Quantity cannot be negative']
    },
    status: {
        type: String,
        enum: ['active', 'pending', 'sold', 'expired', 'inactive'],
        default: 'active'
    },
    // ... timestamps and other fields
}, {
    timestamps: true
});

module.exports = mongoose.model('Product', productSchema);
```

## 3. Auth Middleware (Security)

```javascript
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        return res.status(401).json({ success: false, message: 'Not authorized to access this route' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id);

        if (!req.user) {
            return res.status(401).json({ success: false, message: 'User not found' });
        }

        if (!req.user.isActive) {
            return res.status(401).json({ success: false, message: 'Account is deactivated' });
        }

        next();
    } catch (error) {
        return res.status(401).json({ success: false, message: 'Not authorized to access this route' });
    }
};
```

# OUTCOMES

The output of the AgroConnect project is a fully functional web-based marketplace application. When the application is executed, the backend server handles API requests while the frontend provides an intuitive interface for users.

**Key results include:**
*   **Farmer Empowerment:** Farmers can successfully register, log in, and list their agricultural produce with images and prices.
*   **Direct Purchasing:** Buyers can browse available crops, view details, and place orders directly with farmers.
*   **Transparent System:** The platform ensures transparency in pricing and availability, fostering trust between users.
*   **Real-time Interaction:** The dashboards provide real-time updates on orders and listings, ensuring users are always informed.

This project successfully bridges the gap in the agricultural supply chain, demonstrating the practical application of modern web technologies to solve real-world problems.
