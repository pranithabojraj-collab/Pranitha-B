const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    orderNumber: {
        type: String,
        unique: true,
        required: true
    },
    buyer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    farmer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },

    // Order Details
    quantity: {
        type: Number,
        required: true,
        min: [1, 'Quantity must be at least 1']
    },
    unit: {
        type: String,
        required: true
    },
    pricePerUnit: {
        type: Number,
        required: true
    },
    totalAmount: {
        type: Number,
        required: true
    },

    // Delivery Information
    deliveryAddress: {
        name: String,
        phone: String,
        address: String,
        city: String,
        state: String,
        pincode: String,
        coordinates: {
            latitude: Number,
            longitude: Number
        }
    },

    // Order Status
    status: {
        type: String,
        enum: [
            'pending',
            'confirmed',
            'harvested',
            'quality_checked',
            'packed',
            'dispatched',
            'in_transit',
            'delivered',
            'cancelled',
            'returned'
        ],
        default: 'pending'
    },

    // Status Timeline
    statusHistory: [{
        status: String,
        timestamp: {
            type: Date,
            default: Date.now
        },
        note: String,
        location: String
    }],

    // Payment
    paymentMethod: {
        type: String,
        enum: ['cod', 'online', 'bank_transfer', 'upi'],
        required: true
    },
    paymentStatus: {
        type: String,
        enum: ['pending', 'paid', 'failed', 'refunded'],
        default: 'pending'
    },
    paymentId: String,
    paidAt: Date,

    // Delivery
    expectedDelivery: Date,
    actualDelivery: Date,
    trackingNumber: String,
    vehicleNumber: String,
    driverPhone: String,

    // Quality & Temperature (for perishables)
    temperature: {
        current: Number,
        readings: [{
            value: Number,
            timestamp: Date
        }]
    },
    qualityGrade: {
        type: String,
        enum: ['A', 'B', 'C']
    },

    // Cancellation
    cancellationReason: String,
    cancelledBy: {
        type: String,
        enum: ['buyer', 'farmer', 'admin']
    },
    cancelledAt: Date,

    // Notes
    buyerNotes: String,
    farmerNotes: String,
    adminNotes: String

}, {
    timestamps: true
});

// Generate order number before saving
orderSchema.pre('save', async function (next) {
    if (!this.orderNumber) {
        const date = new Date();
        const year = date.getFullYear();
        const count = await mongoose.model('Order').countDocuments();
        this.orderNumber = `ORD-${year}-${String(count + 1).padStart(6, '0')}`;
    }
    next();
});

// Add status to history when status changes
orderSchema.pre('save', function (next) {
    if (this.isModified('status')) {
        this.statusHistory.push({
            status: this.status,
            timestamp: new Date()
        });
    }
    next();
});

module.exports = mongoose.model('Order', orderSchema);
