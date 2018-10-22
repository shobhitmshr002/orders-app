// npm packages
const express = require("express");

// app imports
const {
    createOrder,
    updateOrder
} = require("../controllers/order.controller");

// globals
const router = express.Router();
/* All the Orders Route */
router
    .route("/")
    .post(createOrder);

/* Single Order by Id Route */
router
    .route("/:id")
    .put(updateOrder);   
    
module.exports = router;