var jwt = require("jsonwebtoken");
var jwtConfig = require("./jwtConfig");

function checkAuth(req, res, next) {
  var token = req.headers["x-access-token"];
  // var token = req.headers.authorization;

  if (!token) {
    return res.status(401).send("Unauthorized user. Missing token.");
  }

  jwt.verify(token, jwtConfig.secret, function(err, tokenData) {
    if (err) {
      return res
        .status(400)
        .send("Unauthorized access. Secret does not match.");
    }

    // console.log("tokenData", tokenData);

    req.user = tokenData.user;
    next();
  });
}

module.exports = checkAuth;