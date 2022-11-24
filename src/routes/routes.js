const express = require('express');
const router = express.Router();
const bookingController = require("../controller/bookingController")

router.post("/create", bookingController.createEntry)


module.exports = router