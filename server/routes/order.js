// npm packages
const express = require("express");
const passport = require("passport");

// app imports
const {
    createOrder,
    updateOrder
} = require("../controllers/order");

const router = express.Router();
// router.use(passport.authenticate("jwt", { session: false }));

/* All the Orders Route */

router
    .route("/")
    .post(createOrder);

/* Single Order by Id Route */
router
    .route("/:id")
    .put(updateOrder);   
    
module.exports = router;