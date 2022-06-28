const express = require("express");
const router = express.Router();
const dateformat = require("dateformat");
const WooCommerce = require("../../services/woocommerce");

router.get("/", function (req, res) {
  let today = new Date();
  let start = new Date();

  start.setDate(today.getDate() - 30);
  WooCommerce.get("reports/sales", {
    date_min: dateformat(start, "yyyy-mm-dd"),
    date_max: dateformat(today, "yyyy-mm-dd"),
  }).then((result) => {
    if (!result.data) return res.json({ no_report: true });
    return res.json(result.data);
  });
});

module.exports = router;
