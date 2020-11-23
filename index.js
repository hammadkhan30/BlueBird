const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const ejs = require('ejs');
const multer = require('multer');
const path = require('path');

const homeroute = require('./routes/homeroute');
const adminroute = require('./routes/adminroute');

const app = express();

app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.use('/home',homeroute);
app.use('./admin',adminroute);

mongoose.connect("mongodb://localhost:27017/BlueBirdDB",{useNewUrlParser:true});
mongoose.set("useCreateIndex",true);

app.get("/",function(req,res){
  res.render("home");
})

app.listen(3000,err => {
  if (err) {
    return console.log(err);
  }else {
    console.log('Listening on port 3000');
  }
});
