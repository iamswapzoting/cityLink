const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    fullName: {
        type: String,
        required: true

    },
    mobile: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    }
},
    { timestamps: true })

module.exports = mongoose.model("User", userSchema)