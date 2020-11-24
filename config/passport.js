const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const admins = require('../models/admin');

module.exports = function(passport){
  passport.use(
    new LocalStrategy({usernameField:'email'},(email,password,done)=>{
      admins.findOne({email: email })
        .then(user =>{
          if (!user) {
            console.log("error");
            return done(null,false,{message:'That username is not registered'});
          }
          bcrypt.compare(password,user.password,(err,isMatch) =>{
            if (err) {
              console.log(err);
            }
            if(isMatch){
              return done(null,user);
            }else{
              return done(null,false,{message:'Password Incorrect'});
            }
          });
        })
        .catch(err => console.log(err));

    })
  );
  passport.serializeUser((user, done) => {
     done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
     admins.findById(id,(err, user) => {
        done(err, user);
     });
  });
}
