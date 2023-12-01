const mongoose = require('mongoose');

const facilitySchema = new mongoose.Schema({
    implementedBy: {
        type: String,
    },
    percentageOfDisability: {
        type: String,
    },
    age: {
        minAge: {
            type: Number,
        },
        maxAge: {
            type: Number,
        }
    },
    incomeLimit: {
        type: Number,
    },
    genderEligibility: {
        type: String,
    }
});

const Facility = mongoose.model('Facility', facilitySchema);

module.exports = Facility;
