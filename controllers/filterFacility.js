const scheme = require('../models/scheme');

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

        const filter = {
            implementedBy: implementedBy ? { $regex: new RegExp(implementedBy, 'i') } : { $exists: true },
            percentageOfDisability: percentageOfDisability ? percentageOfDisability : { $exists: true },
            minAge: minAge ? minAge : { $exists: true },
            maxAge: maxAge ? maxAge : { $exists: true },
            incomeLimit: incomeLimit ? incomeLimit : { $exists: true },
            genderEligibility: genderEligibility ? genderEligibility : { $exists: true },
        };

        try{
            const filteredFacilities = await scheme.find(filter);
        res.json(filteredFacilities);
        }   catch(error){
            console.log(error)
        }
       
        
    } catch (error) {
        console.error('Error filtering facilities:', error);
        res.status(500).send('Internal Server Error');
    }
}

module.exports = {
    filterFacilities
};
