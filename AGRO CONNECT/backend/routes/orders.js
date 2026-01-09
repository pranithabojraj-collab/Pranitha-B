const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const Product = require('../models/Product');
const { protect, authorize } = require('../middleware/auth');

// @route   POST /api/orders
// @desc    Create a new order
// @access  Private (Buyer only)
router.post('/', protect, authorize('buyer'), async (req, res) => {
    try {
        const { product, quantity, deliveryAddress, paymentMethod } = req.body;

        // Get product details
        const productData = await Product.findById(product);

        if (!productData) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }

        // Check if enough quantity is available
        if (productData.quantity < quantity) {
            return res.status(400).json({
                success: false,
                message: `Only ${productData.quantity} ${productData.unit} available`
            });
        }

        // Check minimum order
        if (quantity < productData.minOrder) {
            return res.status(400).json({
                success: false,
                message: `Minimum order is ${productData.minOrder} ${productData.unit}`
            });
        }

        // Calculate total amount
        const totalAmount = productData.price * quantity;

        // Create order
        const order = await Order.create({
            buyer: req.user.id,
            farmer: productData.farmer,
            product: product,
            quantity,
            unit: productData.unit,
            pricePerUnit: productData.price,
            totalAmount,
            deliveryAddress,
            paymentMethod,
            status: 'pending'
        });

        // Update product quantity
        productData.quantity -= quantity;
        if (productData.quantity === 0) {
            productData.status = 'sold';
        }
        await productData.save();

        res.status(201).json({
            success: true,
            message: 'Order placed successfully',
            data: order
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error creating order',
            error: error.message
        });
    }
});

// @route   GET /api/orders
// @desc    Get all orders (filtered by user)
// @access  Private
router.get('/', protect, async (req, res) => {
    try {
        let query = {};

        // Filter based on user type
        if (req.user.userType === 'buyer') {
            query.buyer = req.user.id;
        } else if (req.user.userType === 'farmer') {
            query.farmer = req.user.id;
        }

        // Additional filters
        if (req.query.status) query.status = req.query.status;

        const orders = await Order.find(query)
            .populate('buyer', 'name email phone')
            .populate('farmer', 'name email phone farmDetails')
            .populate('product', 'name category images')
            .sort('-createdAt');

        res.status(200).json({
            success: true,
            count: orders.length,
            data: orders
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching orders',
            error: error.message
        });
    }
});

// @route   GET /api/orders/:id
// @desc    Get single order
// @access  Private
router.get('/:id', protect, async (req, res) => {
    try {
        const order = await Order.findById(req.params.id)
            .populate('buyer', 'name email phone')
            .populate('farmer', 'name email phone farmDetails')
            .populate('product');

        if (!order) {
            return res.status(404).json({
                success: false,
                message: 'Order not found'
            });
        }

        // Make sure user is authorized to view this order
        if (order.buyer._id.toString() !== req.user.id &&
            order.farmer._id.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to view this order'
            });
        }

        res.status(200).json({
            success: true,
            data: order
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching order',
            error: error.message
        });
    }
});

// @route   PUT /api/orders/:id/status
// @desc    Update order status
// @access  Private (Farmer only for their orders)
router.put('/:id/status', protect, authorize('farmer'), async (req, res) => {
    try {
        const { status, note, location, temperature, vehicleNumber, driverPhone } = req.body;

        let order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).json({
                success: false,
                message: 'Order not found'
            });
        }

        // Make sure farmer owns this order
        if (order.farmer.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to update this order'
            });
        }

        // Update status
        order.status = status;

        // Add to status history
        order.statusHistory.push({
            status,
            note,
            location,
            timestamp: new Date()
        });

        // Update additional fields based on status
        if (status === 'dispatched' || status === 'in_transit') {
            if (vehicleNumber) order.vehicleNumber = vehicleNumber;
            if (driverPhone) order.driverPhone = driverPhone;
        }

        if (status === 'delivered') {
            order.actualDelivery = new Date();
        }

        // Update temperature for perishables
        if (temperature) {
            if (!order.temperature) {
                order.temperature = { current: temperature, readings: [] };
            }
            order.temperature.current = temperature;
            order.temperature.readings.push({
                value: temperature,
                timestamp: new Date()
            });
        }

        await order.save();

        res.status(200).json({
            success: true,
            message: 'Order status updated successfully',
            data: order
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error updating order status',
            error: error.message
        });
    }
});

// @route   PUT /api/orders/:id/cancel
// @desc    Cancel an order
// @access  Private
router.put('/:id/cancel', protect, async (req, res) => {
    try {
        const { reason } = req.body;

        let order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).json({
                success: false,
                message: 'Order not found'
            });
        }

        // Check authorization
        const isBuyer = order.buyer.toString() === req.user.id;
        const isFarmer = order.farmer.toString() === req.user.id;

        if (!isBuyer && !isFarmer) {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to cancel this order'
            });
        }

        // Check if order can be cancelled
        if (['delivered', 'cancelled'].includes(order.status)) {
            return res.status(400).json({
                success: false,
                message: `Cannot cancel order with status: ${order.status}`
            });
        }

        // Update order
        order.status = 'cancelled';
        order.cancellationReason = reason;
        order.cancelledBy = req.user.userType;
        order.cancelledAt = new Date();

        await order.save();

        // Return product quantity
        const product = await Product.findById(order.product);
        if (product) {
            product.quantity += order.quantity;
            if (product.status === 'sold') {
                product.status = 'active';
            }
            await product.save();
        }

        res.status(200).json({
            success: true,
            message: 'Order cancelled successfully',
            data: order
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error cancelling order',
            error: error.message
        });
    }
});

module.exports = router;
