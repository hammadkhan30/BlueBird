const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const mongoose = require('mongoose');
const ejs = require('ejs');
const multer = require('multer');
const path = require('path');

const listings = require('./models/listing');

const homeroute = require('./routes/homeroute');
const adminroute = require('./routes/adminroute');

const app = express();

app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.use('/home',homeroute);
app.use('/admin',adminroute);

mongoose.connect("",{useNewUrlParser:true});
mongoose.set("useCreateIndex",true);

app.get("/",function(req,res){
  listings.find({},function(err,totalItems){
    if (err) {
      console.log(err);
    }else {
      res.render("home",{listings : totalItems});
    }
  });
})

app.listen(3000,err => {
  if (err) {
    return console.log(err);
  }else {
    console.log('Listening on port 3000');
  }
});
