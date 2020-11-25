const express = require('express');
const users = require('../models/user');
const multer = require('multer');
const path = require('path');

const listings = require('../models/listing');

let router = express.Router();



const Storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../public/uploads')
  },
  filename:(req,file,cb)=>{
    cb(null,file.fieldname+"_"+Date.now()+path.extname(file.originalname));
  }
})

const upload = multer({
  storage : Storage
}).single('pdf');


router
.get("",function(req,res){
  listings.find({},function(err,totalItems){
    if (err) {
      console.log(err);
    }else {
      res.render("home",{listings : totalItems});
    }
  });
})

router
.get("/contactUs",function(req,res){
  res.render("contact");
})

router
.get("/register",function(req,res){
  res.render("register");
})
.post("/register",upload,function(req,res){
  const newUser = new users({
    name : req.body.name,
    dateofbirth : req.body.dob,
    email : req.body.email,
    pdf : req.file,
  });
  newUser.save(function(err){
    if (err) {
      console.log(err);
    }else {
      res.render("register");
    }
  });
})

module.exports = router;
