var createError = require('http-errors');
// https://www.npmjs.com/package/http-errors

var express = require('express');
var path = require('path');
var logger = require('morgan');

var app = express();

// redis and session configs
const redis = require('redis')
const session = require('express-session')
const RedisStore = require('connect-redis')(session)
var redisClient = redis.createClient()
redisClient.on('error', function(err) {
  console.error(err)
})
app.use(
  session({
    store: new RedisStore({ client: redisClient }),
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
  })
)


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, './public')));


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://127.0.0.1:8000"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Origin", "http://localhost:8000")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


app.use('/', function(req, res, next) {
  try {
    // console.log("req.method", req.method);
    // console.log("req.session", req.session)
    if (req.session.user) {
      res.locals.isLogin = req.session.isLogin;
      res.locals.user = req.session.user || {};
    }
    return next()
  } catch (e) {
    next(e)
  }
})
//
const oauth = require('./routes/oauth');
app.use(oauth)

var routes = require('./routes');
app.use('/api', routes)
app.get('/', function(req, res) {
  res.locals.isLogin = req.session.isLogin || false
  if (req.session.isLogin) {
    res.locals.user = req.session.user || 'fuck'
    res.render('platform')
  }
  else{
    res.render('user-management')
  }
})
app.post('/register', function(req, res) {
  try {
    res.send({
      message: "FUCK success"
    })
  } catch (e) {
    console.log(e);
    throw(createError(500, e))
  }
})

app.get('/products', function(req, res) {
  res.render('platform')
})

app.post('/product' ,function(req, res) {
  console.log(req.formObject);
  res.status(200).json(req.formObject)
})

app.get('/shopping-cart', function(req, res) {
  res.locals = {
    staticJsFile: 'shopping-cart.js'
  }
  res.render('shopping-cart',{layout: 'platform'})
})

app.get('/product-editor', function(req, res) {
  res.locals = {
    staticJsFile: 'product-editor.js'
  }
  res.render('product-editor',{layout: 'platform'})
  // res.sendFile(path.join(__dirname, './public/shopping-cart.html'));
})

var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })
app.put('/image/upload',function(req, res) {
  console.log("FUCK", req.body);
  res.status(200).json(req.body)
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  if (req.xhr) {
    res.status(500).send({ error: err.message });
  }
  else{
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.render('error');
  }
});


var http = require('http');
/**
 * Get port from environment and store in Express.
 */
var port = normalizePort(process.env.APP_PORT || '8000');
app.set('port', port);


/**
 * Create HTTP server.
 */

var server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

// app.on('error', onError);

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  console.log('Listening on ' + bind);
}
