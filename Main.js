//require dependencies
var express = require('express'),
    bodyParser = require('body-parser'),
    profileApi = require('./api/ProfileApi'),
    connectDomain = require('connect-domain'),
    morgan = require('morgan'),
    fs = require('fs'),
    bunyan = require('bunyan'),
    props = require('./config/Properties'),
    app = express();


//helpers
var logDir = __dirname + '/logs';

var makeLogDir = function () {
  if (!fs.lstatSync(logDir).isDirectory()) {
    fs.mkdirSync(logDir);
  }
};

var getAccessLogStream = function () {
  return fs.createWriteStream(logDir + '/access.log', {flags: 'a'});
};

var getLogger = function () {
  return bunyan.createLogger({
    name: 'app',
    streams: [
      {
        level: 'info',
        type: 'rotating-file',
        path: __dirname + '/logs/info.log',
        period: '1d',   // daily rotation
        count: 3        // keep 3 back copies
      },
      {
        level: 'error',
        type: 'rotating-file',
        path: __dirname + '/logs/error.log',
        period: '1d',   // daily rotation
        count: 3        // keep 3 back copies
      }
    ]
  });
}

var plumbEndpoints = function () {
  app.get('/', function (req, res) {
    res.send('hello world');
  });

  profileApi.wire(app);
}

//setup global logger
makeLogDir();
global.log = getLogger();


//configure express
app.set('json spaces', 2);                                      //json formatting
app.use(connectDomain());                                       //connect domain middle ware for error handling
app.use(bodyParser.urlencoded({ extended: false }));            // middleware for form encoded request bodies
app.use(bodyParser.json());                                     // middleware for json request bodies
app.use(morgan('combined', {stream: getAccessLogStream()}))     // middleware for access logging.

//plumb endpoints
plumbEndpoints();

//global error handler
app.use(function (err, req, res, next) {
  log.error(err);
  res.status(500).json({status: 500, message: "Unexpected server error.", reason: err.message}); // this catches the error!!
});

//start application by listening on port 3000
app.listen(3000);

//report that we're running.
var message = 'running on port: 3000'
log.info(message);
console.log(message);
console.log(JSON.stringify(props, null, 2));

