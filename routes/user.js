const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport =require('passport');
const LocalStrategy =require('passport-local').Strategy;
const User =require('../models/User');
const {userAuthenticated} = require('./auth');


router.get('/',(req,res) => {
    //inser
  //  User.create({ userName: 'kawan',password: 'tawaw' }).then(newdata => console.log(newdata)).catch(err => console.log(err));
  //read
   User.find({}).lean().then(users =>{res.render('home/index',{users:users}); console.log(users)}).catch(err => res.send('error'));
 })
 
 router.get('/create',userAuthenticated,(req,res) => {
    res.render('user/create');
 });

 router.post('/create',(req,res) => {
    const salt = bcrypt.genSaltSync(15);
    const hash = bcrypt.hashSync(req.body.password, salt);
    User.create({ userName: req.body.userName,password: hash }).then(newdata => console.log(newdata)).catch(err => console.log(err));
  res.send('data created !!!!');
});
 
 router.get('/login',(req,res) => {
     res.render('user/login');
  });
 

   
// APP LOGIN


passport.use(new LocalStrategy({usernameField: 'userName',
passwordField: 'password'
},
  function(username, password, done) {
    User.findOne({ userName: username }, function(err, user) {
      if (err) {  //console.log('la dadas')
      return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
     const check= bcrypt.compareSync(password, user.password); // true

      if (!check) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });
  router.post('/login',(req,res,next) => {
   // console.log('flash msg:', req.flash('error'));

    passport.authenticate('local', {
      successRedirect: '/user',
      failureRedirect: '/user/login',
      failureFlash: true

  })(req, res, next);

 });
 
 router.get('/update',(req,res) => {
   res.render('user/update')
 });
 
 router.put('/update',(req,res) => {
   res.json(req.body);
 });
 


module.exports = router;