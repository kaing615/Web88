import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
     customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
        required: true
     },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 1
    },
    totalPrice: {
        type: Number,
        required: true,
        min: 0
    }  
}, { timestamps: true });

export const Order = mongoose.model('Order', orderSchema);