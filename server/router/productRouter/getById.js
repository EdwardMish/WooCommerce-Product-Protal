const express = require("express");
const router = express.Router();

const WooCommerce = require("../../services/woocommerce");

router.get("/", function (req, res) {
    WooCommerce.get(`products/${req.productId}`)
        .then((response) => {
          return res.json(response.data)
        })
        .catch((error) => {
            if(error) return res.json({success:false, err: error})
        });
});

module.exports = router;
