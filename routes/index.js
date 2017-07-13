var jwt = require("jsonwebtoken");
var jwtConfig = require("../jwtConfig");
var express = require("express");
var router = express.Router();

router.get("/", function(req, res, next) {
  var token = jwt.sign({ user: 'sessionUser' }, jwtConfig.secret, {
        expiresIn: 60 * 60 * 24
      });

      res.json({
        token: token
      });
});
module.exports = router;