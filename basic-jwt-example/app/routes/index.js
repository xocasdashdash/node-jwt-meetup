var express = require('express');
var router = express.Router();

/* GET home page. */
var views = 0;
router.post('/views', function(req, res, next) {
  res.status(200).send({views: ++views});
});
router.get('/views', function(req, res, next) {
  res.status(200).send({views: views});
});
module.exports = router;
