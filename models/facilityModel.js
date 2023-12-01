const mongoose = require('mongoose');

const facilitySchema = new mongoose.Schema({
  implementedBy: String,
  percentageOfDisability: Number,
  age: {
    minAge: Number,
    maxAge: Number,
  },
  incomeLimit: Number,
  genderEligibility: String
});

const Facility = mongoose.model('Facility', facilitySchema);

module.exports = Facility;
