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
    description: {
        type: String,
        required: [true, 'Please provide description'],
        maxlength: [500, 'Description cannot exceed 500 characters']
    },
    images: [{
        type: String
    }],
    price: {
        type: Number,
        required: [true, 'Please provide price'],
        min: [0, 'Price cannot be negative']
    },
    unit: {
        type: String,
        required: true,
        enum: ['kg', 'quintal', 'ton', 'piece', 'dozen'],
        default: 'kg'
    },
    quantity: {
        type: Number,
        required: [true, 'Please provide available quantity'],
        min: [0, 'Quantity cannot be negative']
    },
    minOrder: {
        type: Number,
        default: 1,
        min: [1, 'Minimum order must be at least 1']
    },

    // Quality & Certification
    quality: {
        type: String,
        enum: ['A', 'B', 'C', 'organic', 'premium'],
        default: 'B'
    },
    isOrganic: {
        type: Boolean,
        default: false
    },
    certifications: [String],

    // Harvest & Availability
    harvestDate: {
        type: Date
    },
    expiryDate: {
        type: Date
    },
    availableFrom: {
        type: Date,
        default: Date.now
    },
    availableUntil: {
        type: Date
    },

    // Location
    location: {
        city: String,
        state: String,
        pincode: String
    },

    // Status
    status: {
        type: String,
        enum: ['active', 'pending', 'sold', 'expired', 'inactive'],
        default: 'active'
    },

    // Analytics
    views: {
        type: Number,
        default: 0
    },

    // Market Price Tracking
    marketPrice: {
        current: Number,
        change: Number, // percentage
        lastUpdated: Date
    }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Virtual for farmer details
productSchema.virtual('farmerDetails', {
    ref: 'User',
    localField: 'farmer',
    foreignField: '_id',
    justOne: true
});

// Index for search optimization
productSchema.index({ name: 'text', category: 1, status: 1 });
productSchema.index({ farmer: 1, status: 1 });

module.exports = mongoose.model('Product', productSchema);
