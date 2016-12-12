var express = require('express');
var path = require('path');
var logger = require('morgan');
var session = require('express-session');
var bodyParser = require('body-parser');
var http = require('http');
var routes = require('./routes/index');
var users = require('./routes/users');
var port = (process.env.PORT || '3000');
var helmet = require('helmet');
var app = express();
app.use(helmet())

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret: 'keyboard cat', cookie: { maxAge: null  } }));
app.use('/', routes);
app.use('/users', users);

app.use(function(err,req,res,next){
  if(err.status == 404){
    next(err);
  }
  if(!res.headersSent){
    res.status(err.status || 500).render('simple_error', {error: err});
  }
});
// catch 404 and forward to error handler
app.use(function(err, req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.set('port', port);
var server = http.createServer(app);
console.log('Listening on ' + port);
server.listen(port);

var handleClose = function () {
  server.close(function () {
    console.log('Exiting!');
    process.exit(0);
  });
};
process.on('SIGTERM', handleClose);
process.on('SIGINT', handleClose);
