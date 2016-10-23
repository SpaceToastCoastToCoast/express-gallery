const express = require('express');
const bodyParser = require('body-parser');
const CONFIG = require('./config/config.json');
const validate = require('./middleware/validation');
const log = require ('./middleware/log');
const app = express();
const authenticate = require('./middleware/authentication');
const passport = require('passport');
const bcrypt = require('bcrypt');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const flash = require('connect-flash');
const gallery = require('./routes/gallery');
const db = require('./models');
const Photo = db.Photo;
const User = db.User;

app.use(express.static('./public'));
app.set('view engine', 'pug');
app.set('views', './views');
app.use(bodyParser.urlencoded({ extended: true}));
app.use(flash());
app.use(session({
  store: new RedisStore(),
  secret: CONFIG.SECRET,
  resave: false,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(authenticate.ls);

app.use('/gallery', gallery);

app.use(log);

app.listen(3000, function() {
  db.sequelize.sync();
});

app.get('/login', (req, res) => {
  res.render('login', {
    status: 'valid',
    failureMsg: req.flash('error')[0]
  });
});

app.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

app.post('/login', passport.authenticate('local', {
    successRedirect: '/gallery',
    failureRedirect: '/login',
    failureFlash: 'Invalid login'
}));

let isLoggedIn = (req) => {
  if(req.user !== undefined && req.user !== false) {
    return true;
  }
  return false;
};

app.get('/', function(req, res) {
  //to view list of gallery photos
  if(req.user === undefined) {
    username = 'Not logged in';
  } else {
    username = req.user.username;
  }
  Photo.findAll({
    order: [['id', 'DESC']]
  })
  .then((photos) => {
    res.render('gallery', {
      featured: photos.shift(),
      gallery: photos,
      isLoggedIn: isLoggedIn(req),
      username: username
    });
  });
});

app.post('/users', validate.userValidate, (req, res) => {
  //to create a new gallery photo
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(req.body.password, salt, (err, hash) => {
      User.create({ username: req.body.username,
        password: hash,
        emailaddress: req.body.email,
        role: 'USER'})
      .then((user) => {
        res.render('login', {status: 'valid'});
      })
      .catch((err) => {
        //req.flash('info', 'Invalid input in user account fields');
        res.render('login', {status: 'invalid'});
      });
    });
  });
});

app.get('/:page', (req, res) => {
  res.status(404).render('404');
});

module.exports = app;