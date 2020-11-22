const express = require('express');
let router = express.Router();

router
.get("",function(req,res){
  res.render("home");
})

router
.get("/contactUs",function(req,res){
  res.render("contact");
})

module.exports = router;
