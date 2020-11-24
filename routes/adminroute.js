const express = require('express');
const session = require('express-session');
const bcrypt = require('bcrypt');
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');

const listings = require('../models/listing');
const admins = require("../models/admin");
const {ensureAuthenticated} = require('../config/auth');

let router = express.Router();

require('../config/passport')(passport);

router.use(session({
  secret: "Yo Yo Yo",
  resave: false,
  saveUninitialized: false
}));

router.use(passport.initialize());
router.use(passport.session());

router
.get("",function(req,res){
  res.render("login");
})
.post("",function(req,res,next){
  passport.authenticate('local',{
    successRedirect : '/admin/home',
    failureRedirect : '/admin'
  })(req,res,next);
})

router.get("/admin/signout",function(req,res){
  req.logout();
  res.redirect('/admin')
})

router
.get("/reg",function(req,res){
  res.render("ad");
})
.post("/reg",function(req,res){
  const {email,password } = req.body;
  admins.findOne({email : email})
    .then(user => {
      if (user) {
        errors.push({msg: 'username is already registered'});
        res.render('ad',{
          email,
          password
        });
      }else {
        const newadmin = new admins({
          email,
          password
        });
        bcrypt.genSalt(10,(err,salt) =>
        bcrypt.hash(newadmin.password,salt,(err,hash)=>{
          if (err) {
            console.log(err);
          }
          newadmin.password = hash;
          newadmin.save()
            .then( admins => {
              res.render("login");
            })
            .catch(err => console.log(err));
        }))
      }
    });
})

router
.get("/home",ensureAuthenticated,function(req,res){
  res.render("adminhome");
})

router
.get("/home/addlisting",ensureAuthenticated,function(req,res){
  res.render("addlisting");
})
.post("/home/addlisting",function(req,res){
  const newlisting = new listings({
    cname : req.body.cname,
    country : req.body.country,
    dob : req.body.dob,
    nvacancy : req.body.nvacancy,
    descryption : req.body.descryption,
  });
  newlisting.save(function(err){
    if (err) {
      console.log(err);
    }else {
      res.render("addlisting");
    }
  });
})

router.get("/home/",ensureAuthenticated,function(req,res){
  res.render("");
})

module.exports = router;
