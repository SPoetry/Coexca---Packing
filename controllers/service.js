const jwt = require("jwt-simple");
const moment = require("moment");
const config = require("../config");

exports.createToken = function (user) {
  const payload = {
    sub: user,
    iat: moment().unix(),
    exp: moment().add(4, "h").unix(),
  };

  return jwt.encode(payload, config.TOKEN_SECRET);
};
