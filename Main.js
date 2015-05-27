//require dependencies
var express = require('express'),
    fs = require('fs'),
    _ = require('lodash');

//instantiate an app instance
var app = express();

//configure express
app.set('json spaces', 2);

//expose hello world
app.get('/', function (req, res) {
  res.send('hello world');
});

//expose 'profiles' collection
app.get('/api/profiles', function (req, res) {
  fs.readFile('Data.json', 'utf8', function (err, data) {
    return res.json(JSON.parse(data));
  });
});

app.get('/api/profiles/:id', function (req, res) {
  fs.readFile('Data.json', 'utf8', function (err, data) {

    data = JSON.parse(data)
    data = _.findWhere(data, {id: req.params.id});

    if (!data) {
      return res.status(422).json({
        code: 422,
        message: 'Unprocessable Entity',
        reason: 'The profile you requested does not exist.'
      });
    }

    return res.json(data);
  });
});

//start application by listening on port 3000
app.listen(3000);
console.log('running on port: 3000');


