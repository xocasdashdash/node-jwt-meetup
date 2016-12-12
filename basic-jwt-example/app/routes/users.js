var express = require('express');
var router = express.Router();
var jsonSign = require('jsonwebtoken');
var jwtConfig = require('../jwt-config');
/* GET user info. */
router.get('/', function(req, res, next) {
  res.send({
    user: req.user
  });
});

router.post('/token', function(req, res, next) {
  if (req.body.username == 'admin' && req.body.password == 'admin') {
    jsonSign.sign({
      sub: req.body.usernam,
      last_login: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + (60 * 60),
      aud: jwtConfig.audience,
      iss: jwtConfig.issuer
    }, jwtConfig.secret, {
      algorithm: 'HS256'
    }, function(err, token) {
      res.send({
        token: token
      });
    });
  } else {
    let err = new Error('Bad authentication');
    err.status = 401;
    res.status(401).send({
      error: err
    });
    return next(err);
  }
});

module.exports = router;
