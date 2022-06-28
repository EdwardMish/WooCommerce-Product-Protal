const express = require("express");
const router = express.Router();
const getSales = require("./getSales.js");
const getOrders = require("./getOrders")

router.use("/getSales", getSales);
router.use("/getOrders", getOrders);

module.exports = router;
