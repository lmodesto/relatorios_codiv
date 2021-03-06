var express = require('express');
var consign = require('consign');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var addRequestId = require('express-request-id')();

module.exports = function(){
  var app = express();

  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());

  app.use(expressValidator());
  app.use(addRequestId);

  consign()
   .include('controllers')
   .then('persistencia')
   .then('rotas')
   .then('services')
   .then('swaggerDoc.js')
   .into(app);

   return app;
}
