const mongoose = require("mongoose")

const bookingSchema = new mongoose.Schema({
    context: {
        type: String,
        required: true,
        trim: true
    },
    type: {
        type: String,
        required: true,
        trim: true,
    },
    status: {
        type: String,
        enum: ["Pending", "Confirmed", "Cancelled"],
        trim:true

    },
    bookingId: {
        type: String,
        required: true,
        trim: true,
    },
    source: {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        address: {
            address: {
                type: String,
                required: true,
                trim: true,
            },
            location: {
                type: String,
                required: true,
                trim: true,
            },
            city: {
                type: String,
                required: true,
                trim: true,
            },
            state: {
                type: String,
                required: true,
                trim: true,
            },
            postalCode: {
                type: Number,
                required: true,
                trim: true,
            },
            country: {
                type: String,
                required: true,
                trim: true,
            }

        },
        latitude: {
            type: String,
            required: true,
            trim: true,
        },
        longitude: {
            type: String,
            required: true,
            trim: true,
        }
    },
    destination: {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        address: {
            address: {
                type: String,
                required: true,
                trim: true,
            },
            location: {
                type: String,
                required: true,
                trim: true,
            },
            city: {
                type: String,
                required: true,
                trim: true,
            },
            state: {
                type: String,
                required: true,
                trim: true,
            },
            postalCode: {
                type: Number,
                required: true,
                trim: true,
            },
            country: {
                type: String,
                required: true,
                trim: true,
            },
            coordinates: {
                latitude: {
                    type: String,
                    required: true,
                    trim: true,
                },
                longitude: {
                    type: String,
                    required: true,
                    trim: true,
                },
            },

        }
    },
    bookingTime: {
        type: Date
    },
    pickupTime: {
        type: Date
    }
}, { timestamps: true })

module.exports = mongoose.model("Booking", bookingSchema)