const express = require("express");
const router = express.Router();
const path = require("path");
const userModel = require("../../models/user_schema");
const update = require("../../middleware/update");

router.post("/", update, async (req, res) => {
  const user = new userModel(req.update_user);
  user.firstname = req.body.firstname;
  user.lastname = req.body.lastname;
  user.email = req.body.email;
  user.password = req.body.password;
  user.save((err, user) => {
    if (err) return res.status(400).json({ success: false, err });
    return res.status(200).json({ success: true, userInfo: user });
  });
});

module.exports = router;
