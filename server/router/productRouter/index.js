const express = require("express");
const router = express.Router();
const productTotal = require("./getTotal.js");
const productGetByPage = require("./getByPage");
const deleteProduct = require("./deleteProduct");
const getById = require("./getById");
const getVariations = require("./getVariations");

router.use("/total", productTotal);
router.use(
  "/getByPage/:pageId/:numberPerPage",
  function (req, res, next) {
    req.pageId = req.params.pageId;
    req.numberPerPage = req.params.numberPerPage;
    next();
  },
  productGetByPage
);
router.use(
  "/delete/:productId",
  function (req, res, next) {
    req.productId = req.params.productId;
    next();
  },
  deleteProduct
);
router.use(
  "/getById/:productId",
  function (req, res, next) {
    req.productId = req.params.productId;
    next();
  },
  getById
);
router.use(
  "/getById/:productId/variations",
  function (req, res, next) {
    req.productId = req.params.productId;
    next();
  },
  getVariations
);
module.exports = router;
