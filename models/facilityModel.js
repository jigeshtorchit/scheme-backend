const mongoose = require('mongoose');

const facilitySchema = new mongoose.Schema({
  implementedBy: String,
  percentageOfDisability: Number,
  age: {
    minAge: Number,
    maxAge: Number,
  },
  incomeLimit: Number,
  genderEligibility: String,
  // Add other fields as needed
});

const Facility = mongoose.model('Facility', facilitySchema);

module.exports = Facility;
