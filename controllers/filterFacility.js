// const scheme = require('../models/scheme');

// async function filterFacilities(req, res) {
//   try {
//     const { implementedBy, incomeLimit, genderEligibility, percentageOfDisability } = req.query;

//     // Construct the filter object based on provided query parameters
//     const filter = {};

//     if (implementedBy) {
//       filter.implementedBy = { $regex: new RegExp(implementedBy, 'i') };
//     }

//     if (incomeLimit) {
//       filter.incomeLimit = incomeLimit;
//     }

//     if (genderEligibility) {
//       filter.genderEligibility = genderEligibility;
//     }

//     if (percentageOfDisability) {
//       filter.percentageOfDisability = percentageOfDisability;
//     }

//     // Perform the filtering
//     const filteredFacilities = await scheme.find(filter);

//     // Log the filtered data for debugging
//     console.log('Filtered Facilities:', filteredFacilities);

//     // Check if the response is empty
//     if (!filteredFacilities || filteredFacilities.length === 0) {
//       // Handle empty response
//       res.status(404).json({ error: 'No data found' });
//     } else {
//       // Send the filtered data as the response
//       res.status(200).send(filteredFacilities);
//     }
//   } catch (error) {
//     console.error('Error filtering facilities:', error);
//     res.status(500).json({ error: 'Internal Server Error', message: error.message });
//   }
// }

// module.exports = {
//   filterFacilities
// };


const scheme = require('../models/scheme');

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

        // Extract pagination parameters from the URL
        const page = parseInt(req.query.page) || 1;  // Default page is 1
        const limit = parseInt(req.query.limit) || 10; // Default limit is 10 items per page

        // Validate and sanitize page and limit parameters
        const parsedPage = parseInt(page);
        const parsedLimit = parseInt(limit);

        if (isNaN(parsedPage) || isNaN(parsedLimit) || parsedPage <= 0 || parsedLimit <= 0) {
            return res.status(400).json({ error: 'Invalid pagination parameters' });
        }

        // Calculate the skip value based on the page and limit
        const skip = (parsedPage - 1) * parsedLimit;


        const filter = {
            implementedBy: implementedBy ? { $regex: new RegExp(implementedBy, 'i') } : { $exists: true },
            percentageOfDisability: percentageOfDisability ? percentageOfDisability : { $exists: true },
            minAge: minAge ? minAge : { $exists: true },
            maxAge: maxAge ? maxAge : { $exists: true },
            incomeLimit: incomeLimit ? incomeLimit : { $exists: true },
            genderEligibility: genderEligibility ? genderEligibility : { $exists: true },
        };

        try {
            const filteredFacilities = await scheme
                .find(filter)
                .skip(skip)
                .limit(parsedLimit);
            res.status(200).send(filteredFacilities);
        } catch (error) {
            console.log(error)
            res.status(500).json({ error: 'Internal Server Error', message: error.message });
        }


    } catch (error) {
        console.error('Error filtering facilities:', error);
        res.status(500).send('Internal Server Error');
    }
}

module.exports = {
    filterFacilities
};
