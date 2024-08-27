const mongoose = require('mongoose')

const AdminSchema = new mongoose.Schema({
    adminName: {
        type: String,
        required: true,
    },
    adminEmail: {
        type: String,
        required: true,
        unique: true,
    },
    adminGender: {
        type: String,
        enum: ['Male', 'Female', 'Other'],
        default: 'Male'
    },
    adminPhone: {
        type: String,
        required: true,
    },
    adminProfile: {
        type: String,
        required: false,
    },
    adminPassword: {
        type: String,
        required: true,
    }
}, { timestamps: true });

module.exports = mongoose.model("Admin", AdminSchema);