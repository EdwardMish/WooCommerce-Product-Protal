const express = require("express");
const router = express.Router();
const WooCommerce = require("../../services/woocommerce");
router.get("/", function (req, res) {
  WooCommerce.get("reports/customers/totals").then(function (result) {
    return res
      .status(200)
      .json({ allCustomers: result.data[0].total + result.data[1].total });
  });
});

module.exports = router;
