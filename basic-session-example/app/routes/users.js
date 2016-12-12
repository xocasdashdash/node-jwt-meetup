var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  var sess = req.session;
  if(!sess.user) {
      let err = new Error('Bad auth');
      err.status = 403;
      res.status(403).send('No permission :(');
      return next(err);
  }
  res.render('users', { title: 'Express', user: sess.user, last_login: sess.last_login });
});

router.post('/',function(req,res,next) {
  let sess = req.session;
  if (req.body.user == 'admin' && req.body.password == 'admin'){
      sess.user = {};
      sess.user = req.body.user;
      sess.last_login = Math.floor(Date.now()/1000);
      res.redirect('/users');
  }else {
      res.status(401).send('Bad authentication');
      let err = new Error('Bad authentication');
      err.status = 401;
      return next(err);
  }
});

router.all('/logout', function(req,res) {
  let sess = req.session;
  if(sess.user){
      sess.destroy();
  }
  res.redirect('/');

});


module.exports = router;
