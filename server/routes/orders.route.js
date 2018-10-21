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
    .get(function (req, res) {
      readOrders(req,res,function(orders){
        if(!orders.length){
          res.status(500);
          res.send(orders);
        }else{
          res.json(orders);
        }
      });
    });

module.exports = router;