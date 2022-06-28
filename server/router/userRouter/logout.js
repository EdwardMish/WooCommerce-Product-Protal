const express = require("express");
const router = express.Router();
const path = require("path");
const userModel = require("../../models/user_schema");
const auth = require("../../middleware/auth");

router.get("/", auth, (req, res) => {
  userModel.findOneAndUpdate(
    { _id: req.user._id },
    { token: "" },
    function (err, user) {
      if (err) return res.status(400).json(err);
      return res.status(200).json({ success: true });
    }
  );
});

module.exports = router;
