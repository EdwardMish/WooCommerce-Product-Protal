const express = require("express");
const router = express.Router();
const userModel = require("../../models/user_schema");
const mailer = require("../../services/emailServer");

router.post("/", (req, res) => {
  const email = req.body.email;
  userModel.findOne({ email: email }, function (err, user) {
    if (err) return res.json("error occurred");
    if (!user)
      return res.json({
        message:
          "The email address " +
          req.body.email +
          " is not associated with any account. Double-check your email address and try again.",
      });
    user.generatePasswordReset();
    user
      .save()
      .then((user) => {
        let link =
          "http://" +
          req.hostname +
          ":3006/reset-password?hash=" +
          user.resetPasswordToken;
        const mailOptions = {
          to: email,
          from: "abbasmirzawork@gmail.com",
          subject: "Password change request",
          text: `Hi ${user.firstname} \n 
        Please click on the following link ${link} to reset your password. \n\n 
        If you did not request this, please ignore this email and your password will remain unchanged.\n`,
        };
        mailer.sendEmail(mailOptions);
        return res.json({ success: true, message: "Please check your email" });
      })
      .catch((err) => res.status(500).json({ message: err.message }));
  });
});

module.exports = router;
