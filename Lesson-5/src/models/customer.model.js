import mongoose from "mongoose";

const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    age: {
        type: Number,
        required: true,
        min: 0
    },
}, { timestamps: true });

const Customer = mongoose.model('Customer', customerSchema);
export default Customer;