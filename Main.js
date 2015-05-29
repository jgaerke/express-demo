//require dependencies
var express = require('express'),
    bodyParser = require('body-parser'),
    profileApi = require('./api/ProfileApi');

//instantiate an app instance
var app = express();

//configure express
app.set('json spaces', 2);
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

//expose hello world
app.get('/', function (req, res) {
  res.send('hello world');
});

profileApi.wire(app);

//start application by listening on port 3000
app.listen(3000);
console.log('running on port: 3000');


