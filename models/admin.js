const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const adminSchema = new Schema({
  email : String,
  password : String,
})

const admins = mongoose.model("admins",adminSchema);

module.exports = admins;
