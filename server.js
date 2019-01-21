// Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

// Set up express
var app = express();
var PORT = process.env.PORT || 8080;

// Data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// Start server
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});

// Connect HTML and API routes
require('./app/routing/htmlRoutes.js')(app);
require('./app/routing/apiRoutes.js')(app);