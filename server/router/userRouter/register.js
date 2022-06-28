const express = require("express");
const router = express.Router();
const path = require("path");
const userModel = require("../../models/user_schema");

router.post("/", async (req, res) => {
  const user = new userModel(req.body);
  const userData = req.body;
  const findUser = await userModel.findOne({ email: userData.email });
  if (findUser)
    res.status(400).json({
      SignupSuccess: false,
      message: "Email is already in use.",
    });
  // create new user
  else {
    user.save((err, userInfo) => {
      if (err) return res.status(400).json({ success: false, err });
      return res.status(200).json({ success: true });
    });
  }
});

module.exports = router;
