//require dependencies
var express = require('express'),
    bodyParser = require('body-parser'),
    fs = require('fs'),
    _ = require('lodash'),
    uuid = require('node-uuid');

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

//expose 'profiles' collection
app.get('/api/profiles', function (req, res) {
  fs.readFile('Data.json', 'utf8', function (err, data) {
    var profiles, results, status;

    profiles = JSON.parse(data);
    results = _.filter(profiles, _.omit(req.query, 'sort', 'page', 'size'));

    status = 200;
    if(results.length < profiles.length) status = 206;
    if(results.length == 0) status = 204;

    return res.status(status).json(results);
  });
});

//expose 'profile' resource
app.get('/api/profiles/:id', function (req, res) {
  fs.readFile('Data.json', 'utf8', function (err, data) {
    var profiles, profile;

    profiles = JSON.parse(data)
    profile = _.findWhere(profiles, {id: req.params.id});

    if(!isProfilePresent(profile, res)) return;

    return res.json(data);
  });
});

//expose 'profile' resource creation
app.post('/api/profiles', function (req, res) {
  var body = req.body;

  if (!isProfileValid(body, res)) return;

  body.id = uuid.v4();

  fs.readFile('Data.json', 'utf8', function (err, data) {
    var profiles = JSON.parse(data);
    profiles.push(body);
    fs.writeFile("Data.json", JSON.stringify(profiles, null, 2), function (err) {
      res.append('Link', 'http://localhost:3000/api/profile/' + body.id);
      return res.status(201).json(body);
    });
  });
});

//expose 'profile' resource update
app.put('/api/profiles/:id', function (req, res) {
  var id, body;

  id = req.params.id;
  body = req.body;

  if (!isProfileValid(body, res)) return;

  body.id = req.params.id;

  fs.readFile('Data.json', 'utf8', function (err, data) {
    var profiles, profile

    profiles = JSON.parse(data);
    profile = _.findWhere(profiles, {id: id});

    if(!isProfilePresent(profile, res)) return;

    profiles = _.remove(profiles, function(entry) {
      return entry.id == profile.id
    });
    profiles.push(body);

    fs.writeFile("Data.json", JSON.stringify(profiles, null, 2), function (err) {
      return res.status(200).json(body);
    });
  });
});

//expose 'profile' resource patch
app.patch('/api/profiles/:id', function (req, res) {
  var id, body;

  id = req.params.id;
  body = req.body;


  body.id = req.params.id;

  fs.readFile('Data.json', 'utf8', function (err, data) {
    var profiles, profile

    profiles = JSON.parse(data);
    profile = _.findWhere(profiles, {id: id});

    if(!isProfilePresent(profile, res)) return;

    _.assign(profile, body);

    fs.writeFile("Data.json", JSON.stringify(profiles, null, 2), function (err) {
      return res.status(200).json(body);
    });
  });
});

//expose 'profile' resource delete
app.delete('/api/profiles/:id', function (req, res) {
  var id, body;

  id = req.params.id;
  body = req.body;

  fs.readFile('Data.json', 'utf8', function (err, data) {
    var profiles, profile

    profiles = JSON.parse(data);
    profile = _.findWhere(profiles, {id: id});

    if(!isProfilePresent(profile, res)) return;

    profiles = _.remove(profiles, function(entry) {
      return entry.id == profile.id
    });

    fs.writeFile("Data.json", JSON.stringify(profiles, null, 2), function (err) {
      return res.status(204);
    });
  });
});

var isProfileValisd = function (profile, res) {
  if (!profile.age || !profile.first || !profile.last || !profile.email || !profile.phone) {
    return res.status(400).json({
      code: 400,
      message: 'Bad Request',
      reason: 'The profile you is missing required fields.'
    });
    return false;
  }
  return true;
};


var isProfilePresent = function(profile, res) {
  if (!profile) {
    res.status(422).json({
      code: 422,
      message: 'Unprocessable Entity',
      reason: 'The profile you requested does not exist.'
    });
    return false;
  }
  return true;
};

//start application by listening on port 3000
app.listen(3000);
console.log('running on port: 3000');


