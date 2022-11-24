const mongoose = require("mongoose")

const vendorSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    fullName: {
        type: String,
        required: true

    },
    vehicleNumber: {
        type: String,
        required: true,
        unique: true
    },
    vehicleModel: {
        type: String,
        required: true
    }
},
    { timestamps: true })

module.exports = mongoose.model("Vendor", vendorSchema)