// require all the things
require('dotenv').load();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const morgan = require('morgan');
const session = require('cookie-session');
const passport = require('passport')
const routes = require('./routes/index');

// use middleware
app.use(morgan('tiny'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('_method'));
app.use(express.static(__dirname + '/public'));
app.use(session({
  secret: process.env.SECRET
}));

// initialize passport
app.use(passport.initialize());
app.use(passport.session());

require('./helpers/passport');

// view engine
app.set('view engine', 'jade');

// routers
app.use('/auth', routes.auth);
app.use('/users', routes.users)

app.get('/', function(req, res){
  res.redirect('/auth/login');
});

// listener
app.listen(3000, function() {
  console.log('starting localhost:3000');
});