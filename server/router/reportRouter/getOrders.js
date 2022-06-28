const express = require("express");
const router = express.Router();
const dateformat = require("dateformat");
const WooCommerce = require("../../services/woocommerce");

router.get("/", function (req, res) {
  let today = new Date();
  let start = new Date();
  start.setDate(today.getDate() - 7);
  WooCommerce.get("orders").then((result) => {
    if (!result.data) return res.json({ no_report: true });
    return res.json(result.data);
  });
});

module.exports = router;
