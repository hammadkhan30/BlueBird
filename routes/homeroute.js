const express = require('express');
const users = require('../models/user');
const multer = require('multer');
const path = require('path');
const upload = require('express-fileupload');

const listings = require('../models/listing');

let router = express.Router();

router.use(upload());

// const storage = multer.diskStorage({
//   destination : function(req,file,cb){
//     cb(null,'../public/uploads/');
//   },
//   filename : function(req,file,cb){
//     cb(null,file.originalname + '-' + Date.now() + '.pdf');
//   }
// });
//
// const upload = multer({storage:storage});


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
.post("/register",function(req,res){
  var loc = __dirname + "/uploads/" + req.body.name + ".pdf";
  const newUser = new users({
    name : req.body.name,
    dateofbirth : req.body.dob,
    email : req.body.email,
    pdf : loc
  });
  newUser.save(function(err){
    if (err) {
      console.log(err);
    }
  });
  if (req.files) {
    var file = req.files.pdf
    var filename = req.body.name + ".pdf"

    file.mv('./routes/uploads/' + filename,function(err){
      if (err) {
        console.log(err);
      }else {
        res.render("register");
      }
    })
  }
})

module.exports = router;
