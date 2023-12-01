const Facility = require('../models/facilityModel');

const extractNumericValue = (percentage) => {
    if (percentage) {
        const match = percentage.match(/\d+/); // Extract numeric digits
        return match ? parseInt(match[0], 10) : null; // Convert to integer
    }
    return null;
};

async function filterFacilities(req, res) {
    try {
        const {
            implementedBy,
            percentageOfDisability,
            minAge,
            maxAge,
            incomeLimit,
            genderEligibility
        } = req.body;

        const percentageNumeric = extractNumericValue(percentageOfDisability);
        // Log the data in the collection
        const allFacilities = await Facility.find({});
        console.log('All Facilities:', allFacilities);


        const filter = {
            implementedBy: { $regex: new RegExp(implementedBy, 'i') },
            percentageOfDisability: percentageNumeric !== null ? percentageNumeric : { $exists: true },
            'age.minAge': minAge ? { $lte: parseFloat(minAge) } : { $exists: true },
            'age.maxAge': maxAge ? { $gte: parseFloat(maxAge) } : { $exists: true },
            incomeLimit: incomeLimit ? parseFloat(incomeLimit) : { $exists: true },
            genderEligibility: genderEligibility ? { $regex: new RegExp(genderEligibility, 'i') } : { $exists: true },
        };

        console.log('Constructed Filter:', filter);
        const filteredFacilities = await Facility.find(filter);
        console.log('Filtered Facilities:', filteredFacilities);

        res.json(filteredFacilities);
    } catch (error) {
        console.error('Error filtering facilities:', error);
        res.status(500).send('Internal Server Error');
    }
}

module.exports = {
    filterFacilities
};
