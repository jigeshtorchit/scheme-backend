const Facility = require('../models/facilityModel'); // Update the path accordingly

async function filterFacilities(req, res) {
    try {
        // Extract filter parameters from the request query
        const { implementedBy, percentageOfDisability, minAge, maxAge, incomeLimit, genderEligibility } = req.query;

        // Build the filter object based on provided parameters
        const filter = {
            implementedBy: implementedBy ? { $regex: new RegExp(implementedBy, 'i') } : { $exists: true },
            percentageOfDisability: percentageOfDisability ? parseFloat(percentageOfDisability) : { $exists: true },
            'age.minAge': minAge ? parseFloat(minAge) : { $exists: true },
            'age.maxAge': maxAge ? parseFloat(maxAge) : { $exists: true },
            incomeLimit: incomeLimit ? parseFloat(incomeLimit) : { $exists: true },
            genderEligibility: genderEligibility ? { $regex: new RegExp(genderEligibility, 'i') } : { $exists: true },
          };
          

        // Find facilities based on the filter
        const filteredFacilities = await Facility.find(filter);

        // Return the filtered facilities
        res.json(filteredFacilities);
    } catch (error) {
        console.error('Error filtering facilities:', error);
        res.status(500).send('Internal Server Error');
    }
}

module.exports = { filterFacilities };
