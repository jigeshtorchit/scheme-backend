const Facility = require('../models/facilityModel'); // Update the path accordingly

async function filterFacilities(req, res) {
    try {
        // Extract filter parameters from the request query
        const { implementedBy, percentageOfDisability, minAge, maxAge, incomeLimit, genderEligibility } = req.query;

        // Build the filter object based on provided parameters
        const filter = {
            implementedBy: implementedBy || { $exists: true },
            percentageOfDisability: percentageOfDisability || { $exists: true },
            'age.minAge': minAge || { $exists: true },
            'age.maxAge': maxAge || { $exists: true },
            incomeLimit: incomeLimit || { $exists: true },
            genderEligibility: genderEligibility || { $exists: true },
            // Add other fields as needed
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
