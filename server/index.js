"use strict";
var express = require('express');
var expressws = require('express-ws');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var swig = require('swig');
var api = require('./api');
var app = express();

/*
if (app.get('env') == 'development') {
  var browserSync = require('browser-sync');
  var bs = browserSync({ logSnippet: false });
  app.use(require('connect-browser-sync')(bs));
}
*/
// view engine setup
app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');

  next();
});
app.use(cookieParser());



app.use(express.static(path.join(__dirname, '../')));
app.set('port', process.env.PORT || 9002);
app.use('/', api);

console.log(' Environment: '  + app.get('env'));


 var server = app.listen(app.get('port'),

 function (err) {

  if (err) {
    console.log('Error: ' + err);
  }
   console.log('Express server listening on port ' + server.address().port);

  });

expressws.target = {};
 var ws = expressws(app, server);

 module.exports = app;
