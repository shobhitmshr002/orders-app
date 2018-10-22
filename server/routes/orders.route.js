// npm packages
const express = require("express");

// app imports
const {
    readOrders
} = require("../controllers/order.controller");

// globals
const router = express.Router();
/* All the Orders Route */
router
    .route("")
    .get(readOrders);

module.exports = router;