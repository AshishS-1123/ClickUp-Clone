var express = require('express');

var app = new express();

// Just to test our server is working
app.get('/api', function (req, res) {
  res.send({
    version: '1.0.0'
  });
});

module.exports = app;
