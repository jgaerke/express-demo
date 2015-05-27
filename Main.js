//require dependencies
var express = require('express');

//instantiate an app instance
var app = express();

//configure express
app.set('json spaces', 2);

//expose hello world
app.get('/', function (req, res) {
  res.send('hello world');
});

//start application by listening on port 3000
app.listen(3000);
console.log('running on port: 3000');


