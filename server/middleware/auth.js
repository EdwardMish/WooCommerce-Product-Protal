const userModel = require("../models/user_schema");

let auth = (req, res, next) => {
  var token = req.cookies.x_auth;
  userModel.findByToken(token, (err, user) => {
    if (err) throw err;
    if (!user) return res.json({ isAuth: false, error: true });
    req.token = token;
    req.user = user;
    next();
  });
};

module.exports = auth;
