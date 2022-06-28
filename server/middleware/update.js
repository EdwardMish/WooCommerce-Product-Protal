const userModel = require("../models/user_schema");

let update = (req, res, next) => {
  var token = req.cookies.x_auth;
  const user = new userModel(req.body);
  if (!token)
    return res.status(200).json({ isUpdate: false, error: "unauthorized" });
  userModel.findByToken(token, (err, user) => {
    if (err) throw err;
    if (!user) return res.status(200).json({ isUpdate: false, error: true });
    req.update_user = user;
    next();
  });
};

module.exports = update;
