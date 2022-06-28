const express = require("express");
const router = express.Router();

const WooCommerce = require("../../services/woocommerce");

router.get("/", function (req, res) {

    WooCommerce.delete(`products/${req.productId}`)
        .then((response) => {
          if(response) return res.json({success:true})
        })
        .catch((error) => {
            if(error) return res.json({success:false, err: error})
        });
 
});

module.exports = router;
