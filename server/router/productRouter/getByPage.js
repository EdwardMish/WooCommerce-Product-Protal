const express = require("express");
const router = express.Router();
const WooCommerce = require("../../services/woocommerce");

router.get("/", function (req, res) {
  const pageId = req.pageId;
  const numberPerPage = req.numberPerPage;

  WooCommerce.get(
    "products?page=" + pageId + "&per_page=" + numberPerPage + "&status=publish"
  )
  .then((products) => {
    if (!products) {
      res.json({ success: false, message: "no products found" });
    } else {
      res.json({ pageProducts: products.data });
    }
  })
  .catch((err) => {
    res.status(500).send("Internal Error");
  });

});

module.exports = router;
