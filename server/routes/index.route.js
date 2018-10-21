const express = require("express");
const userRoutes = require("./user.route");
const authRoutes = require("./auth.route");
const orderRoutes = require("./order.route");
const ordersRoutes = require("./orders.route");
const router = express.Router(); // eslint-disable-line new-cap

/** GET /health-check - Check service health */
router.get("/health-check", (req, res) =>
    res.send("OK")
);

router.use("/auth", authRoutes);
router.use("/user", userRoutes);
router.use("/order", orderRoutes);
router.use("/orders", ordersRoutes);

module.exports = router;
