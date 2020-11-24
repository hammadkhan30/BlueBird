const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const listingSchema = new Schema({
  cname : String,
  country : String,
  dob : String,
  nvacancy : String,
  descryption : String,
})

const listings = mongoose.model("listings",listingSchema);

module.exports = listings;
