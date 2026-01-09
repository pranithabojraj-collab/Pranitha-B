const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const Product = require('../models/Product');
const { protect } = require('../middleware/auth');

// @route   GET /api/dashboard/stats
// @desc    Get dashboard statistics
// @access  Private
router.get('/stats', protect, async (req, res) => {
    try {
        let stats = {};

        if (req.user.userType === 'farmer') {
            // Farmer dashboard stats
            const totalProducts = await Product.countDocuments({
                farmer: req.user.id
            });

            const activeProducts = await Product.countDocuments({
                farmer: req.user.id,
                status: 'active'
            });

            const totalOrders = await Order.countDocuments({
                farmer: req.user.id
            });

            const activeOrders = await Order.countDocuments({
                farmer: req.user.id,
                status: { $in: ['pending', 'confirmed', 'in_transit'] }
            });

            // Calculate total earnings
            const orders = await Order.find({
                farmer: req.user.id,
                paymentStatus: 'paid'
            });

            const totalEarnings = orders.reduce((sum, order) => sum + order.totalAmount, 0);

            // This month earnings
            const startOfMonth = new Date();
            startOfMonth.setDate(1);
            startOfMonth.setHours(0, 0, 0, 0);

            const monthOrders = await Order.find({
                farmer: req.user.id,
                paymentStatus: 'paid',
                createdAt: { $gte: startOfMonth }
            });

            const monthEarnings = monthOrders.reduce((sum, order) => sum + order.totalAmount, 0);

            stats = {
                totalProducts,
                activeProducts,
                totalOrders,
                activeOrders,
                totalEarnings,
                monthEarnings,
                rating: req.user.farmDetails?.rating || 0,
                totalReviews: req.user.farmDetails?.totalReviews || 0
            };

        } else if (req.user.userType === 'buyer') {
            // Buyer dashboard stats
            const totalOrders = await Order.countDocuments({
                buyer: req.user.id
            });

            const activeOrders = await Order.countDocuments({
                buyer: req.user.id,
                status: { $in: ['pending', 'confirmed', 'in_transit'] }
            });

            const deliveredOrders = await Order.countDocuments({
                buyer: req.user.id,
                status: 'delivered'
            });

            // Calculate total spent
            const orders = await Order.find({ buyer: req.user.id });
            const totalSpent = orders.reduce((sum, order) => sum + order.totalAmount, 0);

            // This month spending
            const startOfMonth = new Date();
            startOfMonth.setDate(1);
            startOfMonth.setHours(0, 0, 0, 0);

            const monthOrders = await Order.find({
                buyer: req.user.id,
                createdAt: { $gte: startOfMonth }
            });

            const monthSpent = monthOrders.reduce((sum, order) => sum + order.totalAmount, 0);

            // Get saved farmers count (could be from a favorites collection)
            const uniqueFarmers = await Order.distinct('farmer', { buyer: req.user.id });

            stats = {
                totalOrders,
                activeOrders,
                deliveredOrders,
                totalSpent,
                monthSpent,
                savedFarmers: uniqueFarmers.length
            };
        }

        res.status(200).json({
            success: true,
            data: stats
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching dashboard stats',
            error: error.message
        });
    }
});

// @route   GET /api/dashboard/recent-activity
// @desc    Get recent activity
// @access  Private
router.get('/recent-activity', protect, async (req, res) => {
    try {
        let query = {};

        if (req.user.userType === 'farmer') {
            query.farmer = req.user.id;
        } else {
            query.buyer = req.user.id;
        }

        const recentOrders = await Order.find(query)
            .limit(5)
            .sort('-createdAt')
            .populate('product', 'name')
            .populate('buyer', 'name')
            .populate('farmer', 'name');

        res.status(200).json({
            success: true,
            data: recentOrders
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching recent activity',
            error: error.message
        });
    }
});

module.exports = router;
