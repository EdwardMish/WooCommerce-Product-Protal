const express = require("express");
const router = express.Router();

const WooCommerce = require("../../services/woocommerce");

router.get("/", function (req, res) {
  WooCommerce.get("reports/products/totals")
    .then((result) => {
      if (!result) {
        res.status(404).send("No Product");
      } else {
        let total = 0;
        result.data.forEach((products) => {
          total += products.total;
        });
        res.json({ allProducts: total });
      }
    })
    .catch((error) => {
      res.status(500).send("Internal Error");
    });
});

module.exports = router;
