const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const User = require('./models/User');
const Product = require('./models/Product');
const Order = require('./models/Order');

// Sample data to populate the database
const sampleData = {
    users: [
        // Farmers
        {
            name: 'Rajesh Kumar',
            email: 'rajesh@example.com',
            phone: '9876543210',
            password: 'farmer123',
            userType: 'farmer',
            farmDetails: {
                farmName: 'Kumar Organic Farms',
                farmSize: 10,
                location: {
                    address: 'Village Pimpalgaon',
                    city: 'Nashik',
                    state: 'Maharashtra',
                    pincode: '422001'
                },
                crops: ['Tomatoes', 'Onions', 'Grapes'],
                verificationStatus: 'verified',
                rating: 4.9,
                totalReviews: 156
            },
            emailVerified: true,
            phoneVerified: true
        },
        {
            name: 'Suresh Patel',
            email: 'suresh@example.com',
            phone: '9876543211',
            password: 'farmer123',
            userType: 'farmer',
            farmDetails: {
                farmName: 'Patel Agro Farms',
                farmSize: 25,
                location: {
                    address: 'Taluka Dindori',
                    city: 'Nashik',
                    state: 'Maharashtra',
                    pincode: '422202'
                },
                crops: ['Wheat', 'Rice', 'Sugarcane'],
                verificationStatus: 'verified',
                rating: 4.8,
                totalReviews: 89
            },
            emailVerified: true,
            phoneVerified: true
        },
        {
            name: 'Amit Singh',
            email: 'amit@example.com',
            phone: '9876543212',
            password: 'farmer123',
            userType: 'farmer',
            farmDetails: {
                farmName: 'Singh Vegetables',
                farmSize: 5,
                location: {
                    address: 'Village Chandwad',
                    city: 'Nashik',
                    state: 'Maharashtra',
                    pincode: '423101'
                },
                crops: ['Mixed Vegetables', 'Carrots', 'Cabbage'],
                verificationStatus: 'verified',
                rating: 5.0,
                totalReviews: 62
            },
            emailVerified: true,
            phoneVerified: true
        },

        // Buyers
        {
            name: 'Priya Sharma',
            email: 'priya@example.com',
            phone: '9123456789',
            password: 'buyer123',
            userType: 'buyer',
            buyerDetails: {
                businessName: 'Sharma Fresh Mart',
                businessType: 'retailer',
                deliveryAddress: {
                    address: '123 Market Road, Dadar',
                    city: 'Mumbai',
                    state: 'Maharashtra',
                    pincode: '400014'
                }
            },
            emailVerified: true,
            phoneVerified: true
        },
        {
            name: 'Rohit Mehta',
            email: 'rohit@example.com',
            phone: '9123456790',
            password: 'buyer123',
            userType: 'buyer',
            buyerDetails: {
                businessName: 'Green Valley Restaurant',
                businessType: 'restaurant',
                deliveryAddress: {
                    address: '45 MG Road, Koregaon Park',
                    city: 'Pune',
                    state: 'Maharashtra',
                    pincode: '411001'
                }
            },
            emailVerified: true,
            phoneVerified: true
        }
    ],

    products: [
        {
            name: 'Organic Tomatoes',
            category: 'vegetables',
            description: 'Fresh organic tomatoes grown without pesticides. Perfect for salads, cooking, and daily use.',
            price: 28,
            unit: 'kg',
            quantity: 500,
            minOrder: 10,
            quality: 'A',
            isOrganic: true,
            certifications: ['Organic India Certified'],
            harvestDate: new Date('2026-01-05'),
            location: {
                city: 'Nashik',
                state: 'Maharashtra',
                pincode: '422001'
            },
            status: 'active',
            views: 124
        },
        {
            name: 'Premium Wheat',
            category: 'grains',
            description: 'High-quality golden wheat grain. Suitable for flour making and wholesale.',
            price: 22,
            unit: 'kg',
            quantity: 1200,
            minOrder: 50,
            quality: 'A',
            isOrganic: false,
            harvestDate: new Date('2025-12-20'),
            location: {
                city: 'Nashik',
                state: 'Maharashtra',
                pincode: '422202'
            },
            status: 'active',
            views: 89
        },
        {
            name: 'Fresh Carrots',
            category: 'vegetables',
            description: 'Crunchy and sweet fresh carrots. Rich in vitamins and minerals.',
            price: 20,
            unit: 'kg',
            quantity: 300,
            minOrder: 5,
            quality: 'A',
            isOrganic: false,
            harvestDate: new Date('2026-01-03'),
            location: {
                city: 'Nashik',
                state: 'Maharashtra',
                pincode: '423101'
            },
            status: 'active',
            views: 67
        },
        {
            name: 'Basmati Rice',
            category: 'grains',
            description: 'Premium quality aged basmati rice with long grains and aromatic fragrance.',
            price: 38,
            unit: 'kg',
            quantity: 800,
            minOrder: 25,
            quality: 'premium',
            isOrganic: false,
            harvestDate: new Date('2025-11-15'),
            location: {
                city: 'Nashik',
                state: 'Maharashtra',
                pincode: '422202'
            },
            status: 'active',
            views: 142
        },
        {
            name: 'Mixed Vegetables Pack',
            category: 'vegetables',
            description: 'Assorted fresh vegetables including cabbage, beans, and bell peppers.',
            price: 25,
            unit: 'kg',
            quantity: 200,
            minOrder: 10,
            quality: 'A',
            isOrganic: false,
            harvestDate: new Date('2026-01-06'),
            location: {
                city: 'Nashik',
                state: 'Maharashtra',
                pincode: '423101'
            },
            status: 'active',
            views: 95
        },
        {
            name: 'Red Onions',
            category: 'vegetables',
            description: 'Fresh red onions. Essential ingredient for Indian cooking.',
            price: 15,
            unit: 'kg',
            quantity: 600,
            minOrder: 20,
            quality: 'B',
            isOrganic: false,
            harvestDate: new Date('2026-01-01'),
            location: {
                city: 'Nashik',
                state: 'Maharashtra',
                pincode: '422001'
            },
            status: 'active',
            views: 203
        }
    ]
};

// Connect to database and seed data
const seedDatabase = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ Connected to MongoDB');

        // Clear existing data
        console.log('\n🗑️  Clearing existing data...');
        await User.deleteMany({});
        await Product.deleteMany({});
        await Order.deleteMany({});
        console.log('✅ Cleared old data');

        // Insert users
        console.log('\n👥 Creating users...');
        const users = await User.create(sampleData.users);
        console.log(`✅ Created ${users.length} users`);

        // Map farmers for products
        const farmers = users.filter(u => u.userType === 'farmer');

        // Assign farmers to products and insert
        console.log('\n🌾 Creating products...');
        sampleData.products[0].farmer = farmers[0]._id; // Rajesh - Tomatoes
        sampleData.products[1].farmer = farmers[1]._id; // Suresh - Wheat
        sampleData.products[2].farmer = farmers[2]._id; // Amit - Carrots
        sampleData.products[3].farmer = farmers[1]._id; // Suresh - Rice
        sampleData.products[4].farmer = farmers[2]._id; // Amit - Mixed Veg
        sampleData.products[5].farmer = farmers[0]._id; // Rajesh - Onions

        const products = await Product.create(sampleData.products);
        console.log(`✅ Created ${products.length} products`);

        // Create sample orders
        console.log('\n📦 Creating sample orders...');
        const buyers = users.filter(u => u.userType === 'buyer');

        const sampleOrders = [
            {
                buyer: buyers[0]._id,
                farmer: farmers[0]._id,
                product: products[0]._id,
                quantity: 100,
                unit: 'kg',
                pricePerUnit: 28,
                totalAmount: 2800,
                deliveryAddress: {
                    name: 'Priya Sharma',
                    phone: '9123456789',
                    address: '123 Market Road, Dadar',
                    city: 'Mumbai',
                    state: 'Maharashtra',
                    pincode: '400014'
                },
                paymentMethod: 'online',
                paymentStatus: 'paid',
                status: 'in_transit',
                expectedDelivery: new Date('2026-01-08')
            },
            {
                buyer: buyers[0]._id,
                farmer: farmers[1]._id,
                product: products[1]._id,
                quantity: 200,
                unit: 'kg',
                pricePerUnit: 22,
                totalAmount: 4400,
                deliveryAddress: {
                    name: 'Priya Sharma',
                    phone: '9123456789',
                    address: '123 Market Road, Dadar',
                    city: 'Mumbai',
                    state: 'Maharashtra',
                    pincode: '400014'
                },
                paymentMethod: 'online',
                paymentStatus: 'paid',
                status: 'delivered',
                actualDelivery: new Date('2025-12-30')
            },
            {
                buyer: buyers[1]._id,
                farmer: farmers[2]._id,
                product: products[4]._id,
                quantity: 50,
                unit: 'kg',
                pricePerUnit: 25,
                totalAmount: 1250,
                deliveryAddress: {
                    name: 'Rohit Mehta',
                    phone: '9123456790',
                    address: '45 MG Road, Koregaon Park',
                    city: 'Pune',
                    state: 'Maharashtra',
                    pincode: '411001'
                },
                paymentMethod: 'online',
                paymentStatus: 'paid',
                status: 'delivered',
                actualDelivery: new Date('2026-01-03')
            }
        ];

        const orders = await Order.create(sampleOrders);
        console.log(`✅ Created ${orders.length} orders`);

        // Summary
        console.log('\n' + '='.repeat(50));
        console.log('🎉 DATABASE SEEDING COMPLETE!');
        console.log('='.repeat(50));
        console.log(`\n📊 Summary:`);
        console.log(`   👥 Users: ${users.length} (${farmers.length} farmers, ${buyers.length} buyers)`);
        console.log(`   🌾 Products: ${products.length}`);
        console.log(`   📦 Orders: ${orders.length}`);
        console.log('\n💡 You can now test your application with this data!');
        console.log('\n🔑 Test Credentials:');
        console.log('   Farmers:');
        console.log('     - Email: rajesh@example.com | Password: farmer123');
        console.log('     - Email: suresh@example.com | Password: farmer123');
        console.log('     - Email: amit@example.com | Password: farmer123');
        console.log('\n   Buyers:');
        console.log('     - Email: priya@example.com | Password: buyer123');
        console.log('     - Email: rohit@example.com | Password: buyer123');
        console.log('\n');

        process.exit(0);

    } catch (error) {
        console.error('❌ Error seeding database:', error);
        process.exit(1);
    }
};

// Run the seed function
seedDatabase();
