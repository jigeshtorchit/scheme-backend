const mongoose = require('mongoose');

const scheme = new mongoose.Schema({
    niProvider: {
        type: String,
        required: true,
    },
    schemeName: {
        type: String,
        required: true,
    },
    implementedBy: {
        type: String,
        required: true,
    },
    domainDescription: {
        type: String,
        required: true,
    },
    eligibleDisabilities: {
        type: String,
        required: true,
    },
    percentageOfDisability: {
        type: String,
        required: true,
    },
    age: {
        type: String,
        required: true,
    },
    annualIncome: {
        type: String,
        required: true,
    },
    genderEligibility: {
        type: String,
        required: true,
    },
    attachments: {
        type: String,
        required: true,
    },
    comments: {
        type: String,
        required: true,
    },
    emailAddress: {
        type: String,
        required: true,
    },
}, {
    timestamps: true
});

const Scheme = mongoose.model('Scheme', scheme);

module.exports = Scheme;
