// npm packages
const express = require("express");
const passport = require("passport");

// app imports
const {
    createOrder,
    updateOrder
} = require("../controllers/order.controller");

const requireAdmin = require("../middleware/require-admin");
// globals
const router = express.Router();
router.use(passport.authenticate("jwt", { session: false }),requireAdmin);

/* All the Orders Route */

router
    .route("/")
    .post(createOrder);

/* Single Order by Id Route */
router
    .route("/:id")
    .put(updateOrder);   
    
module.exports = router;