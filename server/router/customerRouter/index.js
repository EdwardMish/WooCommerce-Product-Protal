const express = require("express");
const router = express.Router();
const customerAll = require("./getCustomersAll.js");
const customerGetByPage = require("./getByPage");

router.use("/all", customerAll);
router.use(
  "/getByPage/:pageId/:numberPerPage",
  function (req, res, next) {
    req.pageId = req.params.pageId;
    req.numberPerPage = req.params.numberPerPage;
    next();
  },
  customerGetByPage
);
module.exports = router;
