var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var http = require('http');
var routes = require('./routes/index');
var users = require('./routes/users');
var port = (process.env.PORT || '3000');
var helmet = require('helmet');
var app = express();
var unless = require('express-unless');
var jwt = require('express-jwt');
var jwtConfig = require('./jwt-config');
app.use(helmet());

// uncomment after placing your favicon in /public
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use(jwt(jwtConfig).unless({
  path: ['/api/users/token']
}));

app.use('/api', routes);
app.use('/api/users', users);

app.use(function(err, req, res, next) {
  console.log('Erroraco', err);
  if (err.status == 404) {
    next(err);
  }
  if (!res.headersSent) {
    res.status(err.status || 500).send({
      error: err
    });
  }
});
// catch 404 and forward to error handler
app.use(function(err, req, res, next) {
  console.log(err);
  var error = new Error('Not Found');
  error.status = 404;
  next(error);
});

app.set('port', port);
var server = http.createServer(app);
console.log('Listening on ' + port);
server.listen(port);

var handleClose = function() {
  server.close(function() {
    console.log('Exiting!');
    process.exit(0);
  });
};
process.on('SIGTERM', handleClose);
process.on('SIGINT', handleClose);
